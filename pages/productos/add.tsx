import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Icons } from '@/components/icons';

import IProduct from '@/types/IProduct';
import FastAPIClient from '@/client/client';
import FormAgregarProducto from '@/components/forms/FormAgregarProducto';
import LayoutAuthenticated from '@/components/layout/layoutAuthenticated';

const ProductosAdd = () => {
    const client = new FastAPIClient({});
    const router = useRouter();

    return (
        <div>
            <LayoutAuthenticated title="ProductosAdd">
                <div className="flex flex-col gap-4 justify-center items-center mt-3">
                    <FormAgregarProducto className="w-1/2" />
                </div>
            </LayoutAuthenticated>
        </div>
    );
}

export default ProductosAdd;