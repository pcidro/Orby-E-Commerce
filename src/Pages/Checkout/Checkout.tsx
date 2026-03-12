import React, { useState } from "react";
import Context from "../../Context";
import CheckoutForm from "./CheckoutForm";
import CheckoutPagamento from "./CheckoutPagamento";
import "../../css/checkout.css";

const Checkout = () => {
  const { cart } = Context();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "Frete",
      component: <CheckoutForm />,
    },
    {
      title: "Revisão e Pagamentos",
      component: <CheckoutPagamento />,
    },
  ];
  return (
    <div className="checkout-container">
      <div className="stepper-container">
        <nav className="header-stepper">
          {steps.map((step, index) => (
            <div
              className="steps-button"
              onClick={() => setCurrentStep(index)}
              key={index}
            >
              <button className="button-step">
                {index + 1} {step.title}
              </button>
            </div>
          ))}
        </nav>
        <div className="stepper-content">
          {steps[currentStep].component}
          {currentStep === steps.length - 1 && (
            <button>Finalizar Pedido</button>
          )}
        </div>
      </div>
      <div className="resumopedido">
        <h2>Resumo do Pedido</h2>
        {cart.map((produto) => (
          <div>
            <h3>{produto.title}</h3>
            <p>Tamanho: {produto.size}</p>
            <p>Quantidade: {produto.amount}</p>
            <p>Subtotal: R$ {produto.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
