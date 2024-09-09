"use client"

import { Button, Card, Input } from "@nextui-org/react";
import { useState } from "react";

interface Form {
    email: string;
    password: string;
    name: string;
    lastName: string;
    confirmPassword: string;
}

export default function () {

    const [form, setForm] = useState<Form>(
        {
            email: "",
            password: "",
            name: "",
            lastName: "",
            confirmPassword: ""
        });

    const onSubmit = (data: Form) => {
        console.log(data);
    }

    const handleChange = (name: string, e: string) => {
        setForm({ ...form, [name]: e });
    }

    return (
        <div className="flex justify-center items-center w-screen h-full min-h-screen">
            <Card className="w-max flex flex-col h-max items-center justify-center mb-32 p-10">
                <div className="flex flex-col justify-center items-center h-full w-full py-5">
                    <h1 className="font-semibold text-4xl mb-4">Registro de Usuario</h1>
                </div>
                <form 
                // onSubmit={onSubmit} 
                className="w-80 flex flex-col h-max items-center justify-center px-10 gap-5">
                    <Input
                        label="Nombre"
                        type="text"
                        variant="underlined"
                        onChange={(e) => handleChange("name", e.target.value)}
                    ></Input>
                    <Input
                        label="Apellido"
                        type="text"
                        variant="underlined"
                        onChange={(e) => handleChange("lastName", e.target.value)}
                    ></Input>
                    <Input
                        label="Email"
                        type="text"
                        variant="underlined"
                        onChange={(e) => handleChange("email", e.target.value)}
                    ></Input>
                    <Input
                        label="Contraseña"
                        type="password"
                        variant="underlined"
                        onChange={(e) => handleChange("password", e.target.value)}
                    ></Input>
                    <Input
                        label="Confirmar Contraseña"
                        type="password"
                        variant="underlined"
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    ></Input>
                    <Button color="primary" className="w-full" onPress={()=>onSubmit(form)}>Registrar</Button>
                </form>
            </Card>
        </div>
    )
}