import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginform.css";
import { auth, provider } from "../../firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleIcon from "../../assets/google.svg";

const LoginCreate = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  const handleGoogleSignup = async () => {
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
            <h1>Crie sua conta</h1>
            <p>
              Junte-se à <span className="orby-purple">Orby</span> inserindo
              seus dados abaixo para começar.
            </p>
          </div>

          <div className="input-group-login">
            <label htmlFor="usuario">Email</label>
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
              placeholder="Crie uma senha"
              required
            />
          </div>

          <div className="input-group-login">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={({ target }) => setConfirmarSenha(target.value)}
              placeholder="Confirme sua senha"
              required
            />
          </div>

          <button type="submit" className="entrar">
            CADASTRAR
          </button>

          <div className="divider">
            <span>ou cadastre-se com</span>
          </div>

          <button
            onClick={handleGoogleSignup}
            type="button"
            className="google-btn"
          >
            <img src={GoogleIcon} alt="Google" />
            <span>Continuar com Google</span>
          </button>

          <div className="cadastre-se">
            <p>
              Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginCreate;
