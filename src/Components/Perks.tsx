import React from "react";
import Truck from "../assets/truck.png";
import Devolucao from "../assets/devolucao.png";
import Secure from "../assets/secure.png";
import Parcelamento from "../assets/12x.png";
import "../css/perks.css";

const Perks = () => {
  return (
    <section className="perks-section">
      <ul className="perks">
        <li className="perk-item">
          <img src={Truck} alt="Frete gratis" className="perk-icon" />
          <p className="perk-text">Frete grátis</p>
        </li>

        <li className="perk-item">
          <img src={Devolucao} alt="Troca em 30 dias" className="perk-icon" />
          <p className="perk-text">Troca em 30 dias</p>
        </li>

        <li className="perk-item">
          <img src={Secure} alt="Pagamento seguro" className="perk-icon" />
          <p className="perk-text">Pagamento seguro</p>
        </li>

        <li className="perk-item">
          <img src={Parcelamento} alt="Parcelamento" className="perk-icon" />
          <p className="perk-text">12x sem juros</p>
        </li>
      </ul>
    </section>
  );
};

export default Perks;
