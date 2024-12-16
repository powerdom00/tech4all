import dotenv from "dotenv";

dotenv.config();

export default {
  HOST: process.env.DB_HOST || "",
  USER: process.env.DB_USER || "",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "",
};

// Controllo delle variabili di ambiente
if (!process.env.DB_HOST) {
  console.error(
    "Inserire la variabile d'ambiente DB_HOST in un .env nella cartella server.",
  );
  process.exit(1);
} else if (!process.env.DB_USER) {
  console.error(
    "Inserire la variabile d'ambiente DB_USER in un .env nella cartella server.",
  );
  process.exit(1);
} else if (!process.env.DB_PASSWORD) {
  console.error(
    "Inserire la variabile d'ambiente DB_PASSWORD in un .env nella cartella server.",
  );
  process.exit(1);
} else if (!process.env.DB_NAME) {
  console.error(
    "Inserire la variabile d'ambiente DB_NAME in un .env nella cartella server.",
  );
  process.exit(1);
}
