import { useContext } from "react";
import { EcommerceContext } from "./EcommerceProvider";

export const useProduct = () => {
    const context = useContext(EcommerceContext);
    if (context === undefined) {
      throw new Error('useProduct must be used within a ProductProvider');
    }
    const { products, setProducts } = context;

    // const fetchProducts = async () => {
    //     const response = await getProducts();
    //     const filtered = response.data.filter(
    //       (product: any) => product.archived === false
    //     );
    //     setProducts(filtered);
    // }

    const getProductById = async (id: number) => {
        const product = await products.find((product: any) => product.id === id);
        if (!product) {
          // Funcion para buscar producto que esta archivado porque no se encontro el producto (Iniciamos con todos no archivados)
        }
        return product
    }

    const getProductByCategory = async (id: number) => {
        const product = await products.filter((product: any) => product.category.id === id);
        return product
    }


    return { products, getProductById, getProductByCategory};
  };