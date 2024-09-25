import { getSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCategorias = async () => {
    const session: any = await getSession();
    
    const response = await fetch(`${apiUrl}category`, {
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
}