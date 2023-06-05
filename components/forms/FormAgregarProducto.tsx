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
import client from "@/client/client"

// Validaciones del formulario
const formSchema = z.object({
    name: z.string().min(1).max(255),
    id: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    price: z.number().min(1),
    stock: z.number().min(1),
})

interface FormAgregarProductoProps extends React.HTMLAttributes<HTMLDivElement> {
}

const FormAgregarProducto: React.FC<FormAgregarProductoProps> = ({ className }) => {

    const router = useRouter()
    const product = router.query.id

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    // 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof formSchema>) {
        const product: IProduct =  
        await client.post<IProduct>("/products/", data)
        console.log(product)
        try{
            router.push("/productos")
        } catch(error){
            console.log(error)
        }
    }

    return (
        <>
        <Card className={className}>
            <CardHeader>
                <CardTitle>Agregar Producto</CardTitle>
                <CardDescription>
                    Llena el formulario para agregar un nuevo producto
                </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="name"
                    render={({ field, formState }) => (
                        <FormItem>
                            <FormLabel>Nombre del producto:</FormLabel>
                            <FormControl>
                                <Input placeholder="Chamoy" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="id"
                    render={({ field, formState }) => (
                        <FormItem>
                            <FormLabel>ID del producto:</FormLabel>
                            <FormControl>
                                <Input placeholder="567" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    render={({ field, formState }) => (
                        <FormItem>
                            <FormLabel>Descripción del producto:</FormLabel>
                            <FormControl>
                                <Input placeholder="Pulpa de tamarindo con miguelito" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="price"
                    render={({ field, formState }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
                            <FormControl>
                                <Input placeholder="50.60" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="stock"
                    render={({ field, formState }) => (
                        <FormItem>
                            <FormLabel>Unidades disponibles del producto:</FormLabel>
                            <FormControl>
                                <Input placeholder="100" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button type="submit">Agregar</Button>
                    <Button variant="secondary" className="ml-10" type="reset" onClick={() => router.back}>
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

export default FormAgregarProducto