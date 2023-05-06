import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";

import FastAPIClient from "@/client/client";

import Footer from "./footer";
import { Loader2 } from "lucide-react";
import NavbarAuthenticated from "./navbar/navbarAuth";
import IUser from "@/types/IUser";

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutAuthenticated = ({ children }: LayoutProps) => {
    const [profile, setProfile] = useState<IUser>()
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const client = new FastAPIClient({})

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try{
            const profile = await client.fetchUser()
            setProfile(profile)
            setLoading(false)

        }
        catch(error){
            router.push("/login")
            console.log(error)
        }
        
        
    }

    return (
        <>
        
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                </div>
            ) : (
        <main>

                <NavbarAuthenticated profile={profile!} />

                <div className="flex flex-col items-center justify-center min-h-screen">
                   
                    {children}
                </div>
                <Footer />
        </main>

            )}

        
        </>
    );
    };

export default LayoutAuthenticated;