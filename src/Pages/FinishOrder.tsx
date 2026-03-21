import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Orders from "../Contextos/OrderContext";
import "../css/finishorder.css";

const FinishOrder = () => {
  const { orders, setIsNewOrder, isNewOrder } = Orders();
  console.log("Estado de isNewOrder:", isNewOrder);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname);

  const lastOrder = orders[0];

  useEffect(() => {
    if (!isNewOrder) {
      navigate("/", { replace: true });
      return;
    }

    return () => {
      if (
        window.location.hash.replace("#", "") !== currentPath.current &&
        window.location.pathname !== currentPath.current
      ) {
        setIsNewOrder(false);
      }
    };
  }, [isNewOrder, navigate, setIsNewOrder]);
  if (!isNewOrder || !lastOrder) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  if (!lastOrder) {
    return <p>Carregando seu pedido...</p>;
  }
  return (
    <div className="finishOrder">
      <h1>Pedido Finalizado!</h1>

      <div className="infos-order">
        <p>Obrigado pela compra!</p>
        <span>
          Código do seu pedido: <strong>{lastOrder.id}</strong>
        </span>
        <p>Data do pedido: {formatDate(lastOrder.date)}</p>

        <div>
          <p>Para acompanhar o status do seu pedido, acesse:</p>
          <Link to="/pedidos">Meus pedidos</Link>
        </div>
      </div>
    </div>
  );
};

export default FinishOrder;
