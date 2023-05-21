import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Icons } from "@/components/icons";

import IOrder from "@/types/IOrder";
import FastAPIClient from "@/client/client";
import FormPedido from "@/components/forms/FormPedido";
import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";


const Pedido = () => {
    const [order, setOrder] = useState<IOrder | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const client = new FastAPIClient({});
    const router = useRouter();
    const id = router.query.id as string;

    useEffect(() => {
        if (id) {
            getOrder();
        }
    }, [id]);

    const getOrder = async () => {
        try {
            const response = await client.getAllOrders();
            const orders: IOrder[] = response.data.results;

            // Search for the order with the id that we get from the router
            const found = orders.find((order) => order.id == parseInt(id));

            setOrder(found);

            setLoading(false);
        } catch (error) {
            router.push("/login");
        }
    };

    return (
        <div>

            <Head>
                <title>Editar Pedido</title>
                <meta name="description" content="Editar Pedido" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LayoutAuthenticated >
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {!loading && order && (
                    <div className="flex flex-col gap-4 justify-center items-center mt-3">

                        <FormPedido  order={order} className="w-1/2" />

                    </div>
                )}
            </LayoutAuthenticated>

        </div>
    );
};

export default Pedido;
