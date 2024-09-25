import { getSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const getUsers = async () => {
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
}