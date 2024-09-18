"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = {
    email: "moskow@admin.com",
    name: "Admin",
    status: "Online",
  };

  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
        ${sidebarOpen ? "w-64" : "w-16"}
        bg-white shadow-lg fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
      `}
      >
        <div className="bg-gray-800 text-white">
          <div className="flex items-center justify-between h-16 px-4">
            <span
              className={`text-xl font-semibold ${sidebarOpen ? "" : "hidden"}`}
            >
              Tablero
            </span>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded={sidebarOpen}
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    sidebarOpen
                      ? "M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      : "M13 5l7 7-7 7M5 5l7 7-7 7"
                  }
                />
              </svg>
            </button>
          </div>
          <div className={`px-4 pb-4 ${sidebarOpen ? "" : "hidden"}`}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl font-semibold">
                {user.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-300">@{user.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  user.status === "Online" ? "bg-green-400" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`ml-2 font-semibold text-sm ${
                  user.status === "Online" ? "text-green-400" : "text-gray-400"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 h-full">
          <nav className="pt-5">
            <Link href="/dashboard">
              <button
                className={`flex items-center w-full px-4 py-3 text-white hover:bg-gray-800 hover:text-orange-100 transition-colors duration-200 ${
                  pathname === "/dashboard" ? "text-orange-200" : ""
                } ${sidebarOpen ? "justify-start" : "justify-center"}
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span className={`ml-3 ${sidebarOpen ? "" : "hidden"}`}>
                  Dashboard
                </span>
              </button>
            </Link>
            <Link href="/dashboard/productos">
              <button
                className={`flex items-center w-full px-4 py-3 text-white hover:bg-gray-800 hover:text-orange-100 transition-colors duration-200 ${
                  pathname === "/dashboard/productos" ? "text-orange-200" : ""
                } ${sidebarOpen ? "justify-start" : "justify-center"}
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
                <span className={`ml-3 ${sidebarOpen ? "" : "hidden"}`}>
                  Productos
                </span>
              </button>
            </Link>
            <Link href="/dashboard/categorias">
              <button
                className={`flex items-center w-full px-4 py-3 text-white hover:bg-gray-800 hover:text-orange-100 transition-colors duration-200 ${
                  pathname === "/dashboard/categorias" ? "text-orange-200" : ""
                } ${sidebarOpen ? "justify-start" : "justify-center"}
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className={`ml-3 ${sidebarOpen ? "" : "hidden"}`}>
                  Categorías
                </span>
              </button>
            </Link>
            <Link href="/dashboard/usuarios">
              <button
                className={`flex items-center w-full px-4 py-3 text-white hover:bg-gray-800 hover:text-orange-100 transition-colors duration-200 ${
                  pathname === "/dashboard/usuarios" ? "text-orange-200" : ""
                } ${sidebarOpen ? "justify-start" : "justify-center"}
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-user h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
                <span className={`ml-3 ${sidebarOpen ? "" : "hidden"}`}>
                  Usuarios
                </span>
              </button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              🧉 Moskow - Panel de Administración
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              aria-expanded={sidebarOpen}
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>
        {/* Renderizar contenido de la página */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
