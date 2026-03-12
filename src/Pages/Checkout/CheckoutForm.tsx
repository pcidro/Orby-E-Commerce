import React from "react";
import Context from "../../Context";

const CheckoutForm = () => {
  const { usuario } = Context();
  return (
    <div className="step-container">
      <h3>Endereço de entrega</h3>
      <div className="input-area">
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          placeholder="nome"
          defaultValue={usuario?.displayName || ""}
        />
      </div>
      <div className="input-area">
        <label htmlFor="cep">CEP</label>
        <input type="text" placeholder="CEP" />
      </div>
      <div className="input-area">
        <label htmlFor="cep">Endereço:</label>
        <input type="text" placeholder="Rua..." />
      </div>

      <div className="input-area">
        <label htmlFor="cep">Numero</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default CheckoutForm;
