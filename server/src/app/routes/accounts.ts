import express from "express";
import { AccountService } from "../services/AccountService";

const router = express.Router();

// Visualizza i dati dell'utente
router.get("/dati/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);  // Ottieni l'ID utente dai parametri della rotta

  try {
    const accountService = new AccountService();
    const result = await accountService.visualizzaDati(userId);

    if (result.success) {
      res.status(200).json({
        message: "Dati utente recuperati con successo",
        utente: result.utente,
      });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Errore durante la visualizzazione dei dati:", error);
    res.status(500).json({ message: "Errore interno del server", error });
  }
});

export default router;
