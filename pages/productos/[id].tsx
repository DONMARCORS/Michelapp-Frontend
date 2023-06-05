import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Icons } from '@/components/icons';

import IProduct from '@/types/IProduct';
import FastAPIClient from '@/client/client';
import FormProducto from '@/components/forms/FormProducto';
import LayoutAuthenticated from '@/components/layout/layoutAuthenticated';

const Producto = () => {
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const client = new FastAPIClient({});
    const router = useRouter();
    const id = router.query.id as string;

    const getProduct = async () => {
        try {
            const response = await client.getAllProducts();
            const products: IProduct[] = response.data.results;

            // Search for the product with the id that we get from the router
            const found = products.find((product) => product.id == parseInt(id));

            setProduct(found);

            setLoading(false);
        } catch (error) {
            await router.push('/login');
        }
    };

    useEffect(() => {
        if (id) {
            getProduct();
        }
    }, [id]);

    return (
        <div>
            <LayoutAuthenticated title="Producto">
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {!loading && product && (
                    <div className="flex flex-col gap-4 justify-center items-center mt-3">
                        <FormProducto product={product} className="w-1/2" />
                    </div>
                )}
            </LayoutAuthenticated>
        </div>
    );

export default Producto;