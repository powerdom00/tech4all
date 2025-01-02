USE tech4all;

-- Popolamento della tabella utente
INSERT INTO utente (email, password, nome, cognome, ruolo, quiz_superati) VALUES
('user1@example.com', 'password123', 'Mario', 'Rossi', 'utente', 0),
('user2@example.com', 'password123', 'Luigi', 'Verdi', 'utente', 0),
('admin@example.com', 'adminpass', 'Admin', 'User', 'admin', 0),
('user3@example.com', 'password123', 'Giovanni', 'Bianchi', 'utente', 0),
('user4@example.com', 'password123', 'Silvana', 'Neri', 'utente', 0),
('user5@example.com', 'password123', 'Paola', 'Gialli', 'utente', 0);

-- Aggiunta dei feedback
INSERT INTO feedback (valutazione, commento, utente_id, tutorial_id) VALUES
(5, 'Ottimo tutorial, molto utile!', 1,1),
(4, 'Buona spiegazione, ma potrebbe essere più dettagliata.', 2, 5),
(3, 'Non mi è piaciuto molto, troppo confusionario.', 3, 4),
(5, 'Fantastico! Grazie per le informazioni.', 4, 3),
(2, 'Non ho capito molto, forse troppo tecnico.', 5, 2),
(4, 'Mi è piaciuto, ma avrei preferito più esempi pratici.', 6, 1);


