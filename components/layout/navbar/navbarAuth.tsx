import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"


interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    privilege: number
    currentPage: string
}
export function NavbarAuthenticated({
    privilege,
    currentPage,
    className,
    ...props
}: NavbarProps) {
    const adminLinks = [
        { href: '/admin', label: 'Admin' },
        { href: '/ordenes', label: 'Ordenes' },
        { href: '/reportes-venta', label: 'Reportes de Venta' },
    ];

    const vendedorLinks = [
        { href: '/clientes', label: 'Clientes' },
        { href: '/reportes-venta', label: 'Reportes de Venta' },
        { href: '/pedidos', label: 'Pedidos' },
    ];

    const clienteLinks = [
        { href: '/productos', label: 'Ordenar Ahora' },
        { href: '/pedidos', label: 'Mis Pedidos' },
        { href: '/perfil', label: 'Mi Perfil' },
    ];

    let links: { href: string; label: string; }[] = [];
    if (privilege === 1) {
        links = adminLinks;
    }
    if (privilege === 2) {
        links = vendedorLinks;
    }
    if (privilege === 3) {
        links = clienteLinks;
    }



    return (
        <nav className={cn("flex items-center justify-between py-4", className)} {...props}>
            <div className="flex items-center space-x-4 lg:space-x-6 m-2 ml-4">
                {links.map((link) => (
                    <div key={link.label} className="text-sm font-medium transition-colors hover:text-primary space-x-4">
                        <Link href={link.href} passHref>
                            {link.label === 'Ordenar Ahora' ? (
                                <div className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
                                    Ordenar Ahora
                                </div>
                            ) : (
                                <div className= {cn( "hover:text-gray-500", currentPage === link.href ? "text-gray-900" : "text-gray-600")}>
                                    {link.label}
                                </div>
                            )}
                        </Link>
                    </div>

                ))}

            </div>
        </nav>

    )
}
