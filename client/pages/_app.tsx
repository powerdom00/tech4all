// pages/_app.tsx
import { AppProps } from "next/app";
import { AuthProvider } from "./context/AuthContext"; // Percorso corretto
import "../src/css/global.css";
import "react-tabs/style/react-tabs.css";
import "../src/css/react-tabs-modificato.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
