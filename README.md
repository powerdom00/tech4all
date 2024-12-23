# Tech4all

## Installazioni da condividere per il funzionamento

### Lato Front-End

```bash
npm install
```

---

### Lato Back-End

```bash
npm install
```

#### Per far funzionare il db

- Copiare e incollare su MySQL, runnare il codice su MySQL e creare il db.
- Creare (o inserire in) un file di nome ".env" in server inserendo i dati di accesso del proprio DB nelle seguenti variabili:

  ```env
  DB_HOST=""
  DB_USER=""
  DB_PASSWORD=""
  DB_NAME=""
  ```

- In caso di tentativi di test inserire il file nella cartella "test" in server.
- Per runnare solo la cartella indicata scrivere nel terminare apposito : npx ts-node nomeFileTest.ts e premere invio.
