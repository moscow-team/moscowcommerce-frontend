import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre nosotros</h3>
              <p className="text-gray-400">
                Moscow es una tienda de comercio electrónico que ofrece una amplia variedad de articulos para mate.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Servicio al cliente</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    FAQs
                  </Link>
                </li>
                {/* <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Returns
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Categorias
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Productos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Moscow. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
}