
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";


export default function Header() {
    const { data: session, status } = useSession(); // Aquí obtienes la sesión de forma segura en un Client Component
  const [user, setUser] = useState({ email: "", name: "", status: "Offline" });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        email: session.user.email ?? "moskow@admin.com",
        name: session.user.name ?? "Admin",
        status: "Online",
      });
    }
  }, [session, status]); // Escucha los cambios en session y status

    
    return (
        <Navbar className="bg-orange-400">
            <Image src={"/Moscow.png"} alt={""} width={40} height={40}></Image> 

            <NavbarBrand>
                <p className="font-bold text-inherit text-2xl">Moskow</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Categorias
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/" color="foreground">
                        Productos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/dashboard">
                        Envios
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
      {!session ? (
        // Mostrar los botones de Log In y Sign Up si no está autenticado
        <>
          <NavbarItem>
            <Button as={Link} color="secondary" href="/auth/login" variant="solid">
              Log In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="danger" href="/auth/register" variant="solid">
              Sign Up
            </Button>
          </NavbarItem>
        </>
      ) : (
        // Mostrar el botón de perfil si está autenticado
        <>
        <NavbarItem>
          <div className="home-container flex justify-center items-center h-screen">
            <a
              className="w-10 h-10 rounded-full bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: 'url(/perfil.png)' }} // Foto de perfil
              href="/perfil"
            ></a>
          </div>
        </NavbarItem>
        <NavbarItem>
            <p>{user.email}</p>
        </NavbarItem>
        <Button  color="danger" onClick={() => signOut()} variant="solid">
              Log Out
            </Button>
        </>
        
      )}
    </NavbarContent>
        </Navbar>
    )
}