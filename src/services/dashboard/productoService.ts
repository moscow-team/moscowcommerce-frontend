import { getSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const getProducts = async () => {
  // Al no necesitar token, no lo mandamos
  // const session: any = await getSession();

  const response = await fetch(`${apiUrl}products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${session?.user?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user items");
  }

  return response.json();
};

export const createProduct = async (data: FormData) => {
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${session?.user?.token}`,
    },
    body: data
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export const updateProduct = async (id:number, data: FormData) => {
  const session: any = await getSession();

  const response = await fetch(`${apiUrl}products/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${session?.user?.token}`,
    },
    body: data,
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

// export const getProductsByFilters = async (params: Record<string, string>) => {
//   const session: any = await getSession();
//   // const queryString = new URLSearchParams(params).toString();

//   const response = await fetch(`${apiUrl}products/filters?field1=id&value1=${params.id}&operator1==`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch products by filters");
//   }

//   return response.json();
// }

export const getProductsByFilters = async (params: Record<string, string | number>) => {

  const filters = Object.keys(params).map((key, index) => {
    return `field${index + 1}=${encodeURIComponent(key)}&value${index + 1}=${encodeURIComponent(params[key])}&operator${index + 1}==`;
  }).join('&');
  
  const queryString = `?${filters}`;

  const response = await fetch(`${apiUrl}products/filters${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products by filters");
  }

  return response.json();
};



export const getRelatedProducts = async (id: number) => {
  /* Match Categories ID */
};