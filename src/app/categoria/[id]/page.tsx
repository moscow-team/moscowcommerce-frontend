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
import { Input } from "@/components/ui/input";
import { useProduct } from "@/app/context/useProduct";
import { useCategory } from "@/app/context/useCategory";
import { useLoader } from "@/app/context/useLoader";
import Loading from "./loading";
import Aside from "@/components/Aside";
import { ProductFilter } from "../components/ProductFilter";

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

const categoryEmpty = {
  id: 0,
  name: "",
  description: "",
  creationDate: "",
  modificationDate: "",
  archivedDate: "",
}

const productEmpty = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: {
    id: 0,
    name: "",
  },
  urlPhotos: [],
  archived: false,
}

export default function Page() {

  const { isLoading } = useLoader()
  const params = useParams<{ id: string }>();
  const categoryId = parseInt(params.id);
  const [products, setProducts] = useState<Producto[]>([productEmpty]);
  const [category, setCategory] = useState<Categoria>(categoryEmpty);
  const { getProductByCategory } = useProduct();
  const { getCategoryById } = useCategory();
  async function fetchProducts() {
    const products = await getProductByCategory(categoryId);
    setProducts(products);
  }
  async function fetchCategory() {
    const category = await getCategoryById(categoryId);
    setCategory(category);
  }

  useEffect(() => {
    if (!isLoading) {
      fetchProducts();
      fetchCategory();
    }
  }, [isLoading, categoryId]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-row h-screen w-full">
      <Aside>
      <Input placeholder="Buscar..." />
        <ProductFilter/>
      </Aside>
      <div className="px-10">
        <Breadcrumb className="my-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-semibold text-2xl">{category.name}</h1>
        <p className="text-gray-700 py-2">{category.description}</p>
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
                    src={product?.urlPhotos?.[0] ? product.urlPhotos[0] : ""}
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