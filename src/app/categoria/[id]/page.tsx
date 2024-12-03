"use client"

import { useRouter } from "next/navigation";
import { useCategory } from "../../context/useCategory";
import { useEcommerce } from "../../context/useEcommerce";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PriceRangeFilter } from "@/components/PriceRangeFilter";
import { Button } from "@/components/ui/button";
import { useCart } from "../../context/useCart";
import Aside from "@/components/Aside";
import { IProduct } from "@/services/interfaces/IProduct";
import { PriceFormatter } from "@/utils/PriceFormatter";

export default function CategoryPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { categories } = useCategory();
    const { products } = useEcommerce();
    const { addProduct } = useCart();
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [isAsideOpen, setIsAsideOpen] = useState(false);

    const category = categories.find(cat => cat.id === parseInt(params.id));

    useEffect(() => {
        if (category) {
            const categoryProducts = products.filter(product => product.category.id === category.id);
            const filtered = categoryProducts.filter((product) => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
                return matchesSearch && matchesPrice;
            });
            setFilteredProducts(filtered);
        }
    }, [category, products, searchTerm, minPrice, maxPrice]);

    const handleAddProduct = (e: React.MouseEvent, product: IProduct) => {
        e.stopPropagation();
        addProduct(product);
    };

    const goToProductDetail = (product: IProduct) => {
        router.push(`/producto/${product.id}`);
    };

    if (!category) {
        return <div>Categoría no encontrada</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
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
            <div className="flex-grow p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {category.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

