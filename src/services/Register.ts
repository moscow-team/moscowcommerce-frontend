import { BackendResponse } from "./interfaces/BackendResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL
//Falta definir el tipo de credentials
export async function registerUser(credentials: any) {
  const user = {
    email: credentials.username,
    password: credentials.password,
    fullName: credentials.name + " " + credentials.lastName,
  };
  try {
    const response = await fetch(apiUrl + "users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      //HACK para evitar error del backend
      mode: "no-cors",
    });
    const data:BackendResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}
