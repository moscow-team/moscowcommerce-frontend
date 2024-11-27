"use client"
import { Button } from "@/components/ui/button";
import { useCart } from "../context/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { CheckboxReactHookFormMultiple } from "./components/CategoryFilter";
import { useEcommerce } from "../context/useEcommerce";
import Aside from "@/components/Aside";
import { useLoader } from "../context/useLoader";
import Loading from "./loading";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BreadcrumbItem } from "@nextui-org/react";
import { PriceRangeFilter } from "@/components/PriceRangeFilter";

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
    const [filteredProducts, setFilteredProducts] = useState<Producto[]>(products);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [isAsideOpen, setIsAsideOpen] = useState(false);

    const handleAddProduct = (e: React.MouseEvent, product: Producto) => {
        e.stopPropagation();
        addProduct(product);
    };

    const goToProductDetail = (product: Producto) => {
        router.push(`/producto/${product.id}`);
    };

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const filtered = products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.id);
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        });

        setFilteredProducts(filtered);
    }, [products, searchTerm, selectedCategories, minPrice, maxPrice, isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col lg:flex-row h-full w-full">
            <Button
                className="lg:hidden mb-4 self-start"
                onClick={() => setIsAsideOpen(true)}
            >
                Filtros
            </Button>
            <Aside isOpen={isAsideOpen} onClose={() => setIsAsideOpen(false)}>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Buscar</h3>
                        <Input
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Categorías</h3>
                        <CheckboxReactHookFormMultiple
                            onCategoryChange={setSelectedCategories}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Rango de Precio</h3>
                        <PriceRangeFilter
                            onPriceChange={(min, max) => {
                                setMinPrice(min);
                                setMaxPrice(max);
                            }}
                        />
                    </div>
                </div>
            </Aside>
            <div className="px-4 lg:px-10 mb-5 flex-grow">
                <Breadcrumb className="my-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Productos</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => goToProductDetail(product)}
                            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer ${product.stock === 0 ? 'opacity-50' : ''}`}
                        >
                            <div className="relative pb-[100%]">
                                <img
                                    src={product.urlPhotos[0]}
                                    alt={`Product ${product.name}`}
                                    className="absolute top-0 left-0 w-full h-full object-contain p-2"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 truncate">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mb-4 h-12 overflow-hidden text-ellipsis">
                                    {product.description}
                                </p>
                                <div className="flex flex-col items-center justify-between">
                                    <span className="text-xl font-bold text-primary mb-2">
                                        ${product.price.toLocaleString("es-AR")}
                                    </span>
                                    <Button
                                        variant="default"
                                        className="w-full text-white z-10"
                                        onClick={(e) => handleAddProduct(e, product)}
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

