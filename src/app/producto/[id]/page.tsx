"use client"
import { useCart } from "@/app/context/useCart";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState } from "react"
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
  quantity?: number;
}
export default function Page() {
  const { addProduct } = useCart();
  const params = useParams<{ id: string; }>()
  const [product, setProduct] = useState<Producto>(
    //HACK PARA DESARROLLAR FRONT
    {
      id: 3,
      archived: false,
      category: { id: 1, name: "Bombillas" },
      description: "Bombilla de alpaca, acero inoxidable, pico de loro dorado",
      name: "Bombilla Pico de Loro",
      price: 15000,
      stock: 7,
      urlPhotos: ["/images/bombillas.png"]
    }
  )

  const handleAddProduct = () => {
    addProduct(product);
  }
  return (
    <div className="w-full h-full">
      <section className="flex flex-row gap-5 py-32">
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <div className="aspect-square object-contain w-2/5 h-2/5 p-15 shadow-lg">
            <img src={product.urlPhotos[0]} alt={product.name} />
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/categoria/${product.category.id}`}>{product.category.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <div className="flex flex-row gap-3">
            <Badge className="text-xl text-white">${product.price}</Badge>
            <h3 className="text-xl text-gray-500">{product.category.name}</h3>

          </div>
          <h3 className="text-gray-600">Cantidad disponible: <span className=" font-semibold">{product.stock}</span></h3>
          <p>{product.description}</p>
          <div>
            <Button className="text-white bg-gray-700" onClick={() => handleAddProduct()}>Agregar al carrito</Button>
          </div>
        </div>
      </section>
      {/* MOSTRAR PRODUCTOS RELACIONADOS */}
      <section className="py-12 flex flex-col gap-10">
        <h1 className="text-3xl font-semibold text-center">Productos relacionados</h1>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-contain p-2 hover:scale-110 transition-transform duration-200 cursor-pointer"
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
                      ${product.price.toLocaleString("es")}
                    </span>
                    <Button variant="default" className="text-white">Agregar al carrito</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>)
}