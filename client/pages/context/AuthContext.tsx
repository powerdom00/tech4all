import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  cognome: string;
  quiz_superati: string;
  id: number;
  nome: string;
  email: string;
  ruolo: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Crea il contesto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.id) {
      setUser(parsedUser);
    } else {
      console.error("L'utente salvato nel localStorage non contiene un ID valido:", parsedUser);
    }
  }
}, []);


const login = (user: User) => {
  if (!user.id) {
    console.error("L'utente passato a login non contiene un ID:", user);
    return;
  }
  setUser(user);
  localStorage.setItem("user", JSON.stringify(user));
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Rimuovi l'utente da localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
