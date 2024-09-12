"use client";

import { Button, Card, Link } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// interface Crediantials {
//   email: string;
//   password: string;
// }

function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //Remplazmos el useState de credenciales, por el el hook que nos otorga useForm
  // const [credientials, setCredientials] = useState<Crediantials>({ email: "", password: "" });

  const onSubmit = handleSubmit(async (data) => {
    //Enviar peticon al NextAuth o Servidor para realizar la autenticacion (Hacerlo Hook)
      const session = await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: false,
      });
      // console.log(session);
      if (session?.ok) {
        router.push("/dashboard");
        toast.success("Sesion iniciada");
      }

  });

  // const handleChange = (name: string, e: string) => {
  //   setCredientials({ ...credientials, [name]: e });
  // }

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
              // onChange={e => handleChange("email", e.target.value)}
              isRequired
              variant="underlined"
              {...register("email", { required: { value: true, message: "Debe ingresar un email" } })}
            />
            {errors.email && (
              // validacion de errores
              <span className="text-red-500 text-xs">
                {String(errors.email.message)}
              </span>
            )}
          </div>
          <div className="h-20 w-full">
            <Input
              isRequired
              // onChange={e => handleChange("password", e.target.value)}
              label="Contraseña"
              type="password"
              variant="underlined"
              {...register("password", { required: { value: true, message: "Debe ingresar una contrasseña" } })}
            />

            {errors.password && (
              // validacion de errores
              <span className="text-red-500 text-xs">
                {String(errors.password.message)}
              </span>
            )}
          </div>

          <Button
            onClick={onSubmit}
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
