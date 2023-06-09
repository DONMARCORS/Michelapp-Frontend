import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";
import { Icons } from "@/components/icons";
import { DataTable } from "@/components/ui/data-table";
import { columnsPedidos } from "@/components/columns/columnsPedidos";

import IOrder from "@/types/IOrder";
import FastAPIClient from "@/client/client";


const Pedidos = () => {

    

    const [orders, setOrders] = useState([] as IOrder[])
    const [loading, setLoading] = useState<boolean>(true)
    
    //Using javascript
    //const [loading, setLoading] = useState(true)

    //Using javascript: 
    // const [orders, setOrders] = useState([])


    const client = new FastAPIClient({});
    const router = useRouter();

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const response =  await client.getAllOrders();
            setOrders(response.data.results);
        }
        catch (error) {
            router.push("/login")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            
            <LayoutAuthenticated title="Pedidos">
                {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}

                {!loading && !!orders && (
                    <div className="flex flex-col bg-slate-100 w-screen">
                            <DataTable columns={columnsPedidos} data={orders} />
                    </div>
                )}
            </LayoutAuthenticated>
        </>
    )
}

export default Pedidos;