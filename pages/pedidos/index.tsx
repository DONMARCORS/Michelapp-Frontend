import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";
import Head from "next/head";
import { useState, useEffect } from "react";

import FastAPIClient from "@/client/client";
import IOrder from "@/types/IOrder";
import PedidoCard from "@/components/cards/cardPedido";

const Pedidos = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const client = new FastAPIClient({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await client.getOwnOrders();
    setOrders(response.results);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Pedidos</title>
        <meta name="description" content="Michelapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutAuthenticated>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-8">Tus Ordenes</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {loading && <p >Cargando...</p>}
            {!loading && orders.length === 0 && (
              <p >No se encontraron órdenes.</p>
            )}
            {orders.map((order) => (
              <PedidoCard key={order.id} order={order} className="shadow-lg" />
            ))}
          </div>
        </div>
      </LayoutAuthenticated>
    </>
  );
};

export default Pedidos;
