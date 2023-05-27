import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Icons } from "@/components/icons";

import IUser from "@/types/IUser";
import FastAPIClient from "@/client/client";
import FormVendedor from "@/components/forms/FormVendedor";
import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";


const Pedido = () => {
    const [vendedor, setVendedor] = useState<IUser | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const client = new FastAPIClient({});
    const router = useRouter();
    const id = router.query.id as string;


    const getVendedor = async () => {
        try {
            const response = await client.getVendedores();
            const vendedores: IUser[] = response.results;

            // Search for the vendedor with the id that we get from the router
            const found = vendedores.find((vendedor) => vendedor.id == parseInt(id));

            setVendedor(found);

            setLoading(false);
        } catch (error) {
            await router.push("/login");
        }
    };


    useEffect(() => {
        if (id) {
            getVendedor();
        }
    }, [id]);

    return (
        <div>

            <LayoutAuthenticated title="Pedido">
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {!loading && vendedor && (
                    <div className="flex flex-col gap-4 justify-center items-center mt-3">

                        <FormVendedor  vendedor={vendedor} className="w-1/2" />

                    </div>
                )}
            </LayoutAuthenticated>

        </div>
    );
};

export default Pedido;
