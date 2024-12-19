import express from "express";
import { TutorialService } from "../services/TutorialService";

const router = express.Router();
const tutorialService = new TutorialService();

router.get("/list", async (req, res) => {
  try {
    const tutorials = await tutorialService.getAllTutorials();
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tutorials" });
  }
});

router.post("/create", async (req, res) => {
  const { titolo, testo, categoria } = req.body;
  try {
    await tutorialService.createTutorial({ titolo, testo, categoria });
    res.status(201).json({ message: "Tutorial created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create tutorial" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tutorial = await tutorialService.getTutorialById(Number(id));
    if (tutorial) {
      res.json(tutorial);
    } else {
      res.status(404).json({ error: "Tutorial not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tutorial" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titolo, testo, categoria } = req.body;
  try {
    await tutorialService.updateTutorial(Number(id), {
      titolo,
      testo,
      categoria,
    });
    const updatedTutorial = await tutorialService.getTutorialById(Number(id));
    res.status(200).json({
      message: "Tutorial updated successfully!",
      tutorial: updatedTutorial,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update tutorial" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await tutorialService.deleteTutorial(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tutorial" });
  }
});

export default router;
