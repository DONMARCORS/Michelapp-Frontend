import LayoutAuthenticated from "@/components/layout/layoutAuthenticated"

const Productos = () => {
    return (
        <LayoutAuthenticated>
            <div className="py-10 w-screen h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-8">Tus Productos</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <p >No se encontraron productos.</p>
                    </div>
                </div>
            </div>
        </LayoutAuthenticated>
    )
}

export default Productos
