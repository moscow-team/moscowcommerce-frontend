import { ILogIn } from "./interfaces/ILogIn";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function logIn(credentials: any) {
  try {
    const response = await fetch(apiUrl + "auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: credentials.username,
        password: credentials.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al iniciar sesion");
    }
    const data: ILogIn = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
