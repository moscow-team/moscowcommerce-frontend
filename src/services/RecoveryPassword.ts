import { BackendResponse } from "./interfaces/BackendResponse";

interface ErrorData {
  [key: string]: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//Falta definir el tipo de credentials
export async function resetPassword(email: string) {
  try {
    const response = await fetch(apiUrl + "users/password", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: BackendResponse = await response.json();
    if (data.failure) {
      if (data.data != null) {
        const errorData = data.data as ErrorData;
        const errorKey = Object.keys(errorData)[0];
        throw new Error(errorData[errorKey]);
      }
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
