
// import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
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
    // <Navbar className="bg-orange-400">
    //     <Image src={"/Moscow.png"} alt={""} width={40} height={40}></Image>

    //     <NavbarBrand>
    //         <p className="font-bold text-inherit text-2xl">Moskow</p>
    //     </NavbarBrand>
    //     <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //         <NavbarItem>
    //             <Link color="foreground" href="/">
    //                 Inicio
    //             </Link>
    //         </NavbarItem>
    //         <NavbarItem>
    //             <Link color="foreground" href="/">
    //                 Categorias
    //             </Link>
    //         </NavbarItem>
    //         <NavbarItem>
    //             <Link href="/" color="foreground">
    //                 Productos
    //             </Link>
    //         </NavbarItem>
    //         <NavbarItem>
    //             <Link color="foreground" href="/">
    //                 Envios
    //             </Link>
    //         </NavbarItem>
    //     </NavbarContent>
    //     <NavbarContent justify="end">
    //         <NavbarItem>
    //             <Button as={Link} color="secondary" href="/auth/login" variant="solid">
    //                 Log In
    //             </Button>
    //         </NavbarItem>
    //         <NavbarItem>
    //             <Button as={Link} color="danger" href="/auth/register" variant="solid">
    //                 Sign Up
    //             </Button>
    //         </NavbarItem>
    //         <NavbarItem>
    //         <div className="home-container flex justify-center items-center h-screen">
    //             <a
    //                 className="w-10 h-10 rounded-full bg-cover bg-center cursor-pointer"
    //                 style={{ backgroundImage: 'url(/perfil.png)' }} // Foto de perfil
    //                 href="/perfil"
    //             ></a>
    //         </div>

    //         </NavbarItem>

    //     </NavbarContent>
    // </Navbar>
    <header className="sticky top-0 z-50 bg-gray-800 border-gray-700 border-b-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 hover:scale-105 transition-all">
              <span className="text-2xl font-bold text-white ">Moskow</span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <Link href="#" className="text-gray-200 hover:text-orange-300">
                Inicio
              </Link>
              <Link href="#" className="text-gray-200 hover:text-orange-300">
                Categorias
              </Link>
              <Link href="#" className="text-gray-200 hover:text-orange-300">
                Productos
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <input type="search" placeholder="Buscar..." className="custom-input"></input>
            </div>
            <Button size="icon" className="ml-4 bg-transparent hover:bg-transparent">
              <img
                className="w-6 h-6 hover:scale-110"
                src="/icons/shopping-cart.svg"
                alt="Carrito de Compras"
              />
            </Button>
            <div className="flex justify-end">
            
              {!session ? (
                <Link href="/auth/login" className="text-white ml-3">
                <Button>
                  Log In
                </Button>
              </Link>
              ):(
                <div className="home-container flex justify-center items-center h-screen text-white m-4">
                  <a
                    className="w-10 h-10 rounded-full bg-cover bg-center cursor-pointer "
                    style={{ backgroundImage: 'url(/perfil.png)' }} // Foto de perfil
                    href="/perfil"
                  ></a>
                  <p className="m-2">{user.email}</p>
                  <Button  color="danger" onClick={() => signOut()} >
                    Log Out
                  </Button>
                </div>
              )}
            </div>
            
            <Button size="icon" className="ml-2 md:hidden">
              <img src="/icons/search.svg" alt="Buscar" />
            </Button>
            <Button size="icon" className="ml-2 md:hidden">
              <img src="/icons/menu-2.svg" alt="Menú" />
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-input {
          background-color: #4b5563;
          color: #f3f4f6;
          border-color: #374151;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }
        .custom-input::placeholder {
          color: #d1d5db;
        }
        .custom-input:focus {
          outline: none;
          border-color: #f9fafb;
        }
        .custom-input:focus::placeholder {
          color: #f9fafb;
        }
        `}</style>
    </header>
  );
}
