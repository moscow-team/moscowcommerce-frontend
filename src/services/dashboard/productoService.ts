import { getSession } from "next-auth/react";

export const getProducts = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.user?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user items");
  }

  return response.json();
};

export const createProduct = async (data: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.user?.token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export const updateProduct = async (data: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.user?.token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}