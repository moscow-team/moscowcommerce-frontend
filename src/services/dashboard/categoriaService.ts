import { getSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCategorias = async () => {
    const session: any = await getSession();
    
    const response = await fetch(`${apiUrl}category`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch user items");
    }

    return response.json();
}

export const createCategoria = async (data: any) => {
    const session: any = await getSession();
    
    const response = await fetch(`${apiUrl}category`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error("Failed to create category");
    }
    
    return response.json();
}

export const updateCategoria = async (id: number, data: any) => {
    const session: any = await getSession();
    
    const response = await fetch(`${apiUrl}category/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error("Failed to update category");
    }
    
    return response.json();
}

export const deleteCategoria = async (id: number) => {
    const session: any = await getSession();
    
    const response = await fetch(`${apiUrl}category/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.token}`,
        },
    });
    
    if (!response.ok) {
        throw new Error("Failed to delete category");
    }
    
    return response.json();
}

export const unarchivedCategory = async (id: number) => {
    const session: any = await getSession();
  
    const response = await fetch(`${apiUrl}category/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to unarchive category");
    }
  
    return response.json();
  }