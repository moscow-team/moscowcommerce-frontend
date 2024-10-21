"use client"

import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState } from "react";
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

  const params = useParams<{ id: string; }>()
  const [products, setProducts] = useState<Producto[]>(
    //HACK PARA DESARROLLAR FRONT
    [
      {
        id: 3,
        archived: false,
        category: { id: 1, name: "Bombillas" },
        description: "Bombilla de alpaca, acero inoxidable, pico de loro dorado",
        name: "Bombilla Pico de Loro",
        price: 15000,
        stock: 7,
        urlPhotos: ["/images/bombillas.png"]
      },
      {
        id: 3,
        archived: false,
        category: { id: 1, name: "Bombillas" },
        description: "Bombilla de alpaca, acero inoxidable, pico de loro dorado",
        name: "Bombilla Pico de Loro",
        price: 15000,
        stock: 7,
        urlPhotos: ["/images/bombillas.png"]
      },
      {
        id: 3,
        archived: false,
        category: { id: 1, name: "Bombillas" },
        description: "Bombilla de alpaca, acero inoxidable, pico de loro dorado",
        name: "Bombilla Pico de Loro",
        price: 15000,
        stock: 7,
        urlPhotos: ["/images/bombillas.png"]
      },
      {
        id: 3,
        archived: false,
        category: { id: 1, name: "Bombillas" },
        description: "Bombilla de alpaca, acero inoxidable, pico de loro dorado",
        name: "Bombilla Pico de Loro",
        price: 15000,
        stock: 7,
        urlPhotos: ["/images/bombillas.png"]
      },
      {
        id: 3,
        archived: false,
        category: { id: 1, name: "Bombillas" },
        description: "Bombilla de alpaca, acero inoxidable, pico de loro dorado",
        name: "Bombilla Pico de Loro",
        price: 15000,
        stock: 7,
        urlPhotos: ["/images/bombillas.png"]
      },
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
    ]
  )

  return (
    <div className="w-full h-full py-20">
      <h1 className="text-6xl text-center">Bombillas</h1>
      <div className="w-full h-full flex flex-row py-10">
        <aside className="w-1/5 h-full bg-gray-700"></aside>
        <section className="w-full h-full flex flex-col px-5 gap-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Categoria</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row flex-wrap gap-6 justify-center">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden w-72"
              >
                <img
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-contain p-2 cursor-pointer"
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
        </section>
      </div>
    </div>
  )
}