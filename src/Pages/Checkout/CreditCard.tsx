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
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus as Focused}
      />

      <form className="form-credit">
        <input
          type="number"
          name="number"
          placeholder="Número do Cartão"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="Nome no Cartão"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div>
          <input
            type="text"
            name="expiry"
            placeholder="Validade (MM/AA)"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="number"
            name="cvc"
            placeholder="Codigo de segurança(CVC)"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
      </form>
    </div>
  );
};

export default CreditCard;
