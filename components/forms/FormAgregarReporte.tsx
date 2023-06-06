"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/router"


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"


import FastAPIClient from "@/client/client"
import { Input } from "../ui/input"
import IReport from "@/types/IReport"


// Validaciones del formulario
const formSchema = z.object({
    notas: z.string().min(1).max(255),
    //total: z.string().min(1).max(255),
    total: z.any(),
    owner_id: z.any(),
    rfc: z.string().min(13).max(13),
})


interface FormAgregarReporteProps extends React.HTMLAttributes<HTMLDivElement> {
}

const FormAgregarReporte: React.FC<FormAgregarReporteProps> = ({ className }) => {

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
      await client.createReport(values)
      router.push("/reporte-venta/all")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Reporte de venta nuevo</CardTitle>
          <CardDescription>Inserta los datos del nuevo reporte de venta</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="notas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas</FormLabel>
                    <FormControl>
                      <Input placeholder="Escribe tus notas" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1500" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Id</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="1" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rfc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RFC</FormLabel>
                    <FormControl>
                      <Input placeholder="ABCDEFGHIJKLM" {...field} />
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

export default FormAgregarReporte




