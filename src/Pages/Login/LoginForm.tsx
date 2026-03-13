import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginform.css";
import { auth, provider } from "../../firebase";
import GoogleIcon from "../../assets/google.svg";
import { signInWithPopup } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro no Google:", error);
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

          <div className="actions">
            <Link to="perdeu" className="forgot-pass">
              Perdeu a senha?
            </Link>
          </div>

          <button type="submit" className="entrar">
            ENTRAR
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
