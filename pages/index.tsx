import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from 'lucide-react';

import Layout from '@/components/layout/layout'
import FastAPIClient from "@/client/client";
import IUser from "@/types/IUser";


// Page content, accessible to all users. We wrap in layout component to add navbar and footer
export default function Home() {
  const client = new FastAPIClient({});
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false); // new state

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => { // We will redirect user to /perfil if user is logged in
    try {
      const user = await client.fetchUser() as IUser;
      if (user) {
        await router.push("/perfil");
        setShowContent(false)

      }
    }
    catch (error) {
      console.log(error);
      setShowContent(true); // set showContent to true after loading is complete and no user is found

    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Michelapp</title>
        <meta name="description" content="Michelapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && ( // While loading (fetching user) we show a loading spinner
        <div className="flex justify-center items-center h-screen  bg-gray-200 w-screen">
          <Loader2
            size={64}
            stroke="#ff8c00"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          />
        </div>
      )}

      {showContent && !loading && ( // When loading is complete and no user is found, we show the page content
        <Layout>
          <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Micheladas</span>
                <span className="block text-orange-600 xl:inline"> Preparadas</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Descubre las mejores bebidas alcohólicas preparadas, con los mejores ingredientes y al mejor precio.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link href="/" passHref>
                    Ordenar ahora
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link href="/" passHref>
                    Contáctanos
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </Layout>
      )}
    </div>
  )
}
