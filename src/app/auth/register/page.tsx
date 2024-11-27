"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; // Asegúrate de ajustar el path si es necesario
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/Register";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data: any) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }

      // Simula una petición al backend (reemplaza con tu lógica real)
      const response = await registerUser(data);
      if (response?.success) {
        toast.success(response.message as string);
        router.push("/auth/login");
      } else {
        toast.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Ocurrió un error inesperado");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Tu nombre"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              placeholder="Tu apellido"
              {...register("lastName", { required: "El apellido es obligatorio" })}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="Tu correo"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo electrónico inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Tu contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repite tu contraseña"
              {...register("confirmPassword", {
                required: "Debe confirmar la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Botón de enviar */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
      </div>
    </div>
  );
}
