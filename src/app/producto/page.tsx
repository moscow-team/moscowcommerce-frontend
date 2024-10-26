"use client"
import { Button } from "@/components/ui/button";
import { useCart } from "../context/useCart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CheckboxReactHookFormMultiple } from "./components/CategoryFilter";
import { useEcommerce } from "../context/useEcommerce";
import Aside from "@/components/Aside";
import { useLoader } from "../context/useLoader";
import Loading from "./loading";

interface Producto {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: {
        id: number;
        name: string;
    };
    urlPhotos: string[];
    archived: boolean;
}

export default function Page() {
    const { products } = useEcommerce();
    const { addProduct } = useCart();
    const { isLoading } = useLoader();
    const router = useRouter();
    const handleAddProduct = (product: Producto) => {
        addProduct(product);
    };

    const goToProductDetail = (product: Producto) => {
        router.push(`/producto/${product.id}`);
    };
    useEffect(() => {
        if (isLoading) {
            return;
        }
    }, [isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex h-screen w-full">
            <Aside>
                <Input placeholder="Buscar..." />
                <p className="text-center">Categorias</p>
                <CheckboxReactHookFormMultiple />
            </Aside>
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img
                                src={product.urlPhotos[0]}
                                alt={`Product ${product.name}`}
                                className="w-full h-48 object-contain p-2 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                onClick={() => goToProductDetail(product)}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mb-4 h-14">
                                    {product.description}
                                </p>
                                <div className="flex flex-col h-full gap-2 items-center justify-between">
                                    <span className="text-xl font-bold text-primary">
                                        ${product.price.toLocaleString("es-AR")}{" "}
                                    </span>
                                    <div className="flex gap-2 py-3 w-full justify-center flex-wrap">
                                        <Button
                                            variant="default"
                                            className="text-white"
                                            onClick={() => handleAddProduct(product)}
                                        >
                                            Agregar al carrito
                                        </Button>
                                        <Button
                                            onClick={() => goToProductDetail(product)}
                                            className="text-white bg-gray-700 font-semibold"
                                        >
                                            Ver producto
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}