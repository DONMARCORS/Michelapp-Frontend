import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge"
import IProduct from "@/types/IProduct";

interface OrderCardProps extends React.HTMLAttributes<HTMLDivElement>
{
  product: IProduct;
}

const ProductoCard: React.FC<OrderCardProps> = ({ className, product, ...props }) => {
    return (
        <Card className={className}>
        <CardHeader className="flex justify-between">
            <div className="flex">
    
            <CardTitle>{product.name}</CardTitle>
            <div className="flex items-right ml-auto">
            <Badge>
                {product.price}
            </Badge>
            </div>
            </div>
            <CardDescription className="text-gray-500 flex items-start pt-2">
            <p className="text-xs text-muted-foreground">
                {product.description}
            </p>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="multiple" className="w-full">
            <AccordionItem key={product.id} value={product.id + ""}>
                <AccordionTrigger className="flex justify-between items-center">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-gray-500 text-sm ml-auto">x {product.price}</p>
                </AccordionTrigger>
                <AccordionContent>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-sm">Precio:</p>
                    <p className="text-sm font-medium">${product.price}</p>
                </div>
                </AccordionContent>
            </AccordionItem>
            </Accordion>