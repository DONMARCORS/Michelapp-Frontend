import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Icons } from "@/components/icons";

import FastAPIClient from "@/client/client";
import IOrder from "@/types/IOrder";
import PedidoCard from "@/components/cards/cardPedido";

const Pedidos = () => {

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const client = new FastAPIClient({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await client.getOwnOrders();
      setOrders(response.results);
    }
    catch (error) {
      await router.push("/login");
    }
    finally {
      setLoading(false);
    }

  };

  return (
    <>
      <LayoutAuthenticated title="Pedidos">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-8">Tus Ordenes</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {loading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
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
