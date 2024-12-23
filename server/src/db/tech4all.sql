-- Eliminazione del database, se esiste
DROP DATABASE IF EXISTS Tech4All;

-- Creazione del database
CREATE DATABASE Tech4All;
USE Tech4All;

-- Creazione della tabella utente
CREATE TABLE utente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE CHECK (email LIKE '%_@_%._%'),
    password VARCHAR(32) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    ruolo VARCHAR(10) NOT NULL CHECK (ruolo IN ('utente', 'admin')),
    quiz_superati INT DEFAULT 0
);


-- Creazione della tabella obiettivo
CREATE TABLE obiettivo (
    nome VARCHAR(255) PRIMARY KEY,
    descrizione TEXT NOT NULL,
    grafica_badge VARCHAR(255) NOT NULL,
    quiz_da_superare INT NOT NULL CHECK (quiz_da_superare > 0)
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

-- Trigger per verificare la data di conseguimento
DELIMITER $$

CREATE TRIGGER check_data_conseguimento
BEFORE INSERT ON conseguimento
FOR EACH ROW
BEGIN
    IF NEW.data_conseguimento > NOW() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La data di conseguimento non può essere futura.';
    END IF;
END$$

DELIMITER ;

-- Creazione della tabella tutorial
CREATE TABLE tutorial (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titolo VARCHAR(100) NOT NULL,
    grafica VARCHAR(255) NOT NULL,
    testo TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    valutazione DECIMAL(3, 2) DEFAULT NULL CHECK (valutazione BETWEEN 1 AND 5)
);

-- Creazione della tabella feedback
CREATE TABLE feedback (
    valutazione INT NOT NULL CHECK (valutazione BETWEEN 1 AND 5),
    commento VARCHAR(280) NOT NULL,
    utente_id INT NOT NULL,
    tutorial_id INT NOT NULL,
    UNIQUE (utente_id, tutorial_id),
    FOREIGN KEY (utente_id) REFERENCES utente(id) ON DELETE CASCADE,
    FOREIGN KEY (tutorial_id) REFERENCES tutorial(id) ON DELETE CASCADE,
    PRIMARY KEY (utente_id, tutorial_id)
);

-- Trigger per aggiornare la valutazione media dei tutorial
DELIMITER $$

CREATE TRIGGER update_tutorial_valutazione
AFTER INSERT ON feedback
FOR EACH ROW
BEGIN
    DECLARE media_valutazione DECIMAL(3, 2);
    SELECT AVG(valutazione) INTO media_valutazione
    FROM feedback
    WHERE tutorial_id = NEW.tutorial_id;

    UPDATE tutorial
    SET valutazione = media_valutazione
    WHERE id = NEW.tutorial_id;
END$$

CREATE TRIGGER update_tutorial_valutazione_delete
AFTER DELETE ON feedback
FOR EACH ROW
BEGIN
    DECLARE media_valutazione DECIMAL(3, 2);
    SELECT AVG(valutazione) INTO media_valutazione
    FROM feedback
    WHERE tutorial_id = OLD.tutorial_id;

    UPDATE tutorial
    SET valutazione = media_valutazione
    WHERE id = OLD.tutorial_id;
END$$

CREATE TRIGGER update_tutorial_valutazione_update
AFTER UPDATE ON feedback
FOR EACH ROW
BEGIN
    DECLARE media_valutazione DECIMAL(3, 2);
    SELECT AVG(valutazione) INTO media_valutazione
    FROM feedback
    WHERE tutorial_id = NEW.tutorial_id;

    UPDATE tutorial
    SET valutazione = media_valutazione
    WHERE id = NEW.tutorial_id;
END$$

DELIMITER ;

-- Creazione della tabella quiz
CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tutorial_id INT NOT NULL,
    UNIQUE (tutorial_id),
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
    data_conseguimento DATE NOT NULL,
    risposte_esatte INT NOT NULL,
    PRIMARY KEY (utente_id, quiz_id),
    FOREIGN KEY (utente_id) REFERENCES utente(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);

