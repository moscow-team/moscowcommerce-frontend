import { useContext } from 'react';
import { CartContext } from './CartProvider';

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
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  const { products, setProducts, setProductQuantity, productQuantity } = context;

  // Función para agregar un producto
  const addProduct = (product: Producto) => {
    setProducts((prevProducts: Producto[]) => {
      const productIndex = prevProducts.findIndex(p => p.id === product.id);
      if (productIndex > -1) {
        const newProducts = [...prevProducts];
        if (newProducts[productIndex].quantity !== undefined) {
          newProducts[productIndex].quantity += 1;
        } else {
          newProducts[productIndex].quantity = 1;
        }
        setProductQuantity(productQuantity + 1);
        return newProducts;
      } else {
        setProductQuantity(productQuantity + 1);
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto por su ID
  const removeProduct = (productId: number) => {
    setProducts((prevProducts:Producto[] ) => prevProducts.filter(p => p.id !== productId));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setProducts([]);
  };

  return {
    products,
    addProduct,
    removeProduct,
    clearCart, 
    productQuantity,
  };
};