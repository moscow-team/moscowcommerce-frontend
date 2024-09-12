// DEUADA TECNICA
const apiUrl = "http://localhost:8080/";

export async function logIn(credentials: any) {
    try {
      const response = await fetch(apiUrl + "auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //Debemos validar lo que nos da como repuesta el backend
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error en la solicitud");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }