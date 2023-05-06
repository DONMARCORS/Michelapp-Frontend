"use client"

import * as React from "react"
import Link from "next/link"
import { UserNav } from "./navbarAvatar"
import IUser from "@/types/IUser"


interface NavbarProps {
    profile: IUser
}



export default function NavbarAuthenticated({ profile }: NavbarProps) {
    const adminLinks = [
        { href: '/', label: 'Admin' },
        { href: '/account', label: 'Vendedores' },
        { href: '/clientes', label: 'Clientes' },
        { href: '/reportes-venta', label: 'Reportes de Venta' },
    ];

    const vendedorLinks = [
        { href: '/', label: 'Vendedor' },
        { href: '/clientes', label: 'Clientes' },
        { href: '/reportes-venta', label: 'Reportes de Venta' },
        { href: '/pedidos', label: 'Pedidos' },
    ];

    const clienteLinks = [
        { href: '/', label: 'Cliente' },
        { href: '/pedidos', label: 'Pedidos' },
        { href: '/historial', label: 'Historial' },
    ];

    let links: { href: string; label: string; }[] = [];
    if (profile.privilege === 1) {
        links = adminLinks;
    } else if (profile.privilege === 2) {
        links = vendedorLinks;
    } else if (profile.privilege === 3) {
        links = clienteLinks;
    }



    return (
        <nav className="sticky top-0 z-10  bg-gray-900 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {links.map((link) => (
                                    <div key={link.label} className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                                    <Link  href={link.href} passHref>
                                        
                                            {link.label}
                                        
                                    </Link>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">

                            <div className="ml-3 relative">
                                <UserNav username={profile.first_name} email={profile.email} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>



    )
}


