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
  const { getProductById } = useProduct();
  const params = useParams<{ id: string }>();
  const productId = +params.id;
  const [product, setProduct] = useState<Producto>();
  const [relatedProducts, setRelatedProducts] = useState<Producto[]>([]);
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState<any>([]);
  const handleAddProduct = () => {
    if (product) {
      addProduct(product);
    }
  };
  const {isLoading} = useLoader(); 
  // async function fetchRelatedProducts(categoryId: number, productId: number) {
  //   try {
  //     const response = await getProductsByFilters({
  //       "category.id": categoryId.toString(),
  //     });
  //     const filteredProducts = response.data.filter(
  //       (product: any) => !product.archived && product.id !== productId
  //     );
  //     setRelatedProducts(filteredProducts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const fecthProduct = async () => {
    const product = await getProductById(productId)
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
  }
  useEffect(() => {
    fecthProduct()
  }, []);
  useEffect(() => {
    if (!isLoading) {
      fecthProduct();
    }
  }, [isLoading, productId]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full h-full">
      <section className="flex flex-row gap-5 py-32">
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 ">
          <div className="aspect-square object-contain w-2/5 h-2/5 p-15 shadow-lg cursor-pointer">
            <img
              src={product?.urlPhotos[0]}
              alt={product?.name}
              className="h-full w-full"
              onClick={() => setIndex(0)}
            />
          </div>
          <div className="w-full flex flex-row justify-center flex-wrap h-full gap-4">
            {product?.urlPhotos.slice(1).map((photo, index) => (
              <div key={index} className="aspect-square object-contain w-32 h-32 shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer">
                <img
                  src={photo}
                  alt={product?.name}
                  className="h-full w-full"
                  onClick={() => setIndex(index)}
                />
              </div>
            ))}
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
            {product?.archived ? (<Badge variant={"destructive"} className="text-xl text-white">Sin stock</Badge>
            ) : null}
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
              disabled={product?.archived}
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
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      // plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
}
