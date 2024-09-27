"use client"

import { Button, Card, Input } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
    getUsers,
    updateUser,
} from "@/services/dashboard/usuarioService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface User {
    id: number;
    email: string;
    fullName: string;
    role: string;
    password: string;
}

export default function Perfil() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [dbUser, setDbUser] = useState<User | null>(null); // Estado para guardar el usuario encontrado
    const { data: session, status } = useSession(); // Obtienes la sesión de forma segura en un Client Component

    useEffect(() => {
        const fetchCatalogItems = async () => {
            try {
                const response = await getUsers();
                if (response && Array.isArray(response.data)) {
                    console.log(response.data);
                    setUsers(response.data); // Guardas los usuarios obtenidos de la base de datos
                } else {
                    console.error("Fetch Error:", response);
                }
            } catch (error) {
                console.error("Error Fetch: ", error);
            }
        };
        fetchCatalogItems();
    }, []);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const loggedInEmail = session.user.email ?? "moskow@admin.com"; // Email del usuario autenticado

            // Busca si el email del usuario logueado está en la lista de usuarios
            const matchedUser = users.find((user) => user.email === loggedInEmail);

            if (matchedUser) {
                setValueEmail(matchedUser.email);
                setValueName(matchedUser.fullName);
                setDbUser(matchedUser); // Si hay coincidencia, actualizas el estado con el usuario de la base de datos
            } else {
                console.log("Usuario no encontrado en la base de datos.");
            }
        }
    }, [session, status, users]);

    const onSubmit = async () => {
        if (isInvalidEmail || isInvalidName || isInvalidLastName) {
            toast.error("Por favor, ingrese todos los campos correctamente");
            return;
        }
        const prevUser: User = {
            id: dbUser?.id as number,
            email: valueEmail,
            fullName: valueName + valueLastName,
            role: dbUser?.role as string,
            password: valuePassword
        };
        const newUser = await updateUser(prevUser as any);
        if (newUser?.success) {
            toast.success(newUser.message);
            router.push("/");
        } else {
            if (newUser.data != null) {
                const errorKey = Object.keys(newUser.data)[0];
                toast.error(newUser.data[errorKey] as string);
            } else {
                toast.error(newUser.message);
            }
        }
    };

    const [valueEmail, setValueEmail] = useState("");

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalidEmail = useMemo(() => {
        if (valueEmail === "") return false;

        return validateEmail(valueEmail) ? false : true;
    }, [valueEmail]);


    const [valueName, setValueName] = useState("");

    const validateName = (value: string) => value.match(/^[A-Z._%+-]{2,15}(?:\s[A-Z._%+-]{2,15})*$/i
    );

    const isInvalidName = useMemo(() => {
        if (valueName === "") return false;

        return validateName(valueName) ? false : true;
    }, [valueName]);


    const [valueLastName, setValueLastName] = useState("");

    const validateLastName = (value: string) => value.match(/^[A-Z._%+-]{2,15}(?:\s[A-Z._%+-]{2,15})*$/i
    );

    const isInvalidLastName = useMemo(() => {
        if (valueEmail === "") return false;

        return validateLastName(valueLastName) ? false : true;
    }, [valueLastName]);
    const [valuePassword, setValuePassword] = useState("");

    const validatePassword = (value: string) => value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/);

    return (
        <div className="flex justify-center items-center w-screen h-full min-h-screen">
            <Card className="w-max flex flex-col h-max items-center justify-center mb-32 p-10">
                <div className="flex flex-col justify-center items-center h-full w-full py-5">
                    <h1 className="font-semibold text-4xl mb-4">Modificar Perfil</h1>
                </div>
                <form
                    // onSubmit={onSubmit} 
                    className="w-80 flex flex-col h-max items-center justify-center px-10 gap-5">
                    <div className="h-20 w-full">
                        <Input
                            label="Nombre y apellido"
                            type="text"
                            variant="underlined"
                            value={dbUser?.fullName}
                            isRequired
                            isInvalid={isInvalidName}
                            color={isInvalidName ? "danger" : "success"}
                            onValueChange={setValueName}
                        ></Input>
                    </div>
                    <div className="h-20 w-full">
                        <Input
                            label="Email"
                            type="email"
                            variant="underlined"
                            value={dbUser?.email}
                            isRequired
                            isInvalid={isInvalidEmail}
                            color={isInvalidEmail ? "danger" : "success"}
                            onValueChange={setValueEmail}

                        ></Input>
                    </div>
                    <div className="h-20 w-full">
                        <Input
                            label="Contraseña"
                            type="password"
                            variant="underlined"
                            isRequired
                            onValueChange={setValuePassword}

                        ></Input>
                    </div>
                    <Button color="primary" className="w-full text-white" onClick={onSubmit}>Registrar</Button>
                </form>
            </Card>
        </div>
    )
}