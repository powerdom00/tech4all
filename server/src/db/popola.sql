USE tech4all;

-- Popolamento della tabella utente
INSERT INTO utente (email, password, nome, cognome, ruolo, quiz_superati) VALUES
('user1@example.com', 'password123', 'Mario', 'Rossi', 'utente', 0),
('user2@example.com', 'password123', 'Luigi', 'Verdi', 'utente', 0),
('admin@example.com', 'adminpass', 'Admin', 'User', 'admin', 0);

INSERT INTO tutorial (titolo, grafica, testo, categoria) VALUES
('Introduzione all\'uso del computer', 'uploads/resized-1735380067255-MKF79691G.jpg', 'Questo tutorial ti guiderà attraverso i primi passi per utilizzare un computer.', 'Tecnologia'),
('Navigare su Internet', 'navigare_internet.png', 'Impara come navigare su Internet in modo sicuro ed efficace.', 'Internet'),
('Creare un account email', 'creare_email.png', 'Scopri come creare e gestire un account email.', 'Internet'),
('Utilizzare i social media', 'social_media.png', 'Guida all\'uso dei principali social media come Facebook, Twitter e Instagram.', 'Social Media'),
('Proteggere la tua privacy online', 'privacy_online.png', 'Consigli e trucchi per proteggere la tua privacy mentre navighi su Internet.', 'Sicurezza');