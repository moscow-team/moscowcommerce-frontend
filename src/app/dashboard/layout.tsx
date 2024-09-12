"use client";
import { useState } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
        ${sidebarOpen ? "w-64" : "w-16"}
        bg-white shadow-lg fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
      `}
      >
        <div className="flex items-center justify-between h-16 bg-gray-800 text-white px-4">
          <span
            className={`text-xl font-semibold ${sidebarOpen ? "" : "hidden"}`}
          >
            Tablero
            {/* Por hacer: Agregar email del usuario, el logo de la empresa, etc. */}
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
        <nav className="mt-8">
          <Link href="/dashboard">
            <button
              className={`flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ${
                sidebarOpen ? "justify-start" : "justify-center"
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
          <Link href="/dashboard/catalogo">
            <button
              className={`flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ${
                sidebarOpen ? "justify-start" : "justify-center"
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
                Catálogo
              </span>
            </button>
          </Link>
        </nav>
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
