import express from 'express';
import { LoginService } from '../services/LoginServices';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  console.log('Richiesta ricevuta:', req.body);
  const { email, password } = req.body;
  try {
    const loginService = new LoginService();
    const user = await loginService.login(email, password);

    if (user.success) {
      res.status(200).json({ message: 'Login effettuato con successo', user: user.user });
    } else {
      res.status(401).json({ message: user.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore del server', error });
  }
});



// Registrazione 
/*
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await register(email, password);
    res.status(201).json({ message: 'Utente registrato con successo', user });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server', error });
  }
}); 
*/
export default router;