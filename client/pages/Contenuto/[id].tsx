import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Stile base per i tab
import "../../src/app/css/Tutorial.css";
import TutorialPageComponent from "@/app/Components/TutorialPageComponent";
import Quiz from "@/app/Components/Quiz";
import Feedback from "@/app/Components/Feedback";
import FeedbackComponent from "@/app/Components/Feedback";
import Link from "next/link";

const TutorialPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [quizExists, setQuizExists] = useState(false);

  useEffect(() => {
    if (id) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
      const quiz = quizzes.find((q: any) => q.tutorialId === Number(id));
      setQuizExists(!!quiz);
    }
  }, [id]);

  const handleCreateQuiz = () => {
    if (id) {
      router.push(`/CreaQuiz/${id}`);
    }
  };

  const handleUpdateQuiz = () => {
    if (id) {
      router.push(`/UpdateQuiz/${id}`);
    }
  };

  const handleDeleteQuiz = () => {
    if (id) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
      const updatedQuizzes = quizzes.filter(
        (q: any) => q.tutorialId !== Number(id)
      );
      localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
      setQuizExists(false);
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <header className="header-container">
        <h1 className="page-title">Gestione Contenuto</h1>
      </header>
      <main className="content-container">
        <Tabs>
          <TabList>
            <Tab>Tutorial</Tab>
            <Tab>Quiz</Tab>
            <Tab>Feedback</Tab>
          </TabList>

          {/* Sezione Tutorial */}
          <TabPanel>
            <TutorialPageComponent id={id as string} />
          </TabPanel>

          {/* Sezione Quiz */}
          <TabPanel>
            <div className="quiz-actions">
              {quizExists ? (
                <>
                  <button
                    onClick={handleUpdateQuiz}
                    className="update-quiz-button"
                  >
                    Modifica Quiz
                  </button>
                  <button
                    onClick={handleDeleteQuiz}
                    className="delete-quiz-button"
                  >
                    Elimina Quiz
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreateQuiz}
                  className="create-quiz-button"
                >
                  Crea Quiz
                </button>
              )}
            </div>
            {quizExists ? (
              <Quiz tutorialId={parseInt(id as string)} />
            ) : (
              <p className="no-quiz-message">
                Nessun quiz disponibile. Crea un nuovo quiz.
              </p>
            )}
          </TabPanel>

          {/* Sezione Feedback */}
          <TabPanel>
            <FeedbackComponent id={id as string} />
          </TabPanel>
        </Tabs>
      </main>
          <div className="home-button-container">
          <Link href="/ListaTutorial">
            <button className="home-button">Torna alla lista dei tutorial</button>
          </Link>
        </div>
    </div>
  );
};

export default TutorialPage;
