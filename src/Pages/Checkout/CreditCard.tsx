import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import type { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./creditcard.css";
interface cardProps {
  onChange: (data: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  }) => void;
}
const CreditCard = ({ onChange }: cardProps) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "number") {
      newValue = value.replace(/\D/g, "").slice(0, 16);
    }
    if (name === "expiry") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
    }
    if (name === "cvc") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setState((prev) => {
      const newState = { ...prev, [name]: newValue };

      onChange({
        number: newState.number,
        expiry: newState.expiry,
        cvc: newState.cvc,
        name: newState.name,
      });

      return newState;
    });
  };
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };
  return (
    <div className="payment-container">
      {" "}
      <div className="card-wrapper">
        {" "}
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus as Focused}
        />{" "}
      </div>{" "}
      <form className="form-credit">
        {" "}
        <div className="inputgroup-card">
          {" "}
          <label htmlFor="number">Número do Cartão</label>{" "}
          <input
            id="number"
            type="text"
            name="number"
            required
            inputMode="numeric"
            placeholder="0000 0000 0000 0000"
            maxLength={16}
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />{" "}
        </div>{" "}
        <div className="inputgroup-card">
          {" "}
          <label htmlFor="name">Nome no Cartão</label>{" "}
          <input
            id="name"
            required
            type="text"
            name="name"
            placeholder="Ex: Paulo Cidro"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />{" "}
        </div>{" "}
        <div className="row-group">
          {" "}
          <div className="inputgroup-card">
            {" "}
            <label htmlFor="expiry">Validade</label>{" "}
            <input
              id="expiry"
              required
              type="text"
              name="expiry"
              inputMode="numeric"
              maxLength={4}
              placeholder="MM/AA"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />{" "}
          </div>{" "}
          <div className="inputgroup-card">
            {" "}
            <label htmlFor="cvc">Cód. Segurança</label>{" "}
            <input
              id="cvc"
              type="text"
              required
              name="cvc"
              inputMode="numeric"
              maxLength={3}
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />{" "}
          </div>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
};
export default CreditCard;
