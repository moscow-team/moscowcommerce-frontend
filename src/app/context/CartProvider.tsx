import { createContext, useState, ReactNode, useEffect } from 'react';

// Define el tipo de los datos del contexto
interface CartContextType {
  products: Producto[]; 
  setProducts: (products: Producto[]) => void;
  productQuantity: number; 
  setProductQuantity: (number: number) => void; 
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
  quantity: number;
}
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Crea el proveedor
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [productQuantity, setProductQuantity] = useState<number>(0);
  useEffect(() => {
    const storedProducts = localStorage.getItem('cartProducts');
    const storedQuantity = localStorage.getItem('cartQuantity');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    if (storedQuantity) {
      setProductQuantity(JSON.parse(storedQuantity));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cartQuantity', JSON.stringify(productQuantity));
  }, [productQuantity]);
  return (
    <CartContext.Provider value={{
      products, 
      setProducts, 
      productQuantity,
      setProductQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};
