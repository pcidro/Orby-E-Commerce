import React, { useState } from "react";
import CreditCard from "./CreditCard";
import creditImg from "../../assets/creditcard.svg";
import Pix from "../../assets/pix.svg";
import "./checkoutpagamento.css";
import qrCodeFake from "../../assets/qrcodefake.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Context from "../../Contextos/Context";
import Orders from "../../Contextos/OrderContext";
const CheckoutPagamento = () => {
  const { cart, total, setCart } = Context();
  const { saveOrder } = Orders();
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

  async function finishOrder() {
    if (method === "credit" && !validateCard()) {
      toast.error("Preencha todos os dados do cartão");
      return;
    }
    if (!method) {
      toast.error("Selecione um método de pagamento");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      try {
        await saveOrder(cart, total);
        setCart([]);
        toast.success("Pagamento realizado");
        navigate("/finish");
      } catch (error) {
        toast.error("Erro ao processar pedido. Tente novamente.");
      } finally {
        setLoading(false);
      }
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
        <div className="card-container">
          <h3>Pague com Cartão de credito</h3>
          <CreditCard onChange={setCardData} />
          <button
            className="finalizarPedido"
            disabled={loading}
            onClick={finishOrder}
          >
            {loading ? "Processando..." : "Finalizar Pedido"}
          </button>
        </div>
      )}

      {method === "pix" && (
        <div className="pix-container">
          <h3>Pague com Pix</h3>
          <img className="qrcode" src={qrCodeFake} />
          <div className="btns-pix">
            <button className="copycode" onClick={copyPix}>
              Copiar código
            </button>

            <button
              className="finalizarPedidoPix"
              onClick={finishOrder}
              disabled={loading}
            >
              {loading ? "Processando..." : "Já fiz o pagamento"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPagamento;
