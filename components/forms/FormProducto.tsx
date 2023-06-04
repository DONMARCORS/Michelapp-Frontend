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

import <IProduct></IProduct> from "@/types/IUser"
import { Badge } from "../ui/badge";

import FastAPIClient from "@/client/client"
import { Input } from "../ui/input"

// Validaciones del formulario
const formSchema = z.object({
    email: z.string().email().min(1).max(255)
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
            const response = await client.post<IProduct>("/products/", values)
            console.log(response)
            router.push("/productos")
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Form onSubmit={form.handleSubmit(onSubmit)} className={className}>
            <Card>
                <CardHeader>
                    <CardTitle>Producto</CardTitle>
                    <CardDescription>Formulario para crear un producto</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormItem>
                        <FormLabel htmlFor="name">Nombre</FormLabel>
                        <FormField>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre"
                                {...form.register("name")}
                            />
                        </FormField>
                    </FormItem>
                    <FormItem>
                        <FormLabel htmlFor="description">Descripción</FormLabel>
                        <FormField>
                            <Input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Descripción"
                                {...form.register("description")}
                            />
                        </FormField>
                    </FormItem>
                    <FormItem>
                        <FormLabel htmlFor="price">Precio</FormLabel>
                        <FormField>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Precio"
                                {...form.register("price")}
                            />
                        </FormField>
                    </FormItem>
                    <FormItem>
                        <FormLabel htmlFor="stock">Stock</FormLabel>
                        <FormField>
                            <Input
                                type="number"
                                id="stock"
                                name="stock"
                                placeholder="Stock"
                                {...form.register("stock")}
                            />
                        </FormField>
                    </FormItem>
                    <FormItem>
                        <FormLabel htmlFor="image">Imagen</FormLabel>
                        <FormField>
                            <Input
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Imagen"
                                {...form.register("image")}
                            />
                        </FormField>
                    </FormItem>
                    <FormItem>
                        <FormLabel htmlFor="category">Categoría</FormLabel>
                        <FormField>
                            <Input
                                type="text"
                                id="category"
                                name="category"
                                placeholder="Categoría"
                                {...form.register("category")}
                            />
                        </FormField>
                    </FormItem>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Crear</Button>
                </CardFooter>
            </Card>
        </Form>
    )
}

export default FormProducto

