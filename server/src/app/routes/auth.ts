import express from "express";
import { AutenticazioneService } from "../services/AutenticazioneService";

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  console.log("Richiesta ricevuta:", req.body);
  const { email, password } = req.body;
  try {
    const loginService = new AutenticazioneService();
    const user = await loginService.login(email, password);

    if (user.success) {
      res
        .status(200)
        .json({ message: "Login effettuato con successo", user: user.user });
    } else {
      res.status(401).json({ message: user.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Registrazione

router.post("/register", async (req, res) => {
  const { email, password, nome, cognome } = req.body;
  try {
    const registrazioneService = new AutenticazioneService();
    const user = await registrazioneService.registraUtente(
      email,
      password,
      nome,
      cognome,
    );
    res.status(201).json({ message: "Utente registrato con successo", user });
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  const { userId } = req.body; // Supponiamo che l'ID utente venga passato nel body
  try {
    const autenticazioneService = new AutenticazioneService();
    const result = await autenticazioneService.logout(userId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Errore durante il logout:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

export default router;
