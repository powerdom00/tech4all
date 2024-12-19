import express, { Request, Response } from "express";
import AuthRoutes from "./app/routes/auth";
import TutorialRoutes from "./app/routes/tutorials";
import cors from "cors";

const app = express();
app.use(cors());

// Middleware per il parsing del JSON
app.use(express.json());

// Rotte personalizzate
app.use("/auth", AuthRoutes);
app.use("/tutorials", TutorialRoutes);

app.listen(5000, (err?: any) => {
  if (err) throw err;
  console.log("Server avviato su http://localhost:5000");
});
