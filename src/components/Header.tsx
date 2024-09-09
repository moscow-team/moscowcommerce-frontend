import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
    return (
        <Navbar className="bg-secondary">
            <NavbarBrand>
                <p className="font-bold text-inherit">Moskow</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Categorias
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" color="foreground">
                        Productos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Envios
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="/auth/login" variant="solid">
                        Log In
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="danger" href="/auth/register" variant="solid">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}