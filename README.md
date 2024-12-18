# tech4all

---

Lato Front-End:
-npm install --save-dev ts-loader (per far funzionare file esterni dal client es.Services)

---

#Installazioni da condividere per il funzionamento

# BE:

- mysql2

#per far funzionare il db:

- copiare e incollare su mysql, runnare il codice su mysql e creare il db
- Creare (o inserire in) un file di nome ".env" in server inserendo i dati di accesso del proprio DB nelle seguenti variabili:

  ```env
  DB_HOST=""
  DB_USER=""
  DB_PASSWORD=""
  DB_NAME=""
  ```

- in caso di tentativi di test inserire il file nella cartella "test" in server.
- Per runnare solo la cartella indicata scrivere nel terminare appostio : npx ts-node nomeFileTest.ts e premere invio
