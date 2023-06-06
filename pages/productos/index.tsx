import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import FastAPIClient from "@/client/client"
import LayoutAuthenticated from "@/components/layout/layoutAuthenticated"
import ProductoCard from "@/components/cards/cardProducto"
import IProduct from "@/types/IProduct"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import IUser from "@/types/IUser"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


interface OrderItem {
    quantity: number;
    product_id: number;
}


const Productos = () => {

    const router = useRouter()
    const client = new FastAPIClient({})
    const { toast } = useToast()


    const [productos, setProductos] = useState<IProduct[]>([])
    const [ownerId, setOwnerId] = useState<number>(0)
    const [loading, setLoading] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    useEffect(() => {
        getProductos()
        getOwnerId()


    }, [])



    const handleAddToCart = (product: number) => {
        setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
    };

    const createOrder = async () => {
        if (selectedProducts.length === 0) {
            toast({
                title: "No hay productos seleccionados",
                description: "Por favor selecciona al menos un producto",
                duration: 3000,
            })
            return
        }

        const status = "realizado"
        const owner_id = ownerId
        const orderItems: OrderItem[] = selectedProducts.reduce((acc: OrderItem[], id: number) => {
            const existingItem = acc.find((item) => item.product_id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                acc.push({ quantity: 1, product_id: id });
            }
            return acc;
        }, []);

        
        try {
            const response = await client.createOrder(status, owner_id, orderItems)
            console.log(response)
            toast({
                title: "Orden Creada exitosamente",
                description: "Se ha creado la orden exitosamente",
                
            })
            await router.push("/pedidos")
        } catch (error) {
            console.log(error)
        }

    }

    const getProductos = async () => {
        try {
            const response = await client.getProducts()
            console.log(response.results)
            setProductos(response.results)
        } catch (error) {
            console.log(error)
            await router.push("/login")
        } finally {
            setLoading(false)
        }
    }

    const getOwnerId = async () => {
        try {
            const response: IUser = await client.fetchUser()
            console.log(response)
            setOwnerId(response.id)
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <LayoutAuthenticated title="Tienda">
            {loading && (
                <div className="flex justify-center items-center h-screen bg-gray-400 w-screen">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                </div>
            )}
            {!loading && productos && (
                <>
                    <div className="flex justify-center items-center">
                        <Button
                            variant="default"
                            onClick={() => {
                                createOrder()
                            }}
                        >
                            Crear Orden
                        </Button>
                    </div>

                    <div className="flex flex-col bg-slate-100 w-screen">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {productos.map((producto) => (
                                <ProductoCard key={producto.id} product={producto} onAddToCart={() => handleAddToCart(producto.id)} 
                                    randomIndex={producto.id % 5}
                                />
                            ))}
                        </div>
                    </div>



                </>
            )}

        </LayoutAuthenticated>
    )
}

export default Productos
