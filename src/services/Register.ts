import { BackendResponse } from "./interfaces/BackendResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL
//Falta definir el tipo de credentials
export async function registerUser(credentials: any) {
  const user = {
    email: credentials.email,
    password: credentials.password,
    fullName: credentials.name + " " + credentials.lastName,
    role: "CUSTOMER"
  };
  try {
    const response = await fetch(apiUrl + "users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data:BackendResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}
