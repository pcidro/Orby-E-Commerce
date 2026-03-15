import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import type { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./creditcard.css";

const CreditCard = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <div className="payment-container">
      <div className="card-wrapper">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus as Focused}
        />
      </div>

      <form className="form-credit">
        <div className="inputgroup-card">
          <label htmlFor="number">Número do Cartão</label>
          <input
            id="number"
            type="number"
            name="number"
            required
            placeholder="0000 0000 0000 0000"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>

        <div className="inputgroup-card">
          <label htmlFor="name">Nome no Cartão</label>
          <input
            id="name"
            required
            type="text"
            name="name"
            placeholder="Ex: 'Paulo Cidro'"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>

        <div className="row-group">
          <div className="inputgroup-card">
            <label htmlFor="expiry">Validade</label>
            <input
              id="expiry"
              required
              type="text"
              name="expiry"
              placeholder="MM/AA"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="inputgroup-card">
            <label htmlFor="cvc">Cód. Segurança</label>
            <input
              id="cvc"
              type="number"
              required
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreditCard;
