import React, { useRef, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import "../css/textEditor.css";
import Quill from "quill";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef(null);

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
                  ["clean"],
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
          });

          return () => {
            quillInstance.off("text-change");
          };
        }
      });
    }
  }, [onChange]);

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

  return <div ref={editorRef} />;
};

export default TextEditor;
