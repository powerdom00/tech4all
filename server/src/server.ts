import express from "express";
import cors from "cors";
import authRoutes from "./app/routes/auth";

const app = express();
const port = 5000;

// Middleware CORS con configurazione estesa
app.use(cors({
  origin: 'http://localhost:3000', // URL del front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metodi consentiti
  allowedHeaders: ['Content-Type', 'Authorization'], // Header consentiti
}));

// Middleware per richieste preflight
app.options('*', cors());

// Middleware per JSON
app.use(express.json());

// Rotte
app.use("/auth", authRoutes);

// Avvio server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
