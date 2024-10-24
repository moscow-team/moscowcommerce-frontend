import { useContext } from 'react';
import { CartContext } from './CartProvider';
import { toast } from 'sonner';

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
        if (productQuantity + 1 > product.stock) {
          toast.error('No hay suficiente stock para este producto');
          return prevProducts;
        }
        const newProducts = [...prevProducts];
        if (newProducts[productIndex].quantity !== undefined) {
          newProducts[productIndex].quantity += 1;
        } else {
          newProducts[productIndex].quantity = 1;
        }

        setProductQuantity(productQuantity + 1);
        toast.success("Producto agregado al carrito");
        return newProducts;
      } else {
        setProductQuantity(productQuantity + 1);
        toast.success("Producto agregado al carrito");
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto por su ID
  const removeProduct = (productId: number) => {
    setProducts((prevProducts: Producto[]) => {
      const product = prevProducts.findIndex(p => p.id == productId);
      if (product !== -1) {
        setProductQuantity(productQuantity - (prevProducts[product].quantity || 1));
        return prevProducts.filter(p => p.id !== productId);
      }
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setProducts([]);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const updatedQuantity = Math.max(0, newQuantity);
        if (updatedQuantity > product.stock) {
          toast.error('No hay suficiente stock para este producto');
          return product;
        }
        // VERIFICAR SI EL PRODUCTO SE VA A ELIMINAR CUANDO LA CANTIDAD SEA 0
        if (updatedQuantity == 0) {
          toast('¿Seguro que quiere eliminar este producto?', {
            position: 'top-center',
            action: {
              label: 'Cerrar',
              onClick: () => toast.dismiss(),
            },
            cancel: {
              label: 'Eliminar',
              onClick: () => removeProduct(id),
            },
          });
          return product;
        }
        setProductQuantity(productQuantity + (updatedQuantity - (product.quantity || 0)));
        return { ...product, quantity: updatedQuantity };
      }
      return product;
    }
    ));
  }


  const calculateTotal = () => {
    return products.reduce((acc, product) => {
      return acc + product.price * (product.quantity || 1);
    }, 0);
  }

  const calculateQuantity = () => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }


  return {
    products,
    addProduct,
    removeProduct,
    clearCart,
    productQuantity,
    updateQuantity,
    calculateTotal
  };
};