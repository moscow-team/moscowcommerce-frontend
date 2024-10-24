"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategorias } from "@/services/dashboard/categoriaService";
import { getProductsByFilters } from "@/services/dashboard/productoService";
import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@radix-ui/react-checkbox";
import { toast } from "sonner";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckboxReactHookFormMultiple } from "../components/CategoryFilter";

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

interface Categoria {
  id: number;
  name: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  archivedDate: string;
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const categoryId = parseInt(params.id, 10);
  const [products, setProducts] = useState<Producto[]>([]);
  const [categoria, setCategoria] = useState<Categoria | null>(null);

  async function fetchCategories() {
    try {
      const response = await getCategorias();
      const category = response.data.find(
        (cat: Categoria) => cat.id === categoryId
      );
      setCategoria(category);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProducts() {
    try {
      const response = await getProductsByFilters({
       'category.id': categoryId.toString(),
      //  'archived': 'false', <-- REVISAR PORQUE NO FUNCIONA
      });
      const filteredProducts = response.data.filter((product: any) => !product.archived);
      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [categoryId]);

  if (!categoria) {
    return <div>Cargando ...</div>;
  }

  return (
    <div className="flex h-screen w-full">
      <aside className="w-80 h-full bg-gray-200 p-4 flex flex-col gap-5">
        <Input  placeholder="Buscar..."/>
        <p className="text-center">Categorias</p>
        <CheckboxReactHookFormMultiple/>
      </aside>
      <div className="w-full h-full px-10">
        <Breadcrumb className="my-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoria.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-semibold text-2xl">{categoria.name}</h1>
        <p className="text-gray-700 py-2">{categoria.description}</p>
        <div className="w-full h-full flex flex-row py-10">
          <section className="w-full h-full flex flex-col px-5 gap-5">
            <div className="flex flex-row flex-wrap gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden w-72"
                >
                  <img
                    alt={`Product ${index + 1}`}
                    className="w-full h-48 object-contain p-2 cursor-pointer"
                    src={product.urlPhotos[0]}
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
                      <Button variant="default" className="text-white">
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
