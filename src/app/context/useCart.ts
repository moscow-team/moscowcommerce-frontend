"use client";
import { useContext } from "react";
import { CartContext } from "./CartProvider";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { clear } from "console";
import { useRouter } from "next/navigation";
import { saveOrder } from "@/services/OrderService";

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
  const router = useRouter();
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const { data: session } = useSession();
  const { products, setProducts, setProductQuantity, productQuantity } =
    context as {
      products: Producto[];
      setProducts: React.Dispatch<React.SetStateAction<Producto[]>>;
      setProductQuantity: React.Dispatch<React.SetStateAction<number>>;
      productQuantity: number;
    };

  // Función para agregar un producto
  const addProduct = (product: Producto) => {
    if (session?.user?.role === "ADMIN") {
      toast.info("El administrador no puede comprar productos");
      return;
    }
    setProducts((prevProducts: Producto[]) => {
      const productIndex = prevProducts.findIndex((p) => p.id === product.id);
      if (productIndex > -1 && product.quantity != 0) {
        if (productQuantity + 1 > product.stock) {
          toast.error("No hay suficiente stock para este producto");
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
    if (session?.user?.role === "ADMIN") {
      toast.info("El administrador no puede comprar productos");
      return;
    }
    setProducts((prevProducts: Producto[]) => {
      const product = prevProducts.findIndex((p) => p.id == productId);
      if (product !== -1) {
        const productQuantityToRemove = prevProducts[product].quantity ?? 0;
        setProductQuantity(productQuantity - productQuantityToRemove);
        return prevProducts.filter((p) => p.id !== productId);
      }
      return prevProducts;
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setProductQuantity(0);
    setProducts([]);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (session?.user?.role === "ADMIN") {
      toast.info("El administrador no puede comprar productos");
      return;
    }
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const updatedQuantity = Math.max(0, newQuantity);
          if (updatedQuantity > product.stock) {
            toast.error("No hay suficiente stock para este producto");
            return product;
          }
          // VERIFICAR SI EL PRODUCTO SE VA A ELIMINAR CUANDO LA CANTIDAD SEA 0
          if (updatedQuantity == 0) {
            toast("¿Seguro que quiere eliminar este producto?", {
              position: "top-center",
              action: {
                label: "Cerrar",
                onClick: () => toast.dismiss(),
              },
              cancel: {
                label: "Eliminar",
                onClick: () => removeProduct(id),
              },
            });
            return product;
          }
          setProductQuantity(
            productQuantity + (updatedQuantity - (product.quantity || 0))
          );
          return { ...product, quantity: updatedQuantity };
        }
        return product;
      })
    );
  };

  const confirRemoveProduct = (id: number) => {
    if (session?.user?.role === "ADMIN") {
      toast.info("El administrador no puede comprar productos");
      return;
    }
    toast("¿Seguro que quiere eliminar este producto?", {
      position: "top-center",
      action: {
        label: "Cerrar",
        onClick: () => toast.dismiss(),
      },
      cancel: {
        label: "Eliminar",
        onClick: () => removeProduct(id),
      },
    });
  };

  const calculateTotal = () => {
    return products.reduce((acc, product) => {
      return acc + product.price * (product.quantity || 1);
    }, 0);
  };

  // const calculateQuantity = () => {
  //   return products.reduce((acc, product) => {
  //     return acc + product.quantity;
  //   }, 0);
  // }

  const saleCart = async () => {
    if (session?.user?.role === 'ADMIN') {
      toast.info('El administrador no puede comprar productos');
      return;
    }
    const orderProducts = products.map((product) => {
      return{
        productId: product.id,
        quantity: product.quantity || 1
      }
    })
    await saveOrder(orderProducts);
    clearCart();
    router.push("/inicio");
  };
  return {
    products,
    addProduct,
    removeProduct,
    clearCart,
    productQuantity,
    updateQuantity,
    calculateTotal,
    confirRemoveProduct,
    saleCart,
  };
};
