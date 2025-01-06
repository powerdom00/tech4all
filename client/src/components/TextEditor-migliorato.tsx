import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import "../css/textEditor.css";
import Quill from "quill";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const previousImages = useRef<string[]>([]);

  const deleteImage = async (url: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/tutorials/delete-image",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imagePath: url.replace("http://localhost:5000/", ""),
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error(
          "Errore durante la cancellazione dell'immagine:",
          data.message
        );
      }
    } catch (error) {
      console.error("Errore durante la cancellazione dell'immagine:", error);
    }
  };

  const selectLocalImage = (quillInstance: Quill) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await fetch(
            "http://localhost:5000/tutorials/upload-image",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          if (data.imageUrl) {
            insertToEditor(data.imageUrl, quillInstance);
          }
        } catch (error) {
          console.error("Errore durante il caricamento dell'immagine:", error);
        }
      }
    };
  };

  const insertToEditor = (url: any, quillInstance: Quill) => {
    const range = quillInstance.getSelection();
    if (range) {
      quillInstance.insertEmbed(range.index, "image", url);
    } else {
      quillInstance.insertEmbed(quillInstance.getLength() - 1, "image", url);
    }
  };

  const trackImages = (quillInstance: Quill) => {
    const currentImages = Array.from(
      quillInstance.root.querySelectorAll("img")
    ).map((img: HTMLImageElement) => img.src);

    const removedImages = previousImages.current.filter(
      (src) => !currentImages.includes(src)
    );

    removedImages.forEach((src) => {
      deleteImage(src);
    });

    previousImages.current = currentImages;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("quill").then((Quill) => {
        if (editorRef.current) {
          const quillInstance = new Quill.default(
            editorRef.current as HTMLElement,
            {
              theme: "snow",
              modules: {
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  ["bold", "italic", "underline"],
                  [{ color: [] }, { background: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "video"],
                ],
              },
              placeholder: "Inserisci il contenuto del tutorial...",
            }
          );

          (quillInstance.getModule("toolbar") as any).addHandler(
            "image",
            () => {
              selectLocalImage(quillInstance);
            }
          );

          quillInstance.on("text-change", () => {
            onChange(quillInstance.root.innerHTML);
            trackImages(quillInstance);
          });

          return () => {
            quillInstance.off("text-change");
          };
        }
      });
    }
  }, [onChange]);

  return <div ref={editorRef} />;
};

export default TextEditor;
