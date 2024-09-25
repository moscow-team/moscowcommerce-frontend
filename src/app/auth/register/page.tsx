"use client"

import { registerUser } from "@/services/Register";
import { Button, Card, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const onSubmit = handleSubmit(async (data) => {
        //Enviar peticion al NextAuth o Servidor para realizar la autenticacion (Hacerlo Hook)
        if (isInvalidPassword || isInvalidConfirmPassword) {
            toast.error("Debe ingresar una contraseña valida (1 letra miniscula, 1 letra mayusucula, 1 numero minimo)");
            return;
        }
        if (data.password !== data.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        if (isInvalidEmail || isInvalidName || isInvalidLastName) {
            toast.error("Por favor, ingrese todos los campos correctamente");
            return;
        }
        //Funcion para registrarnos
        const newUser = await registerUser(data as any);
        if (newUser?.success) {
            router.push("/auth/login");
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



    const [valuePassword, setValuePassword] = useState("");

    const validatePassword = (value: string) =>
        value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/);

    const isInvalidPassword = useMemo(() => {
        if (valuePassword === "") return false;

        return validatePassword(valuePassword) ? false : true;
    }, [valuePassword]);




    const [valueConfirmPassword, setValueConfirmPassword] = useState("");

    const validateConfirmPassword = (value: string) =>
        value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/);

    const isInvalidConfirmPassword = useMemo(() => {
        if (valueConfirmPassword === "") return false;

        return validateConfirmPassword(valueConfirmPassword) ? false : true;
    }, [valueConfirmPassword]);

    return (
        <div className="flex justify-center items-center w-screen h-full min-h-screen">
            <Card className="w-max flex flex-col h-max items-center justify-center mb-32 p-10">
                <div className="flex flex-col justify-center items-center h-full w-full py-5">
                    <h1 className="font-semibold text-4xl mb-4">Registro de Usuario</h1>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="w-80 flex flex-col h-max items-center justify-center px-10 gap-5">
                    <div className="h-20 w-full">
                        <Input
                            label="Nombre"
                            type="text"
                            variant="underlined"
                            value={valueName}
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
                            value={valueLastName}
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
                            value={valueEmail}
                            isRequired

                            isInvalid={isInvalidEmail}
                            color={isInvalidEmail ? "danger" : "success"}
                            onValueChange={setValueEmail}
                            // onChange={(e) => handleChange("email", e.target.value)}
                            {...register("email", { required: { value: true, message: "Debe ingresar un email valido" } })}

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
                            value={valuePassword}
                            isRequired
                            isInvalid={isInvalidPassword}
                            color={isInvalidPassword ? "danger" : "success"}
                            onValueChange={setValuePassword}
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
                    <div className="h-20 w-full">
                        <Input
                            label="Confirmar Contraseña"
                            type="password"
                            variant="underlined"
                            value={valueConfirmPassword}
                            isRequired
                            isInvalid={isInvalidConfirmPassword}
                            color={isInvalidConfirmPassword ? "danger" : "success"}
                            onValueChange={setValueConfirmPassword}
                            // onChange={(e) => handleChange("confirmPassword", e.target.value)}
                            {...register("confirmPassword", { required: { value: true, message: "Debe ingresar una contraseña" } })}

                        ></Input>
                        {errors.confirmPassword && (
                            // validacion de errores
                            <span className="text-red-500 text-xs">
                                {String(errors.confirmPassword.message)}
                            </span>
                        )}
                    </div>
                    <Button color="primary" className="w-full" onClick={onSubmit}>Registrar</Button>
                </form>
            </Card>
        </div>
    )
}