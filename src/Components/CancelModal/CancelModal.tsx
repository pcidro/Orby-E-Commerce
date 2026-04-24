import toast from "react-hot-toast";
import { Orders } from "../../Contextos/OrderContext";
import { type IOrder } from "../../Contextos/OrderContext";
import "./cancelmodal.css";
interface IcancelModal {
  onClose: () => void;
  order: IOrder;
}

const CancelModal = ({ onClose, order }: IcancelModal) => {
  const { removeOrder } = Orders();
  function handleRemove() {
    removeOrder(order.id);
    onClose();
  }
  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div
        className="modal-content-cancel"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          Tem certeza que deseja cancelar o pedido? Essa ação não poderá ser
          desfeita!
        </h2>
        <div className="btns-modal">
          <button className="btn-cancel-modal" onClick={handleRemove}>
            Cancelar o pedido
          </button>
          <button className="btn-voltar-modal" onClick={onClose}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