INSERT INTO tutorial (titolo, grafica, testo, categoria) VALUES
('Introduzione all\'uso del computer', 'uploads/resized-1735384174065-foto.webp', '<h3>Introduzione all\'uso del computer</h3><p>Benvenuto in questo tutorial, che ti guiderà passo dopo passo nel mondo dell\'informatica. L\'obiettivo è aiutarti a familiarizzare con il computer e le sue funzionalità di base, fornendoti una base solida per affrontare attività quotidiane e, chissà, magari anche per esplorare argomenti più avanzati in futuro.</p><h3><strong>Cos’è un computer?</strong></h3><p>Un computer è uno strumento potente che può semplificare la tua vita in molti modi. Dai semplici calcoli matematici alla comunicazione con amici e familiari, o alla gestione di progetti complessi, il computer è progettato per essere il tuo assistente digitale.</p><p>I principali componenti di un computer includono:</p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Hardware</strong> – La parte fisica, come il monitor, la tastiera, il mouse e la torre (o laptop).</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Software</strong> – I programmi e le applicazioni che ti consentono di eseguire attività specifiche.</li></ol><h3><strong>Primi Passi con il Computer</strong></h3><h4>1. <strong>Accendere il Computer</strong></h4><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Premi il pulsante di accensione sul tuo dispositivo. Di solito è contrassegnato da un simbolo circolare con una linea verticale (❙⏻).</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Attendi che il sistema operativo si carichi. Potrebbe essere Windows, macOS o un\'altra piattaforma.</li></ol><h4>2. <strong>Conoscere il Desktop</strong></h4><p>Una volta acceso, vedrai il <strong>desktop</strong>, la schermata principale del computer. Qui troverai:</p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Icone</strong>: Collegamenti rapidi a programmi, file e cartelle.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Barra delle applicazioni</strong>: Una barra in basso (o in alto) che ti permette di accedere rapidamente a programmi e impostazioni.</li></ol><h3><strong>Utilizzo del Mouse e della Tastiera</strong></h3><h4>Il Mouse:</h4><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Clic Sinistro</strong>: Per selezionare o aprire elementi.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Clic Destro</strong>: Per accedere a opzioni aggiuntive, come copiare o eliminare un file.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Scroll</strong>: La rotellina tra i due tasti ti consente di scorrere le pagine verso l’alto o il basso.</li></ol><h4>La Tastiera:</h4><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Tasti alfanumerici</strong>: Per digitare lettere, numeri e simboli.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Tasto Invio (Enter)</strong>: Conferma i comandi.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Tasto Canc (Backspace)</strong>: Cancella il carattere precedente.</li></ol><h3><strong>Navigare in Internet</strong></h3><p>Connettersi a Internet è una delle attività più comuni. Ecco come fare:</p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Connetti il Wi-Fi</strong>: Cerca l’icona del Wi-Fi sulla barra delle applicazioni e seleziona la rete a cui vuoi connetterti. Inserisci la password, se richiesta.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Apri un Browser</strong>: Chrome, Firefox o Edge sono esempi di browser. Scrivi un indirizzo web (ad esempio, <a href=\"http://www.google.com\" rel=\"noopener noreferrer\" target=\"_blank\">www.google.com</a>) nella barra in alto e premi <strong>Invio</strong>.</li></ol><p>Con il browser puoi cercare informazioni, guardare video, inviare email e molto altro.</p><h3><strong>Creare e Salvare Documenti</strong></h3><p>Puoi creare documenti utilizzando software come Microsoft Word o Google Docs. Per farlo:</p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Apri il programma desiderato.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Digita il tuo testo.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Salva il documento selezionando \"File &gt; Salva\". Scegli un nome e una posizione per il file.</li></ol><h3><strong>Conclusione</strong></h3><p>Questo tutorial rappresenta solo l\'inizio del tuo viaggio nel mondo del computer. Prenditi il tempo di esplorare e sperimentare, e non esitare a fare domande o cercare aiuto online. Con un po’ di pratica, il computer diventerà uno strumento indispensabile nella tua vita quotidiana!</p><p>Buon apprendimento!</p>', 'Tecnologia'),
('Navigare su Internet', 'uploads/resized-1735384427179-foto1.webp', '<p><strong>Navigare su Internet: Una Guida per un\'Esperienza Sicura ed Efficace</strong></p><p>L\'accesso a Internet è diventato una parte essenziale della vita quotidiana. Che tu stia cercando informazioni, comunicando con amici e familiari, o esplorando nuovi interessi, saper navigare su Internet in modo sicuro ed efficace è fondamentale. In questo articolo, ti guideremo attraverso i passaggi e i consigli chiave per sfruttare al meglio la rete, mantenendo la tua sicurezza digitale.</p><h3><strong>Cosa Significa Navigare su Internet?</strong></h3><p>Navigare su Internet significa utilizzare un browser, come Google Chrome, Mozilla Firefox o Safari, per accedere a siti web, piattaforme di social media, motori di ricerca e altre risorse online. È un po\' come esplorare una libreria globale: ogni pagina web è una nuova scoperta.</p><p>Per iniziare:</p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Apri il tuo browser preferito.</strong></li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Digita l\'indirizzo del sito web</strong> nella barra di ricerca (es. <a href=\"http://www.wikipedia.org\" rel=\"noopener noreferrer\" target=\"_blank\">www.wikipedia.org</a>).</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Premi Invio</strong> e lascia che il browser ti porti nel mondo digitale.</li></ol><h3><strong>Strumenti Fondamentali per la Navigazione</strong></h3><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Motori di Ricerca:</strong></li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>I motori di ricerca, come Google o Bing, sono strumenti che ti aiutano a trovare informazioni su qualsiasi argomento. Basta digitare una parola chiave o una domanda, e avrai una lista di risultati.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Segnalibri:</strong></li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Usa i segnalibri per salvare i siti web che visiti frequentemente. Questo ti permetterà di accedere rapidamente ai tuoi preferiti senza doverli cercare ogni volta.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Estensioni e Add-On:</strong></li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Molti browser offrono estensioni per migliorare l\'esperienza di navigazione, come blocchi per le pubblicità o strumenti di gestione delle password.</li></ol><h3><strong>Sicurezza Prima di Tutto</strong></h3><p>Internet può essere una fonte inesauribile di informazioni, ma è importante navigare in modo consapevole per proteggere i tuoi dati personali e il tuo dispositivo.</p><h4><strong>Ecco alcuni consigli:</strong></h4><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Usa connessioni sicure:</strong> Accedi solo a siti web con \"https://\" nell\'indirizzo. La \"s\" indica che la connessione è crittografata.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Non condividere informazioni sensibili:</strong> Evita di divulgare password, numeri di carta di credito o dati personali su piattaforme non sicure.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Aggiorna il tuo browser:</strong> Gli aggiornamenti frequenti aiutano a correggere vulnerabilità di sicurezza.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Utilizza un software antivirus:</strong> Questo ti proteggerà da malware e altre minacce.</li></ol><h3><strong>Navigazione Efficace</strong></h3><p>Navigare su Internet non è solo una questione di sicurezza; è anche importante essere efficienti e organizzati.</p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Imposta obiettivi chiari:</strong> Prima di accedere a Internet, chiediti cosa vuoi fare. Questo ti aiuterà a evitare distrazioni.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Usa fonti affidabili:</strong> Non tutte le informazioni online sono accurate. Affidati a siti web ufficiali e ben recensiti.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Gestisci il tuo tempo:</strong> Evita di passare ore su Internet senza uno scopo preciso. Imposta un limite di tempo per ogni attività.</li></ol><h3><strong>Esplora il Mondo Digitale</strong></h3><p>Internet è un portale verso infinite opportunità: puoi imparare una nuova lingua, frequentare corsi online, scoprire hobby, o persino creare una rete professionale. L\'importante è essere curiosi e consapevoli.</p><p>Navigare su Internet è come esplorare una grande città. Con una guida adeguata e alcune precauzioni, puoi goderti il viaggio e trarne il massimo beneficio.</p><p>Buona navigazione! 🌐</p>', 'Internet'
),
('Creare un account email', 'uploads/resized-1735384632132-foto2.webp', '<h3>Articolo: <strong>Creare un Account Email</strong></h3><h4>Introduzione</h4><p>L’email è uno strumento fondamentale nella nostra vita quotidiana, utilizzato per comunicare, lavorare e accedere a vari servizi online. Se non hai ancora un indirizzo email o vuoi crearne uno nuovo, questa guida ti accompagnerà passo dopo passo nel processo di creazione e gestione di un account email.</p><h4><strong>Perché Creare un Account Email?</strong></h4><p>Un account email è essenziale per:</p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Registrarti a social network, app o servizi online.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Ricevere informazioni e notifiche.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Comunicare con amici, familiari e colleghi.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Salvare documenti e allegati online.</li></ol><h4><strong>Come Creare un Account Email</strong></h4><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Scegliere un Provider di Email</strong> I servizi più popolari includono Gmail, Outlook, Yahoo Mail e altri. Ogni piattaforma offre caratteristiche diverse, ma tutte ti consentono di inviare e ricevere messaggi.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Accedere alla Pagina di Registrazione</strong> Vai al sito ufficiale del provider scelto. Cerca il pulsante “Crea un account” o “Iscriviti”.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Compilare i Dettagli Richiesti</strong> Ti verranno richiesti:</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Nome e cognome.</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Nome utente (che diventerà il tuo indirizzo email, ad esempio: nomeutente@gmail.com).</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Una password sicura (minimo 8 caratteri, con lettere maiuscole, numeri e simboli).</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Confermare l’Identità</strong> Alcuni provider ti chiederanno un numero di telefono o un indirizzo email secondario per confermare la tua identità e recuperare l’accesso in caso di problemi.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Personalizzare l’Account</strong> Dopo aver completato la registrazione, puoi personalizzare il tuo account aggiungendo una firma, organizzando le cartelle, o configurando filtri per le email.</li></ol><h4><strong>Consigli per Gestire un Account Email</strong></h4><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Usa una password sicura</strong> e cambiala regolarmente.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Evita i link sospetti</strong> nelle email per proteggerti dal phishing.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Archivia le email importanti</strong> in cartelle dedicate.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Sincronizza il tuo account</strong> sui tuoi dispositivi per un accesso più comodo.</li></ol><h4><strong>Conclusione</strong></h4><p>Creare un account email è un processo semplice ma essenziale per accedere alle risorse digitali del mondo moderno. Segui i passaggi indicati e inizia a comunicare in modo efficace e sicuro.</p>', 'Internet'
),
('Utilizzare i social media', 'uploads/resized-1735384807365-foto3.jpg', '<h3>Articolo: Utilizzare i Social Media</h3><p><strong>Introduzione</strong></p><p>I social media sono diventati una parte essenziale della nostra vita quotidiana, offrendo un modo per rimanere in contatto con amici, famiglia e colleghi, condividere momenti speciali e scoprire nuovi contenuti. In questa guida, ti mostreremo come utilizzare i principali social media, come Facebook, Twitter e Instagram, in modo efficace e sicuro.</p><p><strong>Come iniziare sui social media</strong></p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Creare un account</strong></li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Per iniziare, visita il sito ufficiale o scarica l\'app del social media che vuoi utilizzare.</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Segui le istruzioni per registrarti, fornendo un indirizzo email o un numero di telefono valido.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Personalizzare il profilo</strong></li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Scegli un\'immagine del profilo che ti rappresenti.</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Aggiungi informazioni personali come una breve biografia o il tuo luogo di lavoro.</li></ol><p><strong>Utilizzo dei principali social media</strong></p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Facebook</strong></li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Pubblica aggiornamenti di stato, foto e video per condividere momenti della tua vita.</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Partecipa a gruppi per connetterti con persone che condividono i tuoi interessi.</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Usa Messenger per inviare messaggi privati.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Twitter</strong></li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Scrivi brevi messaggi chiamati \"tweet\" (fino a 280 caratteri).</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Segui account interessanti per ricevere aggiornamenti in tempo reale.</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Usa hashtag (#) per partecipare a conversazioni globali.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Instagram</strong></li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Condividi foto e video con i tuoi follower.</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Esplora contenuti popolari nella sezione \"Esplora\".</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Usa storie per pubblicare contenuti temporanei visibili per 24 ore.</li></ol><p><strong>Consigli per un uso sicuro</strong></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Proteggi la tua privacy:</strong> configura le impostazioni di sicurezza per controllare chi può vedere i tuoi contenuti.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Non condividere informazioni sensibili:</strong> come indirizzo di casa o dati bancari.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Segnala contenuti inappropriati:</strong> usa gli strumenti di segnalazione offerti dalla piattaforma.</li></ol><p><strong>Conclusione</strong></p><p>I social media possono essere uno strumento potente per connettersi con gli altri e scoprire nuove opportunità. Usali in modo responsabile, rispettando le regole di ciascuna piattaforma, e sfrutta tutte le possibilità che offrono per migliorare la tua vita personale e professionale.</p>', 'Social Media'
),
('Proteggere la tua privacy online', 'uploads/resized-1735386278066-sicurezza.png', '<h1>Proteggere la tua privacy online</h1><h2>Consigli e trucchi per proteggere la tua privacy mentre navighi su Internet</h2><h3>Introduzione</h3><p>Mantenere la privacy online è essenziale in un\'era digitale dove ogni azione online può essere monitorata o registrata. Ecco alcuni suggerimenti pratici per garantire la sicurezza dei tuoi dati personali.</p><h3>1. Utilizza password sicure</h3><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Usa combinazioni di lettere maiuscole, minuscole, numeri e simboli.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Cambia regolarmente le tue password.</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Evita di riutilizzare le stesse password per account diversi.</li></ol><h3>2. Attiva l\'autenticazione a due fattori (2FA)</h3><p>Questa misura aggiuntiva protegge i tuoi account anche se qualcuno ottiene la tua password.</p><h3>3. Naviga con una VPN</h3><p>Una VPN (Virtual Private Network) cripta la tua connessione, rendendo più difficile per i malintenzionati intercettare i tuoi dati.</p><h3>4. Aggiorna regolarmente i tuoi dispositivi</h3><p>Gli aggiornamenti software includono patch di sicurezza che risolvono vulnerabilità note.</p><h3>5. Fai attenzione ai link sospetti</h3><p>Non cliccare su link o allegati provenienti da fonti non verificate, soprattutto nelle e-mail.</p><h3>Conclusione</h3><p>Seguendo questi semplici accorgimenti, puoi ridurre significativamente il rischio di compromettere la tua privacy online. Investire tempo nella sicurezza dei tuoi dati è un passo fondamentale per proteggere la tua vita digitale.</p><p><strong>Categoria:</strong> Sicurezza</p>', 'Sicurezza');

