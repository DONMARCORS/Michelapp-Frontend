import Head from 'next/head'
import Link from 'next/link'

import Layout from '@/components/layout'



// Page content, accesible to all users. We wrap in layout component to add navbar and footer
export default function Home() {
  return (
    <div>
      <Head>
        <title>Michelapp</title>
        <meta name="description" content="Michelapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Micheladas</span>
              <span className="block text-orange-600 xl:inline"> Preparadas</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Descubre las mejores bebidas alcoholicas preparadas, con los mejores ingredientes y al mejor precio.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/" passHref>
                  Ordenar ahora
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/" passHref>
                  Contactanos
                </Link>
              </div>
            </div>
          </div>
        </main>

      </Layout>
    </div>
  )
}