// app/dashboard/catalogo/page.tsx
export const metadata = {
  title: "Catálogo - Moskow Commerce",
  description: "Admin Panel",
};
export default function CatalogoPage() {
    return (
      <div>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Catálogo de Productos</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <p className="text-gray-600">Lista de productos disponibles en la tienda.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  