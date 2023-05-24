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
}

const FormVendedor: React.FC<FormVendedorProps> = ({ className }) => {

  const router = useRouter()
  const client = new FastAPIClient({})


  // 2. Define a submit handler.



  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

    </>
  )
}

export default FormVendedor