INSERT INTO quiz (tutorial_id) VALUES
(1), (2), (3), (4), (5);

-- Inserimento delle domande e risposte per il quiz 1
INSERT INTO domanda (quiz_id, domanda) VALUES
(1, 'Cosa rappresentano l''hardware e il software in un computer?'),
(1, 'Quali sono i passaggi principali per accendere un computer?'),
(1, 'Quali sono le funzioni principali del mouse e della tastiera?'),
(1, 'Come ci si connette a una rete Wi-Fi e si naviga in Internet?'),
(1, 'Quali sono le operazioni fondamentali per creare e salvare un documento?');

INSERT INTO risposta (domanda_id, risposta, corretta) VALUES
(1, 'L''hardware è il sistema operativo, mentre il software è la tastiera e il mouse.', FALSE),
(1, 'L''hardware è la parte fisica del computer, mentre il software sono i programmi che permettono di svolgere attività.', TRUE),
(1, 'L''hardware è ciò che appare sullo schermo, mentre il software sono i tasti della tastiera.', FALSE),
(2, 'Premi il pulsante di accensione e attendi il caricamento del sistema operativo.', TRUE),
(2, 'Tocca lo schermo tre volte per accendere il computer.', FALSE),
(2, 'Collega un mouse per avviare il computer automaticamente.', FALSE),
(3, 'Il clic sinistro elimina file, il clic destro chiude programmi, e la tastiera accende il computer.', FALSE),
(3, 'Il clic sinistro accede a Internet, il clic destro aumenta la luminosità, e la tastiera serve per spegnere il computer.', FALSE),
(3, 'Il clic sinistro apre elementi, il clic destro mostra opzioni, e la tastiera serve per scrivere.', TRUE),
(4, 'Seleziona una rete Wi-Fi dalla barra delle applicazioni, inserisci la password, e apri un browser per navigare.', TRUE),
(4, 'Premi un tasto qualsiasi sulla tastiera per connetterti automaticamente.', FALSE),
(4, 'Spegni il computer e riaccendilo per connetterti al Wi-Fi.', FALSE),
(5, 'Premi il pulsante di accensione per avviare il documento.', FALSE),
(5, 'Apri un programma, digita il testo e seleziona "File > Salva".', TRUE),
(5, 'Connetti il computer a Internet per salvare automaticamente il documento.', FALSE);

