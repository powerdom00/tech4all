import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Stile base per i tab
import "../../src/css/Tutorial.css";
import TutorialPageComponent from "@/components/TutorialPageComponent";
import Quiz from "@/components/Quiz";
import Feedback from "@/components/Feedback";
import FeedbackComponent from "@/components/Feedback";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TutorialPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();
  const ruolo = user?.ruolo;

  const [quizExists, setQuizExists] = useState(false);
  const [quizId, setQuizId] = useState<number | null>(null);

  useEffect(() => {
    const checkQuizExists = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/quiz/visualizzaQuiz/${id}`
          );
          setQuizExists(
            response.status === 200 && response.data.domande.length > 0
          );
          setQuizId(response.data.id);
        } catch (error) {
          if (
            axios.isAxiosError(error) &&
            error.response &&
            error.response.status === 404
          ) {
            setQuizExists(false);
            setQuizId(null);
          } else {
            console.error(
              "Errore nel controllo dell'esistenza del quiz:",
              error
            );
          }
        }
      }
    };

    checkQuizExists();
  }, [id]);

  const handleCreateQuiz = () => {
    if (id) {
      router.push(`/CreaQuiz/${id}`);
    }
  };

  const handleDeleteQuiz = async () => {
    if (quizId) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/quiz/eliminaQuiz/${quizId}`
        );
        if (response.status === 200) {
          setQuizExists(false);
          setQuizId(null);
        } else {
          console.error(
            "Errore nella cancellazione del quiz:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Errore del server nella cancellazione del quiz:", error);
      }
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
              {ruolo && (
                <>
                  {quizExists ? (
                    <>
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
                </>
              )}
            </div>
            {quizExists ? (
              <Quiz tutorialId={parseInt(id as string)} />
            ) : (
              <p className="no-quiz-message">Nessun quiz disponibile.</p>
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
