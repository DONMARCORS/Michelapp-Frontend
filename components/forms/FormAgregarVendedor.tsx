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

import IUser from "@/types/IUser"
import { Badge } from "../ui/badge";
import { CalendarDays } from "lucide-react";

import FastAPIClient from "@/client/client"
import { Input } from "../ui/input"


// Validaciones del formulario
const formSchema = z.object({
    first_name: z.string().min(1).max(255),
    last_name: z.string().min(1).max(255),
    email: z.string().email().min(1).max(255),
    birthday: z.string(),
    address: z.string().min(1).max(255),
    password: z.string().min(1).max(255)
})


interface FormAgregarVendedorProps extends React.HTMLAttributes<HTMLDivElement> {
}

const FormAgregarVendedor: React.FC<FormAgregarVendedorProps> = ({ className }) => {

  const router = useRouter()
  const client = new FastAPIClient({})

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
      client.createVendedor(values)
      router.push("/vendedores/all")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vendedor nuevo</CardTitle>
          <CardDescription>Inserta los datos del nuevo vendedor</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@ejemplo.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                    <Input type="date" placeholder="dd/mm/aa" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Calle 44, Coyoacán, CDMX, México" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-start">
                <Button type="submit">Crear</Button>
                <Button variant="secondary" className="ml-10" type="reset" onClick={() => router.back()}>
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

export default FormAgregarVendedor




