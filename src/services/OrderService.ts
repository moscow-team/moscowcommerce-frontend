// {
//     "payment": {
//       "paymentMethod": "CREDIT"
//     },
//     "shipment": {
//       "address": "123 Calle Falsa, Ciudad, País"
//     },
//     "products": [
//       {
//         "productId": 1,
//         "quantity": 2
//       }
//     ]
//   }
  

import { getSession } from "next-auth/react";
import { BackendResponse } from "./interfaces/BackendResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//Falta definir el tipo de credentials
export async function saveOrder(products: {
    productId: number;
    quantity: number;
}[],) {
    const session: any = await getSession();
    const order = { 
        payment: {
            "paymentMethod": "CREDIT"
        },
        products: products,
        shipment: {
            address: "Moscow Ecommerce"
        }
    }
  try {
    const response = await fetch(apiUrl + "order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.token}`,
      },
    });
    const data: BackendResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrders() {
    const session: any = await getSession();

  try {
    const response = await fetch(apiUrl + "order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.token}`,
      },
    });
    const data: BackendResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}