-- Inserimento delle domande e risposte per il quiz 2
INSERT INTO domanda (quiz_id, domanda) VALUES
(2, 'Cosa significa navigare su Internet?'),
(2, 'Qual è la funzione principale di un motore di ricerca come Google o Bing?'),
(2, 'Come puoi sapere se un sito web è sicuro per la navigazione?'),
(2, 'Cosa puoi fare per navigare su Internet in modo più organizzato?'),
(2, 'Quali strumenti possono migliorare l’esperienza di navigazione?');

INSERT INTO risposta (domanda_id, risposta, corretta) VALUES
(6, 'Significa utilizzare il computer per creare documenti di testo.', FALSE),
(6, 'Significa utilizzare un browser per accedere a siti web, piattaforme di social media e altre risorse online.', TRUE),
(6, 'Significa digitare comandi al computer senza utilizzare Internet.', FALSE),
(7, 'Permettere di salvare file sul computer.', FALSE),
(7, 'Aiutare a trovare informazioni online digitando parole chiave o domande.', TRUE),
(7, 'Bloccare le pubblicità mentre navighi su Internet.', FALSE),
(8, 'Se il sito ha un indirizzo che inizia con "https://".', TRUE),
(8, 'Se il sito carica velocemente le pagine.', FALSE),
(8, 'Se il sito ha molte immagini colorate.', FALSE),
(9, 'Visitare il maggior numero possibile di siti web casuali.', FALSE),
(9, 'Usare un solo motore di ricerca per tutto.', FALSE),
(9, 'Usare fonti affidabili e impostare obiettivi chiari per le tue attività.', TRUE),
(10, 'Estensioni del browser, come blocchi pubblicitari o gestori di password.', TRUE),
(10, 'Una tastiera wireless per digitare più velocemente.', FALSE),
(10, 'Un’icona sul desktop connessa direttamente a Internet.', FALSE);

