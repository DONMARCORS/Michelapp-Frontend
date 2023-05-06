import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LayoutAuthenticated from "@/components/LayoutAuthenticated";
import FastAPIClient from "@/client/client"

import { Loader2 } from "lucide-react"; // Spinner
import Vendedores from "@/components/admin/vendedores"; // Vendedores component

const Admin = () => {
    const router = useRouter(); // router is used to redirect the user
    const [vendedores, setVendedores] = useState([]); 
    const [loading, setLoading] = useState(true);
    const client = new FastAPIClient({}); // client is used to make requests to the API

    useEffect(() => { // useEffect is called when the component is mounted (when the page is loaded)
        checkAdmin(); // checkAdmin is called when the component is mounted (when the page is loaded)
    }, []);

    const checkAdmin = async () => { 
        try {
            const user = await client.fetchUser(); // fetchUser is a method of the client that makes a request to the API
            console.log(user);
            if (user.privilege != 1) {
                console.log("User is not admin");
                router.push("/user");
                return;
            }
            getVendedores(); 
        } catch (error) {
            console.log(error);
            router.push("/user");
        }
    };

    const getVendedores = async () => {
        try {
            const response = await client.getVendedores();
            setVendedores(response);
            console.log(vendedores);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // setLoading is used to show a spinner while the data is being fetched
        }
    };

    return (
        <LayoutAuthenticated>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </div>
            ) : (
                <Vendedores vendedores={vendedores} />
            )}
        </LayoutAuthenticated>
    );
};

export default Admin;