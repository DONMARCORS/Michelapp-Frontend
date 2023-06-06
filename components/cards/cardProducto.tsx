import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import IProduct from "@/types/IProduct";
import Image from "next/image";
import { Button } from "../ui/button";

interface OrderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: IProduct;
  randomIndex: number;
  onAddToCart: () => void;

}

const imageUrls = [
  "/product_photos/1.jpeg",
  "/product_photos/2.jpeg",
  "/product_photos/3.jpeg",
  "/product_photos/4.jpeg",
  "/product_photos/5.jpeg",
];

const ProductoCard: React.FC<OrderCardProps> = ({ className, product, onAddToCart, randomIndex, ...props }) => {
  
  const randomImageUrl = imageUrls[randomIndex];


  return (
    <Card className={className}>
      <CardHeader className="flex justify-between">
        <div className="flex items-center">
          <div className="flex flex-col justify-between">
            <CardTitle>

              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-md text-muted-foreground ml-2">
                  $ {product.price}
                </p>
              </div>
            </CardTitle>

          </div>
        </div>
        <CardDescription className="text-gray-500 flex items-start pt-2">
          <p className="text-xs text-muted-foreground">
            {product.description}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center mb-2">
          {/* Adjust the size of the parent container to set the image dimensions */}
          <div className="w-64 h-64">
            <div className="relative w-full h-full">
              <Image
                src={randomImageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="default"
          onClick={() => {
            console.log("Agregar al carrito");
            onAddToCart();
          }
          }
    >Agregar al carrito</Button>
      </CardFooter>
    </Card>

  );
}

export default ProductoCard;
