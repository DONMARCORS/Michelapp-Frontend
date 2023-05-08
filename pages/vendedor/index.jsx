// example vendedor page
import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";
import Head from "next/head";

const Vendedor = () => {
    return (
        <>
        <Head>
            <title>Vendedor</title>
            <meta name="description" content="Michelapp" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <LayoutAuthenticated>
            <h1>Vendedor</h1>
        </LayoutAuthenticated>
        </>
    );
}

export default Vendedor;

