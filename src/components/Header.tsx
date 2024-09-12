import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <Navbar className="bg-primary">
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
            Catálogo
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/" color="foreground">
            Productos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Envios
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="secondary"
            href="/auth/login"
            variant="solid"
          >
            Log In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="danger"
            href="/auth/register"
            variant="solid"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
