import React from "react";
import IOrder from "@/types/IOrder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface OrderCardProps {
  order: IOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {

  
  const total = order.order_items.reduce( // We calculate the total price of the order
    (acc, item) => acc + item.quantity * item.product.price, // We multiply the quantity of each item by its price and add it to the accumulator
    0 // We start with an accumulator of 0
  );

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Order #{order.id}</h3>
        <span
          className={`text-sm font-bold uppercase ${
            order.status === "completed" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* small date gray box */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">
          {new Date(order.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">
          {new Date(order.created_at).toLocaleTimeString()}
        </p>
      </div>
      


      <Accordion type="multiple" className="w-full">
        {order.order_items.map((item) => (
          <AccordionItem key={item.id} value={item.id + ""+ order.id}>
            <AccordionTrigger className="flex justify-between items-center">
              <p className="text-sm font-medium">{item.product.name}</p>
              <p className="text-gray-500 text-sm">x {item.quantity}</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500 text-sm">Price:</p>
                <p className="text-sm font-medium">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500 text-sm">Quantity:</p>
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
      <div className="flex justify-end mt-4">
        <p className="text-gray-600 text-sm font-medium">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
