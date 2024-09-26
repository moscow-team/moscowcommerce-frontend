"use client"

import { Button, Card, Input } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    getUsers,
    updateUser,
  } from "@/services/dashboard/usuarioService";
  import { useSession } from "next-auth/react";
import router from "next/router";
  interface User {
    id: number;
    email: string;
    fullName: string;
    role: string;
  }

export default function Perfil () {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
      const [users, setUsers] = useState<User[]>([]);
      const [dbUser, setDbUser] = useState<User | null>(null); // Estado para guardar el usuario encontrado
      const { data: session, status } = useSession(); // Obtienes la sesión de forma segura en un Client Component
    
      useEffect(() => {
        const fetchCatalogItems = async () => {
          try {
            const response = await getUsers();
            if (response && Array.isArray(response.data)) {
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
            setDbUser(matchedUser); // Si hay coincidencia, actualizas el estado con el usuario de la base de datos
          } else {
            console.log("Usuario no encontrado en la base de datos.");
          }
        }
      }, [session, status, users]);

    //Quitamos el useState para manejar el formulario de logue, para delegarlo al useForm 
    // const [form, setForm] = useState<Form>(
    //     {
    //         email: "",
    //         password: "",
    //         name: "",
    //         lastName: "",
    //         confirmPassword: ""
    //     });

    // const handleChange = (name: string, e: string) => {
    //     setForm({ ...form, [name]: e });
    // }

    const onSubmit = handleSubmit(async (data) => {
        //Enviar peticion al NextAuth o Servidor para realizar la autenticacion (Hacerlo Hook)
        // if (isInvalidPassword || isInvalidConfirmPassword) {
        //     toast.error("Debe ingresar una contraseña valida (1 letra miniscula, 1 letra mayusucula, 1 numero minimo)");
        //     return;
        // }
        // if (data.password !== data.confirmPassword) {
        //     toast.error("Las contraseñas no coinciden");
        //     return;
        // }

        

        if (isInvalidEmail || isInvalidName || isInvalidLastName) {
            toast.error("Por favor, ingrese todos los campos correctamente");
            return;
        }

        const prevUser: User = {
            id: 1,                
            email: valueEmail ,
            fullName: valueName + valueLastName, 
            role: "ADMIN"          
          };
        //Funcion para registrarnos
        const newUser = await updateUser(prevUser as any);
        if (newUser?.success) {
            toast.success(newUser.message);
        } else {
            if (newUser.data != null) {
                const errorKey = Object.keys(newUser.data)[0];
                toast.error(newUser.data[errorKey] as string);
            }else{
                toast.error(newUser.message);
            }
        }
        });

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
    // const [valuePassword, setValuePassword] = useState("");

    // const validatePassword = (value: string) =>
    //     value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/);

    // const isInvalidPassword = useMemo(() => {
    //     if (valuePassword === "") return false;

    //     return validatePassword(valuePassword) ? false : true;
    // }, [valuePassword]);
    // const [valueConfirmPassword, setValueConfirmPassword] = useState("");

    // const validateConfirmPassword = (value: string) =>
    //     value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/);

    // const isInvalidConfirmPassword = useMemo(() => {
    //     if (valueConfirmPassword === "") return false;

    //     return validateConfirmPassword(valueConfirmPassword) ? false : true;
    // }, [valueConfirmPassword]);

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
                            label="Nombre"
                            type="text"
                            variant="underlined"
                            value={dbUser?.fullName}
                            isRequired
                            isInvalid={isInvalidName}
                            color={isInvalidName ? "danger" : "success"}
                            onValueChange={setValueName}
                            // onChange={(e) => handleChange("name", e.target.value)}
                            {...register("name", { required: { value: true, message: "Debe ingresar un nombre" } })}
                        ></Input>
                        {errors.name && (
                            // validacion de errores
                            <span className="text-red-500 text-xs">
                                {String(errors.name.message)}
                            </span>
                        )}
                    </div>
                    <div className="h-20 w-full">
                        <Input
                            label="Apellido"
                            type="text"
                            variant="underlined"
                            defaultValue={valueLastName}
                            isRequired

                            isInvalid={isInvalidLastName}
                            color={isInvalidLastName ? "danger" : "success"}
                            onValueChange={setValueLastName}
                            {...register("lastName", { required: { value: true, message: "Debe ingresar un apellido" } })}
                        // onChange={(e) => handleChange("lastName", e.target.value)}
                        ></Input>
                        {errors.lastName && (
                            // validacion de errores
                            <span className="text-red-500 text-xs">
                                {String(errors.lastName.message)}
                            </span>
                        )}
                    </div>
                    <div className="h-20 w-full">
                        <Input
                            label="Email"
                            type="text"
                            variant="underlined"
                            defaultValue={dbUser?.email}
                            isRequired

                            isInvalid={isInvalidEmail}
                            color={isInvalidEmail ? "danger" : "success"}
                            onValueChange={setValueEmail}
                            // onChange={(e) => handleChange("email", e.target.value)}
                            {...register("email", { required: { value: true, message: "Debe ingresar un email" } })}

                        ></Input>
                        {errors.email && (
                            // validacion de errores
                            <span className="text-red-500 text-xs">
                                {String(errors.email.message)}
                            </span>
                        )}
                    </div>
                    <div className="h-20 w-full">
                        <Input
                            label="Contraseña"
                            type="password"
                            variant="underlined"
                            isRequired

                            // onChange={(e) => handleChange("password", e.target.value)}
                            {...register("password", { required: { value: true, message: "Debe ingresar una contraseña" } })}

                        ></Input>
                        {errors.password && (
                            // validacion de errores
                            <span className="text-red-500 text-xs">
                                {String(errors.password.message)}
                            </span>
                        )}
                    </div>
                    
                    <Button color="primary" className="w-full" onClick={onSubmit}>Registrar</Button>
                </form>
            </Card>
        </div>
    )
}