
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import FastAPIClient from "@/client/client";
import Navbar from "./navbar/navbar";
import Footer from "./footer";
import IUser from "@/types/IUser";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const client = new FastAPIClient({});
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUser();
    }, []);


    const fetchUser = async () => {

        setLoading(true);

        try {
            const user = await client.fetchUser() as IUser;
            if (user) {
                router.push("/user");
            }
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div >
                {loading ? <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div> : <>
                    <Navbar />
                    <main className="h-screen"
                    >{children}
                    </main>
                    <Footer />
                </>}
            </div>
        </>
    );
};

export default Layout;