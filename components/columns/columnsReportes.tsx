"use client"

import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


//import IOrder from "@/types/IOrder"
//import IUser from "@/types/IUser"
import IReport from "@/types/IReport"
import { ColumnDef, FilterFn} from "@tanstack/react-table"
import Link from "next/link"


export const columnsReportes: ColumnDef<IReport>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "notas",
        header: "Notas",
        cell: ({ row }) => {
            const notas : IReport["notas"] = row.getValue("notas")
            return notas
        }
    },
    {
        accessorKey: "total",
        header: "Total",
    },
    {
        accessorKey: "rfc",
        header: "RFC",
    },
    {
        accessorKey: "owner_id",
        header: "Id Propietario",
    }
]

/*
export const columnsPedidos: ColumnDef<IRepo>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status : IOrder["status"] = row.getValue("status")
            return (
                <div className="flex items-center">
                    <span
                        className={`h-2 w-2 rounded-full mr-2 ${
                            status === "cancelado"
                                ? "bg-red-500"
                                : status === "realizado"
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                        }`}
                    />
                    {status}
                </div>
            )
        }
    },
    {
        id: "email",
        accessorKey: "owner",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const user = row.getValue("email") as IUser
            return user.email

        },
        filterFn: ownerFilterFn,
        
    },

    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.original.created_at
            return new Date(date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            })

            

        }


    },

    {
        id: "actions",
        cell: ({ row }) => {
            const order: IOrder = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(String(order.id))}
                        >
                            Copiar ID de orden
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/clientes/${order.owner_id}`}>
                                Ver detalles del usuario
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/pedidos/${order.id}`}>
                                Ver detalles del pedido
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
*/