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


import IUser from "@/types/IUser"
import { ColumnDef, FilterFn} from "@tanstack/react-table"
import Link from "next/link"

const ownerFilterFn: FilterFn<IUser> = (rows , id, filterValue) => {
    const email = rows.original.email
    return email.includes(filterValue)
    
}
  
export const columnsPedidos: ColumnDef<IUser>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "privilege",
        header: "Privilege"
    },
    // {
    //     id: "email",
    //     accessorKey: "email",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Email
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => {
    //         return row.getValue("email");

    //     },
    //     filterFn: ownerFilterFn,
        
    // },

    {
        accessorKey: "first_name",
        header: "Nombre"
    },
    {
        accessorKey: "last_name",
        header: "Apellidos"
    },
    {
        id: "actions",
        cell: ({ row }) => {
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
                            // onClick={() => navigator.clipboard.writeText(String(order.id))}
                        >
                            Borrar vendedor
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Editar vendedor
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Agregar vendedor
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]