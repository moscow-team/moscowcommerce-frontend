"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/useCart";
import { useRouter } from "next/navigation";
import { useEcommerce } from "../context/useEcommerce";
import stanley from "../../../public/stanley.png";
import canarias from "../../../public/canarias.png";
import Image from "next/image";
interface Categoria {
  id: number;
  name: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  archivedDate: string;
  archived: boolean;
  photo: string;
}

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
function Home() {
  const router = useRouter();
  const { categories, products } = useEcommerce();
  const { addProduct } = useCart();
  // useEffect(() => {
  //   async function fetchCategorias() {
  //     const response = await getCategorias();
  //     const filtered = response.data
  //       .map((category: Categoria) => ({
  //         ...category,
  //         photo: `/images/${category.name.toLowerCase()}.png`,
  //       }))
  //       .filter((category: Categoria) => category.archived === false);
  //     console.log(filtered);
  //     setCategorias(filtered);
  //   }
  //   async function fetchProductos() {
  //     const response = await getProducts();
  //     const filtered = response.data.filter(
  //       (product: Producto) => product.archived === false
  //     );
  //     setProductos(filtered);
  //   }
  //   fetchCategorias();
  //   fetchProductos();
  // }, []);

  const handleAddProduct = (product: Producto) => {
    addProduct(product);
  };

  const goToProductDetail = (product: Producto) => {
    router.push(`/producto/${product.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section
          className="py-12 md:py-24 custom-bg relative"
          style={{
            backgroundImage: "url('/mate-unsplash.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-20"
            style={{ backdropFilter: "blur(5px)" }}
          ></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-extrabold text-gray-200 sm:text-5xl md:text-6xl">
                La mayor variedad de mates y bombillas de todo el país
              </h1>
              <p className="mt-4 text-xl text-gray-300">
                Descubrí nuestra selección de productos de calidad y disfrutá de
                un mate como nunca antes.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gray-200 text-gray-800 hover:text-white"
                  onClick={() => router.push("/producto")}
                >
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Trabajamos con Marcas Reconocidas
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Colaboramos con marcas líderes que representan calidad y tradición
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-8 rounded-2xl bg-gray-50 transition-transform hover:scale-105">
                <Image src={stanley} alt="Stanley" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Stanley</h3>
                <p className="text-gray-600 text-center">
                  Reconocidos mundialmente por sus termos de alta calidad y durabilidad
                </p>
              </div>

              <div className="flex flex-col items-center p-8 rounded-2xl bg-gray-50 transition-transform hover:scale-105">
                <Image src={canarias} alt="Canarias" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Canarias</h3>
                <p className="text-gray-600 text-center">
                  Sinónimo de excelencia en yerba mate, tradición y sabor uruguayo
                </p>
              </div>
            </div>
          </div>
        </section>




        <br id="category-banner" />
        <section className="py-12" >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Categorías
            </h2>
            <div className="flex flex-row flex-wrap gap-10 mt-28 justify-center items-center">
              {categories.map((category: Categoria) => (
                <div
                  key={category.id}
                  className="relative rounded-lg shadow-md h-60 w-60 cursor-pointer bg-[#424242]"
                  onClick={() => router.push(`/categoria/${category.id}`)}
                >
                  <div className="flex justify-center">
                    <img
                      src={category.photo}
                      className="h-52 w-52 mb-32 absolute -top-20 object-contain hover:scale-125 transition-transform duration-200 cursor-pointer"
                      alt={category.name}
                    ></img>
                    <h3 className="absolute bottom-10 text-white text-xl font-semibold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden ${product.stock === 0 ? 'opacity-50' : ''}`}
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
                          disabled={product.stock === 0}
                        >
                          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
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
        </section>
      </main>
    </div>
  );
}
export default Home;