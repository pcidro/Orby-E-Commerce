import React, { type PropsWithChildren } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface iAuthContext {
  usuario: User | null;
  loading: boolean;
  handleLogout: () => void;
}

type usuarioProps = null | User;

const AuthContextUi = React.createContext<iAuthContext | null>(null);

export const Auth = () => {
  const context = React.useContext(AuthContextUi);
  if (!context) throw new Error("useAuth deve estar dentro do AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = React.useState<usuarioProps>(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const login = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null);
      }
      setLoading(false);
    });
    return () => login();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContextUi.Provider
      value={{
        usuario,
        loading,
        handleLogout,
      }}
    >
      {children}
    </AuthContextUi.Provider>
  );
};

export default Auth;
