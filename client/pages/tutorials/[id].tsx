import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Stile base per i tab
import "../../src/app/css/Tutorial.css";
import TutorialPageComponent from "@/app/Components/TutorialPageComponent";
import Quiz from "@/app/Components/Quiz";
import Feedback from "@/app/Components/Feedback";
import FeedbackComponent from "@/app/Components/Feedback";

const TutorialPage = () => {
  const router = useRouter();
  const { id } = router.query;

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
            <Quiz />
          </TabPanel>

          {/* Sezione Feedback */}
          <TabPanel>
            <FeedbackComponent id={id as string} />
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
};

export default TutorialPage;
