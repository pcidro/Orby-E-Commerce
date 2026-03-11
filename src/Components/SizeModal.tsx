import React, { useState } from "react";

import type { IProducts } from "../Types";

import Context from "../Context";
import Cart from "../assets/cart2.svg";
import toast from "react-hot-toast";
import "../css/sizeModal.css";
import Cancel from "../assets/cancel.svg";

interface Imodal {
  product: IProducts;

  onClose: () => void;
}

const SizeModal = ({ product, onClose }: Imodal) => {
  const { addItemCart } = Context();

  const [selectedSize, setSelectedSize] = useState<string>("");

  function confirmAddition() {
    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho!");
      return;
    }

    const productWithSize = { ...product, size: selectedSize };
    addItemCart(productWithSize);
    toast.success(`${product.title} adicionado ao carrinho!`);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Selecione o tamanho para: {product.title}</h2>

        <div className="size-selector-container">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="size-selector"
            defaultValue=""
          >
            <option value="" disabled>
              Escolha um tamanho
            </option>

            {product.sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="btns-modal">
          <button className="btn-confirm" onClick={confirmAddition}>
            <img src={Cart} alt="" />
            Confirmar
          </button>
          <button className="btn-cancel" onClick={onClose}>
            <img src={Cancel} alt="" />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeModal;
