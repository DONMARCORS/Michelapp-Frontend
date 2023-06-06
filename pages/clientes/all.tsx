import { useRouter } from "next/router"; 
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import FastAPIClient from "@/client/client";
import { DataTable } from "@/components/ui/data-table";
import { columnsVendedores } from "@/components/columns/columnsVendedores";



import LayoutAuthenticated from "@/components/layout/layoutAuthenticated"



const Clientes = () => {
    const router = useRouter(); 
    
    const [clientes, setClientes] = useState(null);
    const [loading, setLoading] = useState(true);
    const client = new FastAPIClient({}); 

    useEffect(() => { 
        getClientes(); 
    }, []);

    const getClientes = async () => {
        try {
            const response = await client.getAllClients();
            console.log(response.results);
            setClientes(response.results); 

        } catch (error) {
            console.log(error);
            await router.push("/perfil");  

        } finally { 
            setLoading(false);
        }
    };

    return (
        <>
            
            <LayoutAuthenticated title="Admin">
                {loading && 
                    ( 
                        <div className="flex justify-center items-center h-screen bg-gray-400 w-screen">
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        </div>

                    )}
                {!loading && clientes && 
                    (
                        <>
                                <div className="flex flex-col bg-slate-100 w-screen">
                                    <DataTable columns={columnsVendedores} data={clientes} />
                                </div>
                        </>
                    )}
            </LayoutAuthenticated>
        </>

    );
}

export default Clientes