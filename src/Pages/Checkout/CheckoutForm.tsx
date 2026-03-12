import React from "react";
import Context from "../../Context";

interface IAdressData {
  nome: string;
  cep: string;
  endereco: string;
  numero: string;
}

interface FormData {
  setAddressData: React.Dispatch<React.SetStateAction<IAdressData>>;
  adressData: IAdressData;
}

const CheckoutForm = ({ adressData, setAddressData }: FormData) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAddressData({ ...adressData, [name]: value });
  }

  return (
    <form className="step-container">
      <h3>Endereço de entrega</h3>
      <div className="input-area">
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          name="nome"
          placeholder="Digite o seu nome"
          onChange={handleChange}
          value={adressData.nome}
        />
      </div>
      <div className="input-area">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          name="cep"
          placeholder="00000000"
          value={adressData.cep}
          onChange={handleChange}
        />
      </div>
      <div className="input-area">
        <label htmlFor="endereco">Endereço:</label>
        <input
          type="text"
          placeholder="Rua..."
          name="endereco"
          onChange={handleChange}
          value={adressData.endereco}
        />
      </div>

      <div className="input-area">
        <label htmlFor="numero">Numero</label>
        <input
          name="numero"
          type="text"
          value={adressData.numero}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
