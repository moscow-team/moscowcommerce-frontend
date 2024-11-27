import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/app/context/useCart";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, LayoutDashboard } from 'lucide-react';

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    fullName?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export default function Header() {
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  const [user, setUser] = useState({ email: "", name: "", status: "Offline" });
  const { productQuantity } = useCart();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        email: session.user.email ?? "moskow@admin.com",
        name: session.user.fullName ?? "Admin",
        status: "Online",
      });
    }
  }, [session, status]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-800 border-gray-700 border-b-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 hover:scale-105 transition-all"
            >
              <span className="text-2xl font-bold text-white">Moskow</span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {session?.user && session.user.role === "ADMIN" ? (
                <Link href="/dashboard" className="text-gray-200 hover:text-orange-300">
                  Dashboard
                </Link>
              ) : null}
              <>
                <Link href="/inicio" className="text-gray-200 hover:text-orange-300">
                  Inicio
                </Link>
                <Link href="/categoria" className="text-gray-200 hover:text-orange-300">
                  Categorias
                </Link>
                <Link href="/producto" className="text-gray-200 hover:text-orange-300">
                  Productos
                </Link>
              </>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {!session || session.user.role === "CUSTOMER" ? (
              <div className="relative">
                <Link href="/carrito">
                  <Button
                    size="icon"
                    className="ml-4 bg-transparent hover:bg-transparent relative"
                  >
                    <img
                      className="w-6 h-6 hover:scale-110 transition-transform duration-200"
                      src="/icons/shopping-cart.svg"
                      alt="Carrito de Compras"
                    />
                  </Button>
                </Link>
                <AnimatePresence>
                  {productQuantity > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Badge 
                        variant="destructive" 
                        className="px-2 py-1 text-xs font-bold rounded-full"
                      >
                        {productQuantity}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}

            <div className="flex justify-end">
              {!session ? (
                <Link href="/auth/login" className="text-white ml-3">
                  <Button>Log In</Button>
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || undefined} alt={session.user.name || ""} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/perfil" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    {session.user.role === "ADMIN" && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <Button size="icon" className="ml-2 md:hidden">
              <img src="/icons/menu-2.svg" alt="Menú" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

