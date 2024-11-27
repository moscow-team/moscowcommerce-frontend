"use client";
import { Categoria } from "@/interfaces/Categoria";
import { Product } from "@/interfaces/Product";
import { getCategorias } from "@/services/dashboard/categoriaService";
import { getProducts } from "@/services/dashboard/productoService";
import { IProduct } from "@/services/interfaces/IProduct";
import { createContext, useState, ReactNode, useEffect } from "react";

interface EcommerceContextType {
  categories: any;
  setCategories: React.Dispatch<React.SetStateAction<any>>;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
}

export const EcommerceContext = createContext<EcommerceContextType | undefined>(
  undefined
);

export const EcommerceProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<any>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const response = await getCategorias();
      const filtered = response.data
        .map((category: Categoria) => ({
          ...category,
          photo: `/images/${category.name.toLowerCase()}.png`,
        }))
        .filter((category: Categoria) => category.archived === false);
      setCategories(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      const filtered = response.data
        .filter((product: Product) => product.archived === false)
        .sort((a: Product, b: Product) => a.stock === 0 ? 1 : b.stock === 0 ? -1 : 0);
      console.log(filtered);
      setProducts(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCategories(), fetchProducts()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <EcommerceContext.Provider
      value={{ categories, setCategories, products, setProducts, isLoading, fetchProducts }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
