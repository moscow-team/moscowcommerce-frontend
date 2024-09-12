"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function CatalogoPage() {
  const [categoryName, setCategoryName] = useState("");
  const [existingCategoryName, setExistingCategoryName] = useState("Mates"); // Simula el nombre de una categoría
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // Controlar la visibilidad del formulario
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [isEditFormVisible, setIsEditFormVisible] = useState(false); // Controlar la visibilidad del formulario de edición
  const [newCategoryName, setNewCategoryName] = useState(""); // Nuevo nombre de la categoría

  // Crear nueva categoria
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Valida que el nombre de la categoria no esté vacío y tenga máximo 100 caracteres
    if (categoryName.trim() === "" || categoryName.length > 100) {
      setError(
        "Por favor, ingrese un nombre para la categoría menor a 100 caracteres."
      );
      setSuccess("");
      return;
    }

    // Simular guardado de la categoría
    setSuccess("Categoría creada con éxito.");
    setError("");
    setCategoryName(""); // Limpiar el campo

    // Ocultar el formulario después de guardar
    setTimeout(() => {
      setIsFormVisible(false);
      setSuccess("");
    }, 2000); // El formulario desaparecerá 2 segundos después de la creación exitosa
  };

  // Manejador para mostrar/ocultar el formulario de "Nueva Categoría"
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Manejador para mostrar/ocultar el dropdown de "Modificar Categoría"
  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Manejar la actualización de la categoría
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newCategoryName.trim() === "" || newCategoryName.length > 100) {
      setEditError("Por favor, ingrese un nombre válido para la categoría.");
      setEditSuccess("");
      return;
    }

    // Simulación de la actualización exitosa
    setEditSuccess("Categoría modificada con éxito.");
    setEditError("");
    setIsEditFormVisible(false); // Cerrar el formulario
    setNewCategoryName(""); // Limpiar el campo de entrada
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
          {/* Contenedor flex para organizar botones */}
          <div className="flex space-x-4">
            {/* NUEVA CATEGORÍA */}
            <button
              onClick={toggleFormVisibility}
              className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-600"
            >
              <span className="text-xl font-bold">+</span>
              <span>Nueva Categoría</span>
            </button>

            {/* MODIFICAR CATEGORÍA */}
            <button
              onClick={toggleDropdownVisibility}
              className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-orange-600"
            >
              <span className="text-xl font-bold">✎</span>
              <span>Modificar Categoría</span>
            </button>
          </div>

          {/* Mostrar el formulario si isFormVisible es true */}
          {isFormVisible && (
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 mt-4">
              <h2 className="text-xl font-semibold mb-4">
                Crear Nueva Categoría
              </h2>

              {/* Formulario Nueva Categoría */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ingrese el nombre de la Categoría
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyLetters = value.replace(/[^a-zA-Z\s]/g, ""); // Solo letras y espacios
                      setCategoryName(onlyLetters);
                    }}
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
                  Guardar Categoría
                </button>
              </form>
            </div>
          )}

          {/* Mostrar lista desplegable si isDropdownVisible es true */}
          {isDropdownVisible && (
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 mt-4">
              <h2 className="text-xl font-semibold mb-4">
                Modificar Categoría
              </h2>

              {/* Lista desplegable de categorías */}
              <label
                htmlFor="existingCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Selecciona una Categoría
              </label>
              <select
                id="existingCategory"
                value={existingCategoryName}
                onChange={(e) => {
                  setExistingCategoryName(e.target.value);
                  setIsEditFormVisible(true); // Mostrar el formulario de edición
                }}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Mates">Mates</option>
                <option value="Vasos">Vasos</option>
                <option value="Tazas">Tazas</option>
                {/* Agrega más opciones según las categorías disponibles */}
              </select>

              {isEditFormVisible && (
                <>
                  {/* Input para el nuevo nombre de la categoría */}
                  <div className="mt-4">
                    <label
                      htmlFor="newCategoryName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nuevo Nombre de la Categoría
                    </label>
                    <input
                      type="text"
                      id="newCategoryName"
                      value={newCategoryName}
                      onChange={(e) => {
                        const value = e.target.value;
                        const onlyLetters = value.replace(/[^a-zA-Z\s]/g, ""); // Solo letras y espacios
                        setNewCategoryName(onlyLetters);
                      }}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      maxLength={100}
                    />
                  </div>

                  {/* Botones de Aceptar y Cancelar */}
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={handleEditSubmit} // Guardar los cambios
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => {
                        setIsEditFormVisible(false); // Cerrar el formulario
                        setIsDropdownVisible(false); // Cerrar el dropdown
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
