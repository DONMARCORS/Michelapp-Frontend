// this page is visible in localhost:3000/admin
// all pages inside admin directory are visible in localhost:3000/admin/*
// this pages are pages that make authenticated requests to the backend ad admins

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";
import { DataTable } from "@/components/ui/data-table-vendedores";
import { columnsVendedores } from "@/components/columns/columnsVendedores";
import FastAPIClient from "@/client/client"
import { Icons } from '@/components/icons';

const Admin = () => {
    const router = useRouter(); // router is used to redirect the user
    
    const [vendedores, setVendedores] = useState(null); // useState creates a state variable that will be used to store the data fetched from the API and a function to update the state variable
    const [loading, setLoading] = useState(true);
    const client = new FastAPIClient({}); // client is used to make requests to the API

    useEffect(() => { // useEffect is called when the component is mounted (when the page is loaded)
        getVendedores(); // getVendedores is called to fetch the data
    }, []);

    const getVendedores = async () => {
        try {
            const response = await client.getVendedores(); // make request to backend to fetch data
            console.log(response.results); // log the data fetched, visible in browser -> more tools -> console
            setVendedores(response.results); // update the state variable with the data fetched

        } catch (error) { // backend returns error if user isnt authenticated or isnt admin, so we redirect the user to the login page
            console.log(error);
            await router.push("/perfil");  // redirect user to perfil page

        } finally { // finally is called after the try or catch block
            setLoading(false); // setLoading is used to show a spinner while the data is being fetched
        }
    };

    return (
        <>
            
            <LayoutAuthenticated title="Admin">
                {loading && // if loading is true, we show a spinner
                    ( 
                        <div className="flex justify-center items-center h-screen bg-gray-400 w-screen">
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        </div>

                    )}
                {!loading && vendedores && // if loading is false and vendedores is not null, we show the data
                    (
                        <>
                                <div className="flex flex-col bg-slate-100 w-screen">
                                    <DataTable columns={columnsVendedores} data={vendedores} />
                                </div>
                        </>
                    )}
            </LayoutAuthenticated>
        </>

    );
};

export default Admin;