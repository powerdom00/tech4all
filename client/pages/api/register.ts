import { NextApiRequest, NextApiResponse } from "next";
import { RegistrazioneService } from "../../../server/src/app/services/RegistrazioneServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, nome, cognome } = req.body;
    const registrazioneService = new RegistrazioneService();

    try {
      const result = await registrazioneService.registraUtente(email, password, nome, cognome);

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      res.status(500).json({ message: "Errore interno del server." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
