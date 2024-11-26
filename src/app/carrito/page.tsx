"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/useCart';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogContent } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface Product {
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


export default function CarritoPage() {

  /* BLOQUE DE PRUEBA - DESCOMENTAR CUANDO SE IMPLEMENTE */
  // const testProduct: Product = {
  //   id: 1,
  //   name: "Test Product",
  //   description: "Test product description",
  //   price: 100,
  //   stock: 10,
  //   category: {
  //     id: 1,
  //     name: "Test Category"
  //   },
  //   urlPhotos: ["https://placehold.co/10"],
  //   archived: false
  // };
  // initialProducts = [testProduct];
  /* BLOQUE DE PRUEBA - DESCOMENTAR CUANDO SE IMPLEMENTE */

  // const [products, setProducts] = useState<ProductWithQuantity[]>(
  //   initialProducts.map(product => ({ ...product, quantity: 1 }))
  // );

  // const updateQuantity = (id: number, newQuantity: number) => {
  //   setProducts(products.map(product => 
  //     product.id === id ? { ...product, quantity: Math.max(0, newQuantity) } : product
  //   ));
  // };

  // const removeProduct = (id: number) => {
  //   setProducts(products.filter(product => product.id !== id));
  // };

  // const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // useEffect(() => {
  //   setProducts(initialProducts.map(product => ({ ...product, quantity: 1 })));
  // }, [initialProducts]);

  const { products, confirRemoveProduct, updateQuantity, calculateTotal, saleCart } = useCart()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
  }, [])

  const [payed, setPayed] = useState(false)
  const pay = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 33;
      });
    }, 1000);
    setTimeout(() => {
      setPayed(true)
    }, 4000)
    setTimeout(() => {
      saleCart()
    }, 7000)
  }

  return (
    <div className="container mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-8">Carrito de Compras</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Carrito vacío. Vuelva al <Link href="/" className='text-orange-400 font-semibold'>inicio</Link> para añadir productos.</p>
      ) : (
        <div className="flex flex-row gap-8 md:grid-cols-2">
          <div className="w-full h-full">
            {products.map((product: Product) => (
              <div key={product.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                <img src={product.urlPhotos[0]} alt={product.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-grow">
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-gray-600">${product.price.toLocaleString("es")}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(product.id, product.quantity as number - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(product.id, product.quantity as number + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => confirRemoveProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-max w-full">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span>{product.name} x {product.quantity}</span>
                  <span>${(product.price * (product.quantity as number)).toLocaleString("es")}</span>
                </div>
              ))}
            </div>
            {/* <Separator className="my-4" /> */}
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${calculateTotal().toLocaleString("es")}</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-6 text-white" onClick={() => pay()}>Proceder al pago</Button>
              </DialogTrigger>
              <DialogContent className={`sm:max-w-[425px] ${payed ? 'bg-green-500 w-1/2 h-1/2 transition-all duration-500 ease-in-out' : ''}`}>
                <div className="grid gap-4 py-4">
                  {!payed ? (
                    <div>
                      <p className="text-center text-xl">Pagando...</p>
                      <Progress value={progress} className="w-full" />
                    </div>
                  ) : (
                    <div>
                      <h2 className='text-4xl text-center'>¡Pago exitoso!</h2>
                      <p className="text-xl">Muchas gracias por tu compra!</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}