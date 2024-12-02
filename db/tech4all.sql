-- Eliminazione del database, se esiste
DROP DATABASE IF EXISTS Tech4All;

-- Creazione del database
CREATE DATABASE Tech4All;
USE Tech4All;

-- Creazione della tabella utente
CREATE TABLE utente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(32) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    ruolo VARCHAR(10) NOT NULL CHECK (ruolo IN ('utente', 'admin'))
);

-- Creazione della tabella obiettivo
CREATE TABLE obiettivo (
    nome VARCHAR(255) PRIMARY KEY,
    descrizione TEXT NOT NULL,
    grafica_badge VARCHAR(255) NOT NULL,
    quiz_da_superare INT NOT NULL
);

-- Creazione della tabella conseguimento
CREATE TABLE conseguimento (
    utente_id INT NOT NULL,
    obiettivo_nome VARCHAR(255) NOT NULL,
    data_conseguimento DATETIME NOT NULL,
    PRIMARY KEY (utente_id, obiettivo_nome),
    FOREIGN KEY (utente_id) REFERENCES utente(id) ON DELETE CASCADE,
    FOREIGN KEY (obiettivo_nome) REFERENCES obiettivo(nome) ON DELETE CASCADE
);

-- Creazione della tabella tutorial
CREATE TABLE tutorial (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titolo VARCHAR(100) NOT NULL,
    grafica VARCHAR(255) NOT NULL,
    testo TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    valutazione DECIMAL(3, 2) DEFAULT NULL
);

-- Creazione della tabella feedback
CREATE TABLE feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valutazione INT NOT NULL,
    commento VARCHAR(280) NOT NULL,
    utente_id INT NOT NULL,
    tutorial_id INT NOT NULL,
    FOREIGN KEY (utente_id) REFERENCES utente(id) ON DELETE CASCADE,
    FOREIGN KEY (tutorial_id) REFERENCES tutorial(id) ON DELETE CASCADE
);

-- Creazione della tabella quiz
CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tutorial_id INT NOT NULL,
    FOREIGN KEY (tutorial_id) REFERENCES tutorial(id) ON DELETE CASCADE
);

-- Creazione della tabella domanda
CREATE TABLE domanda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    domanda VARCHAR(255) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);

-- Creazione della tabella risposta
CREATE TABLE risposta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    domanda_id INT NOT NULL,
    risposta VARCHAR(255) NOT NULL,
    corretta BOOLEAN NOT NULL,
    FOREIGN KEY (domanda_id) REFERENCES domanda(id) ON DELETE CASCADE
);

-- Creazione della tabella svolgimento
CREATE TABLE svolgimento (
    utente_id INT NOT NULL,
    quiz_id INT NOT NULL,
    esito BOOLEAN NOT NULL,
    PRIMARY KEY (utente_id, quiz_id),
    FOREIGN KEY (utente_id) REFERENCES utente(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);
