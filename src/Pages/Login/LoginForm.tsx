import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./loginform.css";
import { auth, provider } from "../../firebase";
import GoogleIcon from "../../assets/google.svg";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Loader from "../../Helpers/Loader";
import "../../Helpers/erro.css";
import Auth from "../../Contextos/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { loading, usuario } = Auth();
  const [erro, setErro] = useState<string | null>(null);

  const handleFirebaseError = (code: string) => {
    switch (code) {
      case "auth/invalid-credential":
        return "E-mail ou senha incorretos.";
      case "auth/user-not-found":
        return "Usuário não encontrado.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde.";
      default:
        return "Ocorreu um erro ao fazer login. Tente novamente.";
    }
  };

  if (loading) return <Loader />;
  if (usuario) return <Navigate to="/" />;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setErro(null);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (error) {
      if (error !== null && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string };
        setErro(handleFirebaseError(firebaseError.code));
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error !== null && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string };
        setErro(handleFirebaseError(firebaseError.code));
        console.error("Erro no Google:", error);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <section className="login-container">
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Bem-vindo de volta</h1>
            <p>
              Para aproveitar ao máximo a{" "}
              <span className="orby-purple">Orby</span> insira o endereço de
              e-mail e a senha da sua conta abaixo.
            </p>
          </div>

          <div className="input-group-login">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="email"
              id="usuario"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="input-group-login">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={({ target }) => setSenha(target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          {erro && <span className="error-helper">{erro}</span>}

          <div className="actions">
            <Link to="perdeu" className="forgot-pass">
              Perdeu a senha?
            </Link>
          </div>

          <button type="submit" className="entrar" disabled={isAuthenticating}>
            {isAuthenticating ? "ENTRANDO..." : "ENTRAR"}
          </button>

          <div className="divider">
            <span>ou entre com</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="google-btn"
          >
            <img src={GoogleIcon} alt="Google" />
            <span>Continuar com Google</span>
          </button>

          <div className="cadastre-se">
            <p>
              Não tem uma conta? <Link to="criar">Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
