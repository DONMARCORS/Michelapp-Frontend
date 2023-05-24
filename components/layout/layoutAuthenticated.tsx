import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import FastAPIClient from "@/client/client";

import Footer from "./footer/footer";
import IUser from "@/types/IUser";
import { NavbarAuthenticated } from "./navbar/navbarAuth";
import { UserAvatar } from "./navbar/userAvatar";
import { Icons } from "@/components/icons";
import Head from "next/head";

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const LayoutAuthenticated = ({ children, title }: LayoutProps) => {
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
            <Head>
                <title>{title}</title>
                <meta name="description" content="Michelapp" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {loading ? (
                <div className="flex justify-center items-center h-screen bg-gray-200 w-screen">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />

                </div>
            ) : (
                <main>

                    <div className="flex h-16 items-center border-b bg-white px-4">

                        <NavbarAuthenticated privilege={profile!.privilege} currentPage={currentPage} />

                        <div className="ml-auto flex items-center space-x-4">
                            <UserAvatar username={profile!.first_name} email={profile!.email} />
                        </div>
                    </div>

                    <div className="flex flex-col min-h-screen w-screen  bg-gray-200 text-gray-950 pt-5 pb-4">
                        {children}
                    </div>


                </main>


            )}

            <div className="border-t bg-white">
                <Footer />
            </div>
        </>
    );
};

export default LayoutAuthenticated;