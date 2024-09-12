// app/dashboard/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Dashboard - Moskow Commerce",
  description: "Admin Panel",
};
export default function DashboardPage() {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Panel de Administración
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <p className="text-gray-600">
              Ver si es posible agregar gráficos referidos a las estadísticas en
              un futuro.
            </p>
            {/* Enlace para ir a la página de catálogo */}
            <Link href="/dashboard/catalogo">
              <a className="text-indigo-600 hover:text-indigo-800 underline">
                Ir a Catálogo
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
