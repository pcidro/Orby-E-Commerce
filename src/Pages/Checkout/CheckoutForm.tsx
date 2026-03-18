import React, { useEffect } from "react";
import "./checkoutform.css";

interface IAdressData {
  nome: string;
  cep: string;
  endereco: string;
  numero: string;
  telnumber: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
}

interface viaCep {
  logradouro: string;
  complemento: string;
  bairro: string;
  estado: string;
  localidade: string;
}

interface FormData {
  setAddressData: React.Dispatch<React.SetStateAction<IAdressData>>;
  adressData: IAdressData;
}

const CheckoutForm = ({ adressData, setAddressData }: FormData) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target as HTMLInputElement;

    let newValue = value;

    if (name === "cep" || name === "telnumber" || name === "numero") {
      newValue = value.replace(/\D/g, "");
    }

    setAddressData({
      ...adressData,
      [name]: newValue,
    });
  }

  useEffect(() => {
    async function getCep() {
      if (adressData.cep.length === 0) {
        return;
      }
      const res = await fetch(
        `https://viacep.com.br/ws/${adressData.cep}/json/`,
      );
      const data: viaCep = await res.json();
      if (data) {
        setAddressData((prev) => ({
          ...prev,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.estado,
          complemento: data.complemento,
        }));
      }
    }
    getCep();
  }, [adressData.cep, setAddressData]);

  return (
    <form className="step-container">
      <h3>Endereço de entrega:</h3>

      <div className="form-row">
        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite o seu nome"
            onChange={handleChange}
            value={adressData.nome}
          />
        </div>
        <div className="input-group">
          <label htmlFor="telnumber">Número de telefone:</label>
          <input
            type="text"
            id="telnumber"
            name="telnumber"
            placeholder="00000000"
            value={adressData.telnumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="full-width">
        <div className="input-group">
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            placeholder="00000000"
            value={adressData.cep}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            placeholder="Rua..."
            name="endereco"
            onChange={handleChange}
            value={adressData.endereco}
          />
        </div>
        <div className="input-group">
          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={adressData.numero}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label htmlFor="complemento">Complemento:</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            onChange={handleChange}
            value={adressData.complemento}
          />
        </div>
        <div className="input-group">
          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            onChange={handleChange}
            value={adressData.bairro}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            onChange={handleChange}
            value={adressData.cidade}
          />
        </div>
        <div className="input-group">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            onChange={handleChange}
            value={adressData.estado}
          />
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
