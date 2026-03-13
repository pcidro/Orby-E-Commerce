import React, { useEffect, useState } from "react";
import Context from "../../Context";
import CheckoutForm from "./CheckoutForm";
import CheckoutPagamento from "./CheckoutPagamento";
import "./checkout.css";
import toast from "react-hot-toast";
import type { FormData } from "../../Types";

const Checkout = () => {
  const { cart, usuario } = Context();
  const [currentStep, setCurrentStep] = useState(0);
  const [addressData, setAddressData] = useState<FormData>({
    nome: usuario?.displayName || "",
    cep: "",
    endereco: "",
    numero: "",
    telnumber: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "-",
  });

  useEffect(() => {
    setAddressData((prev) => ({
      ...prev,
      nome: usuario?.displayName || "",
    }));
  }, [usuario]);
  const steps = [
    {
      title: "Frete",
      component: (
        <CheckoutForm
          adressData={addressData}
          setAddressData={setAddressData}
        />
      ),
    },
    {
      title: "Pagamentos",
      component: <CheckoutPagamento />,
    },
  ];

  const StepValid = () => {
    if (currentStep === 0) {
      return (
        addressData.nome.trim() !== "" &&
        addressData.cep.trim() !== "" &&
        addressData.endereco.trim() !== "" &&
        addressData.numero.trim() !== "" &&
        addressData.bairro.trim() !== "" &&
        addressData.cidade.trim() !== "" &&
        addressData.estado.trim() !== "" &&
        addressData.telnumber.trim() !== ""
      );
    }
    return true;
  };

  const handleStepChange = (index: number) => {
    if (index > currentStep && !StepValid()) {
      toast.error("Prencha todos os campos!");
      return;
    }
    setCurrentStep(index);
  };

  const handleNextStep = () => {
    if (!StepValid()) {
      toast.error("Prencha todos os campos!");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="checkout-container">
      <div className="stepper">
        <nav className="header-stepper">
          {steps.map((step, index) => (
            <div onClick={() => handleStepChange(index)} key={index}>
              <button
                className={`button-step ${currentStep === index ? "active" : ""}`}
              >
                {index + 1} - {step.title}
              </button>
            </div>
          ))}
        </nav>
        <div className="stepper-content">{steps[currentStep].component}</div>
        {currentStep === 0 && (
          <button
            className="stepper-content-button"
            onClick={() => handleNextStep()}
          >
            Continuar
          </button>
        )}
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
