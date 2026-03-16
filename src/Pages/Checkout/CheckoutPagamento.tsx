import React, { useState } from "react";
import CreditCard from "./CreditCard";
import creditImg from "../../assets/creditcard.svg";
import Pix from "../../assets/pix.svg";
import "./checkoutpagamento.css";
import qrCodeFake from "../../assets/qrcodefake.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutPagamento = () => {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateCard() {
    return cardData.number && cardData.expiry && cardData.cvc && cardData.name;
  }

  function copyPix() {
    navigator.clipboard.writeText("pagamentoPix");
    toast.success("Código Pix copiado!");
  }

  function finishOrder() {
    if (method === "credit" && !validateCard()) {
      toast.error("Preencha todos os dados do cartão");
      return;
    }
    if (!method) {
      toast.error("Selecione um método de pagamento");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Pagamento realizado");
      navigate("/finish");
    }, 3000);
  }

  const [method, setMethod] = useState("");
  return (
    <div className="step-container">
      <h3>Selecione o metodo de pagamento:</h3>
      <div className="payment-method-container ">
        <label className="payment-option">
          <input
            type="radio"
            name="method"
            value="credit"
            checked={method === "credit"}
            onChange={({ target }) => setMethod(target.value)}
          />
          <img className="img-payment" src={creditImg} alt="" />
          <span>Cartão de credito</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="method"
            value="pix"
            checked={method === "pix"}
            onChange={({ target }) => setMethod(target.value)}
          />
          <img className="img-payment" src={Pix} alt="" />
          <span>Pix</span>
        </label>
      </div>

      {method === "credit" && (
        <div>
          <h3>Pague com Cartão de credito</h3>
          <CreditCard onChange={setCardData} />
          <button disabled={loading} onClick={finishOrder}>
            {loading ? "Processando..." : "Finalizar Pedido"}
          </button>
        </div>
      )}

      {method === "pix" && (
        <div>
          <h3>Pague com Pix</h3>
          <img className="qrcode" src={qrCodeFake} />
          <button onClick={copyPix}>Copiar código</button>

          <button onClick={finishOrder} disabled={loading}>
            {loading ? "Processando..." : "Já fiz o pagamento"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPagamento;
