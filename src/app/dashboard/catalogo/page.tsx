// app/dashboard/catalogo/page.tsx
import { useState } from "react";

export const metadata = {
  title: "Catálogo - Moskow Commerce",
  description: "Admin Panel",
};
export default function CatalogoPage() {
  const [categoryName, setCategoryName] = useState("");
  const [existingCategoryName, setExistingCategoryName] =
    useState("Categorya Ejemplo"); // Nombre de la categoria existente (simulado)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");

  // Crear nueva categoria
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Valida que el nombre de la categoria sea vacío y tenga máximo 100 caracteres
    if (categoryName.trim() === "" || categoryName.length > 100) {
      setError(
        "Por favor, ingrese un nombre para la categoria menor a 100 caracteres."
      );
      setSuccess("");
      return;
    }

    // Simular guardado del categoria
    setSuccess("Categoria creada con éxito.");
    setError("");
    setCategoryName(""); // Limpiar el campo
  };

  // Modificar categoria existente
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el nombre de la categoria no esté vacío y tenga menos de 100 caracteres
    if (
      existingCategoryName.trim() === "" ||
      existingCategoryName.length > 100
    ) {
      setEditError("Por favor, ingrese un nombre válido para la categoria.");
      setEditSuccess("");
      return;
    }

    // Simular modificación de la categoria
    setEditSuccess("Categoria modificada con éxito.");
    setEditError("");
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Catálogo de Productos
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">
              Crear Nueva Categoria
            </h2>

            {/* Formulario de Creación de Categoria */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="catalogName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la Categoria
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  maxLength={100}
                />
              </div>

              {error && <p className="text-red-600 mb-4">{error}</p>}
              {success && <p className="text-green-600 mb-4">{success}</p>}

              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Guardar Categoria
              </button>
            </form>
          </div>

          {/* Formulario de modificación de categoria existente */}
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Modificar Categoria Existente
            </h2>

            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="existingCatalogName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la Categoria
                </label>
                <input
                  type="text"
                  id="existingCategoryName"
                  value={existingCategoryName}
                  onChange={(e) => setExistingCategoryName(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  maxLength={100}
                />
              </div>

              {editError && <p className="text-red-600 mb-4">{editError}</p>}
              {editSuccess && (
                <p className="text-green-600 mb-4">{editSuccess}</p>
              )}

              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Guardar Cambios
              </button>
            </form>
          </div>

          {/* Sección de productos */}
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4 mt-6">
            <p className="text-gray-600">
              Lista de productos disponibles en la tienda.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