-- Inserimento delle domande e risposte per il quiz 3
INSERT INTO domanda (quiz_id, domanda) VALUES
(3, 'Perché è importante avere un account email?'),
(3, 'Quali sono alcuni dei provider di email più popolari?'),
(3, 'Cosa ti viene richiesto per creare un account email?'),
(3, 'Come puoi proteggere il tuo account email?'),
(3, 'Cosa puoi fare per personalizzare il tuo account email?');

INSERT INTO risposta (domanda_id, risposta, corretta) VALUES
(11, 'Per guardare film senza usare Internet.', FALSE),
(11, 'Per aumentare la velocità del tuo computer.', FALSE),
(11, 'Per comunicare, registrarsi a servizi online e salvare documenti.', TRUE),
(12, 'Netflix, YouTube e Spotify.', FALSE),
(12, 'Word, Excel e PowerPoint.', FALSE),
(12, 'Gmail, Outlook e Yahoo Mail.', TRUE),
(13, 'Nome, cognome, nome utente, password sicura e talvolta un numero di telefono.', TRUE),
(13, 'Un documento d’identità e il PIN della tua carta di credito.', FALSE),
(13, 'Solo il nome utente e una foto del profilo.', FALSE),
(14, 'Condividendo la tua password con amici fidati.', FALSE),
(14, 'Usando una password sicura, evitando link sospetti e cambiando regolarmente la password.', TRUE),
(14, 'Usando sempre la stessa password per tutti i tuoi account.', FALSE),
(15, 'Cambiare il colore dello schermo del computer.', FALSE),
(15, 'Eliminare la barra degli strumenti del browser.', FALSE),
(15, 'Aggiungere una firma, organizzare le cartelle e configurare filtri per le email.', TRUE);

