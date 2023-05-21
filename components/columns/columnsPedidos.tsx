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


import IOrder from "@/types/IOrder"
import IUser from "@/types/IUser"
import { ColumnDef, FilterFn} from "@tanstack/react-table"
import Link from "next/link"

const ownerFilterFn: FilterFn<IOrder> = (rows , id, filterValue) => {
    const email = rows.original.owner.email
    return email.includes(filterValue)
    
}
  
export const columnsPedidos: ColumnDef<IOrder>[] = [
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
            const status = row.getValue("status") as IOrder["status"]
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
            const user = row.getValue("owner") as IUser
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
            const order = row.original

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
                        <DropdownMenuItem>Ver usuario</DropdownMenuItem>
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

