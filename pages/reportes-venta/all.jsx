import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";
import { Icons } from "@/components/icons";
import { DataTable } from "@/components/ui/data-table-reportes";
import { columnsReportes } from "@/components/columns/columnsReportes";

import FastAPIClient from "@/client/client";


const Reportes = () => {

    

    //const [orders, setOrders] = useState([] as IReport[])
    //const [loading, setLoading] = useState<boolean>(true)
    
    //Using javascript
    const [loading, setLoading] = useState(true)

    //Using javascript: 
    const [reportes, setReportes] = useState([])


    const client = new FastAPIClient({});
    const router = useRouter();

    useEffect(() => {
        getReportes();
    }, []);

    const getReportes = async () => {
        try {
            const response =  await client.getAllReports();
            setReportes(response.data.results);
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
            
            <LayoutAuthenticated title="Reportes All">
                {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}

                {!loading && !!reportes && (
                    <div className="flex flex-col bg-slate-100 w-screen">
                            <DataTable columns={columnsReportes} data={reportes} />
                    </div>
                )}
            </LayoutAuthenticated>
        </>
    )
}

export default Reportes;