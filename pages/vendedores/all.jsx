// this page is visible in localhost:3000/admin
// all pages inside admin directory are visible in localhost:3000/admin/*
// this pages are pages that make authenticated requests to the backend ad admins

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from 'next/head'

import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";
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
            router.push("/perfil");  // redirect user to perfil page

        } finally { // finally is called after the try or catch block
            setLoading(false); // setLoading is used to show a spinner while the data is being fetched
        }
    };

    return (
        <>
            <Head>
                <title>Admin</title>
                <meta name="description" content="Michelapp" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <LayoutAuthenticated>
                {loading && // if loading is true, we show a spinner
                    ( 
                        <div className="flex justify-center items-center h-screen bg-gray-400 w-screen">
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        </div>

                    )}
                {!loading && vendedores && // if loading is false and vendedores is not null, we show the data
                    (
                        <>
                            <h1>Admin</h1>
                            <div>
                                <h2>Vendedores</h2>
                                <ul>
                                    {vendedores.map((vendedor) => (
                                        <li key={vendedor.id}>
                                            {vendedor.first_name} {vendedor.email}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
            </LayoutAuthenticated>
        </>

    );
};

export default Admin;