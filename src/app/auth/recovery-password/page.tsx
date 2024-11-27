"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/services/RecoveryPassword";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function RecoveryPasswordPage() {
    const router = useRouter();
    const {
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async () => {


        if (isInvalidEmail) {
            toast.error("Por favor, ingrese un email correcto");
            return;
        }
        try {
            const response = await resetPassword(valueEmail);
            if (response.success) {
                toast.success(response.message);
                router.push("/");
            } else {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    });

    const [valueEmail, setValueEmail] = useState("");

    const validateEmail = (value: string) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalidEmail = useMemo(() => {
        if (valueEmail === "") return false;

        return validateEmail(valueEmail) ? false : true;
    }, [valueEmail]);

    return (
        <div className="flex justify-center items-center w-full h-full min-h-screen">
            <Card className="w-max flex flex-col h-max items-center justify-center mb-32 p-10">
                <form className="flex flex-col gap-5">
                        <h3 className="text-xl text-center font-semibold">Restablecer contraseña</h3>
                    <div className="h-max w-full">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={valueEmail}
                            color={isInvalidEmail ? "danger" : "success"}
                            onChange={(e)=> setValueEmail(e.target.value)}
                        />
                        {errors.email && (
                            // validacion de errores
                            <span className="text-red-500 text-xs">
                                {String(errors.email.message)}
                            </span>
                        )}
                    </div>

                    <Button
                        onClick={onSubmit}
                        color="primary"
                        className="w-full text-white"
                    >
                        Recuperar
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default RecoveryPasswordPage;
