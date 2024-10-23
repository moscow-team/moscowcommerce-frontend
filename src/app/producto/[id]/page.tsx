"use client";
import { useProduct } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/useCart";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getProductsByFilters } from "@/services/dashboard/productoService";
import { BreadcrumbItem } from "@nextui-org/react";
import { useState, useEffect } from "react";

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
  const { selectedProduct } = useProduct();
  const [product, setProduct] = useState<Producto | null>(selectedProduct);
  const [relatedProducts, setRelatedProducts] = useState<Producto[]>([]);

  const handleAddProduct = () => {
    if (product) {
      addProduct(product);
    }
  };

  async function fetchRelatedProducts(categoryId: number, productId: number) {
    try {
      const response = await getProductsByFilters({
        "category.id": categoryId.toString(),
      });
      const filteredProducts = response.data.filter(
        (product: any) => !product.archived && product.id !== productId
      );
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!selectedProduct) {
      console.log("NO hay producto seleccionado");
      const url = window.location.pathname;
      const id = url.substring(url.lastIndexOf("/") + 1);
      getProductsByFilters({ id })
        .then((response) => {
          console.log("Producto encontrado", response.data);
          if (response.data && response.data.length > 0) {
            setProduct(response.data[0]);
            fetchRelatedProducts(
              response.data[0].category.id,
              response.data[0].id
            );
          }
        })
        .catch((error) => {
          console.log("Error al obtener el producto", error);
        });
    } else if (selectedProduct) {
      fetchRelatedProducts(selectedProduct.category.id, selectedProduct.id);
    }
  }, [selectedProduct]);

  return (
    <div className="w-full h-full">
      <section className="flex flex-row gap-5 py-32">
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <div className="aspect-square object-contain w-2/5 h-2/5 p-15 shadow-lg">
            <img
              src={product?.urlPhotos[0]}
              alt={product?.name}
              className="h-full w-full"
            />
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
                <BreadcrumbLink href={`/categoria/${product?.category.id}`}>
                  {product?.category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <div className="flex flex-row gap-3">
            <Badge className="text-xl text-white">${product?.price}</Badge>
            <h3 className="text-xl text-gray-500">{product?.category.name}</h3>
          </div>
          <h3 className="text-gray-600">
            Cantidad disponible:{" "}
            <span className=" font-semibold">{product?.stock}</span>
          </h3>
          <p>{product?.description}</p>
          <div>
            <Button
              className="text-white bg-gray-700"
              onClick={() => handleAddProduct()}
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </section>
      {/* MOSTRAR PRODUCTOS RELACIONADOS */}
      <section className="py-12 flex flex-col gap-10">
        <h1 className="text-3xl font-semibold text-center">
          Productos relacionados
        </h1>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    alt={`Product ${index + 1}`}
                    className="w-full h-48 object-contain p-2 hover:scale-110 transition-transform duration-200 cursor-pointer"
                    src={relatedProduct.urlPhotos[0]}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 mb-4 h-14">
                      {relatedProduct.description}
                    </p>
                    <div className="flex flex-col h-full gap-2 items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${relatedProduct.price.toLocaleString("es")}
                      </span>
                      <Button variant="default" className="text-white">
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No se encontraron productos relacionados.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
