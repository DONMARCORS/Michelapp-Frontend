import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import FastAPIClient from "@/client/client";

import Footer from "./footer/footer";
import { Loader2 } from "lucide-react";
import IUser from "@/types/IUser";
import { NavbarAuthenticated } from "./navbar/navbarAuth";
import { UserAvatar } from "./navbar/userAvatar";

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutAuthenticated = ({ children }: LayoutProps) => {
    const [profile, setProfile] = useState<IUser>()
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const client = new FastAPIClient({})
    const currentPage = router.pathname;

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const profile = await client.fetchUser()
            setProfile(profile)
            setLoading(false)

        }
        catch (error) {
            router.push("/login")
            console.log(error)
        }

    }

    return (
        <>

            {loading ? (
                <div className="flex justify-center items-center h-screen bg-gray-200 w-screen">
                    <Loader2 size={64}
                        stroke="#ff8c00"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-spin"
                    />
                </div>
            ) : (
                <main>

                    <div className="border-b bg-white">
                        <div className="flex h-16 items-center px-4">

                            <NavbarAuthenticated privilege={profile!.privilege} currentPage={currentPage} />

                            <div className="ml-auto flex items-center space-x-4">
                                <UserAvatar username={profile!.first_name} email={profile!.email} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200">

                        {children}
                    </div>
                    <Footer />
                </main>

            )}


        </>
    );
};

export default LayoutAuthenticated;