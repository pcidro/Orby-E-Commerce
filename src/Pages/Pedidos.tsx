import React, { useEffect } from "react";
import Orders from "../Contextos/OrderContext";
import "../css/pedidos.css";
import { Link } from "react-router-dom";

const Pedidos = () => {
  const { orders } = Orders();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="meus-pedidos-container">
      {orders.length === 0 ? (
        <div className="noorder">
          <p>Você ainda não possui nenhum pedido!</p>
          <Link to="/">Veja nossos produtos</Link>
        </div>
      ) : (
        <>
          <h1 className="titulo-pedidos">Seus pedidos</h1>

          <div className="lista-pedidos">
            {orders.map((order) => (
              <article className="card-pedido" key={order.id}>
                <header className="card-pedido-header">
                  <div className="header-info-grupo">
                    <div className="info-bloco">
                      <span className="info-label">PEDIDO REALIZADO</span>
                      <p className="info-valor">{formatDate(order.date)}</p>
                    </div>

                    <div className="info-bloco">
                      <span className="info-label">TOTAL</span>
                      <p className="info-valor">{order.total}</p>
                    </div>
                  </div>

                  <div className="header-id-grupo">
                    <p className="pedido-id">PEDIDO Nº {order.id}</p>
                  </div>
                </header>

                <div className="card-pedido-body">
                  {order.items.map((item) => (
                    <div
                      className="produto-item"
                      key={`${order.id}-${item.id}`}
                    >
                      <div className="produto-imagem-wrapper">
                        <img src={item.image} alt={item.title} />
                      </div>

                      <div className="produto-detalhes">
                        <Link
                          to={`/produto/${item.id}`}
                          className="produto-titulo"
                        >
                          {item.title}
                        </Link>

                        <Link
                          to={`/produto/${item.id}`}
                          className="btn-comprar-novamente"
                        >
                          Comprar novamente
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Pedidos;
