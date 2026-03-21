import React, { useState } from "react";
import toast from "react-hot-toast";
import "../css/newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Por favor, insira um email válido");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email inválido");
      return;
    }

    setIsLoading(true); // começa loading

    setTimeout(() => {
      toast.success(`Confirmação enviada para ${email}!`);
      setEmail("");
      setIsLoading(false); // termina loading
    }, 2000);
  }

  return (
    <section className="orby-newsletter-section">
      <div className="orby-newsletter-container">
        <div className="orby-newsletter-content">
          <div className="orby-newsletter-text">
            <h2 className="orby-newsletter-headline">
              Receba novidades e descontos exclusivos
            </h2>
            <p className="orby-newsletter-description">
              Acesso antecipado a novos lançamentos e ofertas só para você
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="orby-newsletter-form">
            <div className="orby-newsletter-input-wrapper">
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="orby-newsletter-input"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="orby-newsletter-button"
              >
                {isLoading ? "Carregando..." : "Cadastrar"}
              </button>
            </div>
          </form>

          <p className="orby-newsletter-notice">
            Seus dados estão protegidos. Sem spam, nunca.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
