// app/dashboard/layout.tsx
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed inset-y-0 left-0 z-50">
        <div className="flex items-center justify-center h-16 bg-gray-800 text-white">
          <span className="text-xl font-semibold">Moscow Ecommerce</span>
        </div>
        <nav className="mt-8">
          <Link href="/dashboard">
            <button 
              className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </button>
          </Link>
          
          <Link href="/dashboard/catalogo">
            <button 
              className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Catálogo
            </button>
          </Link>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
}
