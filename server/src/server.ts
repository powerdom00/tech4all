import express, { Request, Response } from "express";
import path from "path";
import AuthRoutes from "./app/routes/auth";
import TutorialRoutes from "./app/routes/tutorials";
import FeedbackRoutes from "./app/routes/feedback";
import cors from "cors";
const app = express();
app.use(cors());

// Middleware per il parsing del JSON
app.use(express.json());

// Rotte personalizzate
app.use("/auth", AuthRoutes);
app.use("/tutorials", TutorialRoutes);
app.use("/feedback", FeedbackRoutes);
// Servire i file statici dalla cartella uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(5000, (err?: any) => {
  if (err) throw err;
  console.log("Server avviato su http://localhost:5000");
});
