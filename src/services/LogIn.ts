// DEUADA TECNICA
const apiUrl = process.env.NEXT_APUBLIC_API_URL

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
    //Debemos validar lo que nos da como repuesta el backend
    // const data = await response.json();
    // if (!response.ok) {
    //   throw new Error(data.message || "Error en la solicitud");
    // }
    // return data;
    return {
      data: {
        name: "Tomi",
        token: "asdsadvfjdsfhguibgiybwagnwojigfnorawjngfojaengonergnergnoierw"
      },
      message: "Session Iniciada",
      status: "SUCCESS",
      failure: false,
      success: true,
    };
  } catch (error) {
    throw error;
  }
}
