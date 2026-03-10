import React, { useState } from "react";

import type { IProducts } from "../Types";

import Context from "../Context";

import toast from "react-hot-toast";
import "../css/sizeModal.css";

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
    <div className="modal-overlay">
      <div className="modal-content">
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
              <option
                className={selectedSize === size ? "active" : ""}
                value={size}
                key={size}
              >
                {size}
              </option>
            ))}
          </select>
        </div>
        <button onClick={confirmAddition}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default SizeModal;
