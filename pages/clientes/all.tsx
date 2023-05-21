import LayoutAuthenticated from "@/components/layout/layoutAuthenticated"
import Head from "next/head"

const Clientes = () => {
    return (
        <>
            <Head>
                <title>Clientes</title>
                <meta name="description" content="Michelapp" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LayoutAuthenticated>
                <div className="flex flex-col">
                    <h1>Clientes</h1>
                </div>

            </LayoutAuthenticated>
        </>
    )
}

export default Clientes