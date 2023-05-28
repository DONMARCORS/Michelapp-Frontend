import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Icons } from "@/components/icons";

import IUser from "@/types/IUser";
import FastAPIClient from "@/client/client";
import FormAgregarVendedor from "@/components/forms/FormAgregarVendedor";
import LayoutAuthenticated from "@/components/layout/layoutAuthenticated";


const VendedoresAdd = () => {

    const client = new FastAPIClient({});
    const router = useRouter();

    return (
        <div>

            <LayoutAuthenticated title="VendedoresAdd">
                    <div className="flex flex-col gap-4 justify-center items-center mt-3">

                        <FormAgregarVendedor className="w-1/2" />

                    </div>
            </LayoutAuthenticated>

        </div>
    );
};

export default VendedoresAdd;