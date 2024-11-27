"use client";
import { useCart } from "@/app/context/useCart";
import { useLoader } from "@/app/context/useLoader";
import { useProduct } from "@/app/context/useProduct";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Loading from "./loading";
import { IProduct } from "@/services/interfaces/IProduct";

export default function Page() {
  const { addProduct } = useCart();
  const { getProductById, products } = useProduct();
  const params = useParams<{ id: string }>();
  const productId = +params.id;
  const [product, setProduct] = useState<IProduct>();
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState<any>([]);
  const { isLoading } = useLoader();

  const handleAddProduct = () => {
    if (product) {
      addProduct(product);
    }
  };

  const fetchRelatedProducts = async (categoryId: number, productId: number) => {
    try {
      const filteredProducts = products.filter(
        (p: IProduct) => !p.archived && p.category.id == categoryId && p.id !== productId
      );
      setRelatedProducts(filteredProducts.slice(0, 4)); // Limit to 4 related products
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    const product = await getProductById(productId);
    setProduct(product);
    const dataFotos = product?.urlPhotos.map((foto) => {
      return {
        src: foto,
        name: foto,
        width: 800,
        height: 800,
      };
    });
    setPhotos(dataFotos);

    if (product) {
      fetchRelatedProducts(product.category.id, product.id);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchProduct();
    }
  }, [isLoading, productId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full">
      <section className="flex flex-col md:flex-row gap-5 py-8 md:py-32">
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center gap-5">
          <div className="w-full md:w-1/2 h-auto p-4 shadow-lg cursor-pointer">
            <img
              src={product?.urlPhotos[0]}
              alt={product?.name}
              className="w-full h-full aspect-square object-contain"
              onClick={() => setIndex(0)}
            />
          </div>
          <div className="w-full flex flex-row justify-center flex-wrap h-full gap-4">
            {product?.urlPhotos.slice(1).map((photo, index) => (
              <div key={index} className="aspect-square object-contain w-24 h-24 md:w-32 md:h-32 shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer">
                <img
                  src={photo}
                  alt={product?.name}
                  className="h-full w-full aspect-square object-contain"
                  onClick={() => setIndex(index + 1)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center gap-3 p-4">
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
          <div className="flex flex-row gap-3 flex-wrap">
            {product?.archived ? (
              <Badge variant={"destructive"} className="text-xl text-white">
                Sin stock
              </Badge>
            ) : null}
            <Badge className="text-xl text-white">${product?.price}</Badge>
            <h3 className="text-xl text-gray-500">{product?.category.name}</h3>
          </div>
          {product?.stock > 0 ? (
            <h3 className="text-gray-600">
              Cantidad disponible:{" "}
              <span className="font-semibold">{product?.stock}</span>
            </h3>
          ) : (
            <div>
              <Badge className="text-xl" variant={"destructive"}>
                Sin stock
              </Badge>
            </div>
          )}
          <p className="text-gray-700">{product?.description}</p>
          <div>
            <Button
              className="text-white bg-gray-700 hover:bg-gray-600"
              onClick={() => handleAddProduct()}
              disabled={product?.archived || product?.stock === 0}
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </section>
      
      {/* MOSTRAR PRODUCTOS RELACIONADOS */}
      <section className="py-12 flex flex-col gap-10">
        <h2 className="text-3xl font-semibold text-center">
          Productos relacionados
        </h2>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    alt={`Product ${index + 1}`}
                    className="w-full h-48 object-contain p-2 hover:scale-110 transition-transform duration-200 cursor-pointer"
                    src={relatedProduct.urlPhotos[0]}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 mb-4 h-14 overflow-hidden">
                      {relatedProduct.description}
                    </p>
                    <div className="flex flex-col h-full gap-2 items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${relatedProduct.price.toLocaleString("es")}
                      </span>
                      <Button
                        variant="default"
                        className="text-white w-full"
                        onClick={() => addProduct(relatedProduct)}
                        disabled={relatedProduct.archived || relatedProduct.stock === 0}
                      >
                        {relatedProduct.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
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
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </div>
  );
}

