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

import { useForm } from "react-hook-form"

import IUser from "@/types/IUser"
import { Badge } from "../ui/badge";
import { CalendarDays } from "lucide-react";

import FastAPIClient from "@/client/client"
import { Input } from "../ui/input"


// Validaciones del formulario
const formSchema = z.object({
  email: z.string().email().min(1).max(255)
})


interface FormVendedorProps extends React.HTMLAttributes<HTMLDivElement> {
  vendedor: IUser;
}

const FormVendedor: React.FC<FormVendedorProps> = ({ className, vendedor }) => {

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
      await client.updateVendedor(vendedor.id, values)
      router.push("/vendedores/all")
    } catch (error) {
      console.log(error)
    }
  }


  function deleteVendedor() {
    try {
      client.deleteVendedor(vendedor.id)
      router.push("/vendedores/all")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>{`${vendedor.first_name} ${vendedor.last_name}`}</CardTitle>
          <CardDescription>{`Privilegio: ${vendedor.privilege}`}</CardDescription>
          <Button className="ml-auto" variant="destructive" onClick={deleteVendedor}>
            Eliminar Vendedor
          </Button>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormDescription>
                      Escribe un nuevo email:
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="email@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-start">
                <Button type="submit">Actualizar</Button>
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

export default FormVendedor




