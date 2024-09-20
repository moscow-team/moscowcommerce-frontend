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
