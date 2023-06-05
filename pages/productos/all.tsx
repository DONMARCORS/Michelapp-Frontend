import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LayoutAuthenticated from '@/components/layout/layoutAuthenticated';
import { DataTable } from '@/components/ui/data-table-vendedores';
import { columnsProductos } from '@/components/columns/columnsProductos';
import FastAPIClient from '@/client/client';
import { Icons } from '@/components/icons';

const Productos = () => {
    const router = useRouter();

    const [products, setProducts] = useState([] as any[])
    const [loading, setLoading] = useState<boolean>(true)
    const client = new FastAPIClient({});

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await client.getProducts();
            console.log(response.data.results);
            setProducts(response.data.results);

        } catch (error) {
            console.log(error);
            await router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LayoutAuthenticated title="Productos">
                {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}

                {!loading && !!products && (
                    <div className="flex flex-col bg-slate-100 w-screen">
                        <DataTable columns={columnsProductos} data={products} />
                    </div>
                )}
            </LayoutAuthenticated>
        </>
    );
};

export default Productos;