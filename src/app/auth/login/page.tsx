"use client";

import { Button, Card, Link } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";


interface Crediantials {
  email: string;
  password: string;
}


function LoginPage() {
  const [credientials, setCredientials] = useState<Crediantials>({ email: "", password: "" });

  const onSubmit = (data: Crediantials) => {
    alert(JSON.stringify(data));
  }

  const handleChange = (name: string, e: string) => {
    setCredientials({ ...credientials, [name]: e });
  }

  return (
    <div className="flex justify-center items-center w-screen h-full min-h-screen">
      <Card className="w-max flex flex-col h-max items-center justify-center mb-32 p-10">
      <div className="flex flex-col justify-center items-center h-full w-full py-5">
        <h1 className="font-semibold text-4xl mb-4">Iniciar Sesion</h1>
      </div>
        <form
          // onSubmit={onSubmit(credientials)}
          className="w-80 flex flex-col h-max items-center justify-center px-10 gap-5"
        >
          <div className="h-20 w-full">
            <Input
              type="email"
              label="Email"
              onChange={e => handleChange("email", e.target.value)}
              isRequired
              variant="underlined"
              placeholder=""
            />
          </div>
          <div className="h-20 w-full">
            <Input
              isRequired
              onChange={e => handleChange("password", e.target.value)}
              label="Contraseña"
              type="password"
              placeholder=""
              variant="underlined"
            />
          </div>
          <Button
            onPress={() => onSubmit(credientials)}
            color="primary"
            className="w-full"
          >
            Iniciar Sesion
          </Button>
          <div className="p-10">
            <Link href="/auth/register">Registrarse</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
