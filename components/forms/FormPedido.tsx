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

import IOrder from "@/types/IOrder"
import { Badge } from "../ui/badge";
import { CalendarDays } from "lucide-react";

import FastAPIClient from "@/client/client"

const formSchema = z.object({
  status: z.string().min(1).max(255),

})


interface FormPedidoProps extends React.HTMLAttributes<HTMLDivElement> {
  order: IOrder
}

const FormPedido: React.FC<FormPedidoProps> = ({ className, order, ...props }) => {

  const router = useRouter()
  const client = new FastAPIClient({})

  const total = order.order_items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
      client.updateOrder(order.id, values)
      router.push("/pedidos/all")
    } catch (error) {
      console.log(error)
    }
  }

  function deleteOrder() {
    try {
      client.deleteOrder(order.id)
      router.push("/pedidos/all")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>


      <Card className={className}>
        <CardHeader className="flex justify-between">
          <Button className="ml-auto" variant="destructive" onClick={deleteOrder}>
            Eliminar Orden
          </Button>

          <div className="flex">

            <CardTitle>Orden   #{order.id}</CardTitle>
            <div className="flex ml-5">
              <Badge>
                {order.status}
              </Badge>
            </div>

          </div>
          <CardDescription className="text-gray-500 flex items-start pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </CardDescription>
        </CardHeader>



        <CardContent>
          {order.order_items.map((item) => (
            <div className="flex justify-between items-center mb-2" key={item.id}>
              <p className="text-gray-500 text-sm">{item.product.name}</p>
              <p className="text-sm font-medium ml-4">${item.product.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm ml-auto">x {item.quantity}</p>
            </div>
          ))}


          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl >
                        <SelectTrigger>
                          <SelectValue placeholder={order.status} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="realizado">realizado</SelectItem>
                        <SelectItem value="aceptado">aceptado</SelectItem>
                        <SelectItem value="proceso">proceso</SelectItem>
                        <SelectItem value="enviado">enviado</SelectItem>
                        <SelectItem value="entregado">entregado</SelectItem>
                        <SelectItem value="cancelado">cancelado</SelectItem>

                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {/* Alguna descripcion */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Otro ejemplo de input https://ui.shadcn.com/docs/forms/react-hook-form: 
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                 </FormItem> */}

              <div className="flex justify-start">
                <Button type="submit">Guardar</Button>
                <Button variant="secondary" className="ml-10" type="reset" onClick={() => router.back()}>
                  Cancelar

                </Button>
              </div>


            </form>
          </Form>


        </CardContent>



        <CardFooter>
          <p className="text-gray-600 text-sm font-medium">
            Total: ${total.toFixed(2)}
          </p>

        </CardFooter>
      </Card>
      {/* Button to erase orden, to the rigth of the card */}

    </>
  )
}

export default FormPedido




