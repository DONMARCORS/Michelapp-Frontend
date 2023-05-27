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
  status: z.string().min(1).max(255),
  username: z.any().optional(),
})


interface FormVendedorProps extends React.HTMLAttributes<HTMLDivElement> {
  vendedor: IUser;
}

const FormVendedor: React.FC<FormVendedorProps> = ({ className, vendedor }) => {

  const router = useRouter()
  const client = new FastAPIClient({})


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
      <Card>
        <CardHeader>
          <CardTitle>{`${vendedor.first_name} ${vendedor.last_name}`}</CardTitle>
          <CardDescription>{`Privilegio: ${vendedor.privilege}`}</CardDescription>
          <Button className="ml-auto" variant="destructive" onClick={deleteVendedor}>
            Eliminar Vendedor
          </Button>
        </CardHeader>
      </Card>

    </>
  )
}

export default FormVendedor




