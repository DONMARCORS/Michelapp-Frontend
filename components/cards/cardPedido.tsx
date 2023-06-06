import React from "react";
import IOrder from "@/types/IOrder";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react";

interface OrderCardProps extends React.HTMLAttributes<HTMLDivElement>
{
  order: IOrder;
}


const PedidoCard: React.FC<OrderCardProps> = ({ className, order, ...props }) => {
  const total = order.order_items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <Card className={className}>
      <CardHeader className="flex justify-between">
        <div className="flex">

          <CardTitle>Orden   #{order.id}</CardTitle>
          <div className="flex items-right ml-auto">
            <Badge className={`${order.status === "entregado" ? "bg-green-500" : 
            order.status === "cancelado" ? "bg-red-500" : 
            order.status === "realizado" ? "bg-yellow-500" : 
            
            ""} text-white`}>

              {order.status}</Badge>
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

        <Accordion type="multiple" className="w-full">
          {order.order_items.map((item) => (
            <AccordionItem key={item.id} value={item.id + "" + order.id}>
              <AccordionTrigger className="flex justify-between items-center">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-gray-500 text-sm ml-auto">x {item.quantity}</p>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-sm">Precio:</p>
                  <p className="text-sm font-medium">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-sm">Cantidad:</p>
                  <p className="text-sm font-medium">{item.quantity}</p>
                </div>
                <div className="flex justify-end">
                  <p className="text-gray-600 text-sm font-medium">
                    Subtotal: ${(item.quantity * item.product.price).toFixed(2)}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>

      <CardFooter>
        <p className="text-gray-600 text-sm font-medium">
          Total: ${total.toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}

export default PedidoCard;