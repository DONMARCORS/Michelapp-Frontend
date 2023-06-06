"use client"

import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/router"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"

import IProduct from "@/types/IProduct"
import { Badge } from "../ui/badge";

import FastAPIClient from "@/client/client"
import { Input } from "../ui/input"

// Validaciones del formulario IPorduct
const formSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    price: z.any().optional(),
    quantity: z.any().optional(),
})

interface FormProductoProps extends React.HTMLAttributes<HTMLDivElement> {
    producto: IProduct;
}

const FormProducto: React.FC<FormProductoProps> = ({ className, producto }) => {

    const router = useRouter()
    const client = new FastAPIClient({})

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // ✅ This will be type-safe and validated.
        console.log(values)
        try {
            const response = await client.updateProduct(producto.id, values)
            console.log(response)
            router.push("/productos/all")
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteProduct() {
        try {
            const response = await client.deleteProduct(producto.id)
            console.log(response)
            router.push("/productos/all")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        form.reset({
            name: producto.name,
            description: producto.description,
            price: producto.price,
            quantity: producto.quantity,
        })
    }, [producto])


    return (
        <>
        <Card className={className}>
            <CardHeader>
                <CardTitle>Producto</CardTitle>
                <CardDescription>{'Edita la información del producto'}</CardDescription>
                <Button className="ml-auto" variant="destructive" onClick={deleteProduct}>
                    Eliminar producto
                </Button>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>Nombre del producto</FormLabel>
                                <FormDescription>
                                    Escribe un nombre para el producto:
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="Clamato" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormDescription>
                                    Escribe una descripción para el producto:
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="Jugo de tomate preparado" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormDescription>
                                    Escribe el precio del producto:
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="23.50" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>Cantidad</FormLabel>
                                <FormDescription>
                                    Escribe la cantidad de productos disponibles:
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="100" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-end">
                        <Button type="submit">Guardar</Button>
                        <Button variant="secondary" className="ml-10" type="reset" onClick={router.back}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
    </>
    )
}

export default FormProducto