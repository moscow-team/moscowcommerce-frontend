import { getSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const getProducts = async () => {
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
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${session?.user?.token}`,
    },
    body: JSON.stringify(data),
    // body: data
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export const updateProduct = async (id:number, data: any) => {
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products/${id}`, {
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

export const deleteProduct = async (id: number) => {
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.user?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
}

export const unarchivedProduct = async (id: number) => {
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.user?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to unarchive product");
  }

  return response.json();
}