-- Inserimento delle domande e risposte per il quiz 4
INSERT INTO domanda (quiz_id, domanda) VALUES
(4, 'Qual è il primo passo per iniziare a utilizzare i social media?'),
(4, 'Qual è una delle principali funzioni di Facebook?'),
(4, 'Cosa sono i "tweet" su Twitter?'),
(4, 'Come puoi proteggere la tua privacy sui social media?'),
(4, 'Qual è una caratteristica di Instagram?');

INSERT INTO risposta (domanda_id, risposta, corretta) VALUES
(16, 'Inserire una password casuale sul telefono.', FALSE),
(16, 'Visitare il sito ufficiale o scaricare l''app del social media scelto e registrarsi.', TRUE),
(16, 'Cercare i social media nei motori di ricerca senza registrarsi.', FALSE),
(17, 'Condividere aggiornamenti di stato, foto e video, e partecipare a gruppi.', TRUE),
(17, 'Pubblicare esclusivamente video musicali.', FALSE),
(17, 'Usare hashtag per partecipare a conversazioni globali.', FALSE),
(18, 'Immagini condivise temporaneamente per 24 ore.', FALSE),
(18, 'Video musicali pubblicati nei gruppi.', FALSE),
(18, 'Brevi messaggi di massimo 280 caratteri.', TRUE),
(19, 'Condividendo informazioni sensibili solo con persone fidate.', FALSE),
(19, 'Configurando le impostazioni di sicurezza per controllare chi può vedere i tuoi contenuti.', TRUE),
(19, 'Usando hashtag per proteggere le informazioni personali.', FALSE),
(20, 'Condividere foto e video, e pubblicare storie visibili per 24 ore.', TRUE),
(20, 'Inviare messaggi privati attraverso Messenger.', FALSE),
(20, 'Scrivere brevi messaggi di massimo 280 caratteri.', FALSE);

-- Inserimento delle domande e risposte per il quiz 5
INSERT INTO domanda (quiz_id, domanda) VALUES
(5, 'Qual è un modo per creare una password sicura?'),
(5, 'Cosa fa l''autenticazione a due fattori (2FA)?'),
(5, 'Perché è importante usare una VPN?'),
(5, 'Perché dovresti aggiornare regolarmente i tuoi dispositivi?'),
(5, 'Cosa fare se ricevi un’email con un link sospetto?');

INSERT INTO risposta (domanda_id, risposta, corretta) VALUES
(21, 'Utilizzare solo il tuo nome o data di nascita.', FALSE),
(21, 'Usare una combinazione di lettere maiuscole, minuscole, numeri e simboli.', TRUE),
(21, 'Creare una password breve come "1234".', FALSE),
(22, 'Aggiunge un ulteriore livello di protezione anche se qualcuno ottiene la tua password.', TRUE),
(22, 'Consente di accedere senza bisogno di una password.', FALSE),
(22, 'Crea automaticamente nuove password per tutti i tuoi account.', FALSE),
(23, 'Per velocizzare la connessione a Internet.', FALSE),
(23, 'Per condividere facilmente i tuoi dati con altri.', FALSE),
(23, 'Per criptare la tua connessione e proteggere i tuoi dati da malintenzionati.', TRUE),
(24, 'Per aggiungere più colori allo schermo.', FALSE),
(24, 'Per ottenere patch di sicurezza che risolvono vulnerabilità note.', TRUE),
(24, 'Per mantenere lo stesso livello di sicurezza senza cambiare nulla.', FALSE),
(25, 'Non cliccare sul link e verifica la fonte.', TRUE),
(25, 'Aprire immediatamente il link per vedere di cosa si tratta.', FALSE),
(25, 'Rispondere all’email condividendo i tuoi dati personali.', FALSE);
