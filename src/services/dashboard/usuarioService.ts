import { getSession } from "next-auth/react";

export const getUsers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}users`, {
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

export const createUser = async (data: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}users`, {
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

export const updateUser = async (data: any) => {
  /*
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}users`, {
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
  */
  console.log('Método no implementado en el Backend. Cuando se realice la implementación PUT, se descomenta el código');
}