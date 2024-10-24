"use client";
// export const metadata = {
//   title: "Catálogo - Moskow Commerce",
//   description: "Admin Panel",
// };
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  unarchivedCategory
} from "@/services/dashboard/categoriaService";
import { toast } from "sonner";

export default function CategoryList() {
  interface Categoria {
    id: number;
    name: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    archivedDate: string;
  }

  /* Lógica Modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null
  );
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  /* Get Categoría */
  const [categoria, setCategoria] = useState<Categoria[]>([]);
  async function fetchCategories() {
    try {
      const response = await getCategorias();
      setCategoria(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  /* Crear Categoría */
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      try {
        await createCategoria(data);
        console.log("Envío exitoso");
        toast.success("Categoría creada exitosamente");
        fetchCategories();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al crear la categoría");
      }
    }
    closeModal();
  };

  /* Editar Categoría */
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado");
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      try {
        if (selectedCategoria && selectedCategoria.id !== undefined) {
          await updateCategoria(selectedCategoria.id, data);
        } else {
          console.error("Error al editar la categoría: ID no encontrado");
          toast.error("Error al editar la categoría");
        }
        console.log("Envío exitoso");
        toast.success("Categoría editada exitosamente");
        fetchCategories();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al editar la categoría");
      }
    }
    closeEditModal();
  };

  /* Eliminar Categoría */
  const handleDelete = async (id: number) => {
    try {
      await deleteCategoria(id);
      toast.success("Categoría eliminada exitosamente");
      fetchCategories();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al eliminar la categoría");
    }
  };

  /* Restaurar Categoría */
  const handleRestore = async (id: number) => {
    try {
      await unarchivedCategory(id);
      const response = await getCategorias();
      setCategoria(response.data);
      toast.success("Categoría restaurada correctamente");
    } catch (error) {
      console.error("Error restaurando categoría: ", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button
          onClick={openModal}
          className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Añadir
        </Button>
      </div>
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha Creación</TableHead>
            <TableHead>Fecha Modificación</TableHead>
            <TableHead>Fecha Eliminación</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoria.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.id}</TableCell>
              <TableCell>
                {cat.archivedDate ? <s>{cat.name}</s> : cat.name}
              </TableCell>
              <TableCell>{cat.description.length > 75 ? `${cat.description.substring(0, 75)}...` : cat.description}</TableCell>
              <TableCell>{cat.creationDate}</TableCell>
              <TableCell>{cat.modificationDate}</TableCell>
              <TableCell>
                {cat.archivedDate ? (
                  <span className="text-red-500">{cat.archivedDate}</span>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditModal(cat)}
                    disabled={!!cat.archivedDate}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                    <span className="sr-only">Edit</span>
                  </Button>
                  {cat.archivedDate ? (
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-success"
                      onClick={() => handleRestore(cat.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                      </svg>
                      <span className="sr-only">Restaurar</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                      <span className="sr-only">Delete</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Categoría</DialogTitle>
          </DialogHeader>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                name="name"
                id="name"
                placeholder="Nombre de la categoría"
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input
                name="description"
                id="description"
                placeholder="Descripción de la categoría"
              />
            </div>
            <DialogFooter>
              <Button onClick={closeModal} variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit" style={{ color: "white" }}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoría</DialogTitle>
            <form
              ref={formRef}
              className="space-y-4"
              onSubmit={handleEditSubmit}
            >
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedCategoria?.name}
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={selectedCategoria?.description}
                  placeholder="Descripción de la categoría"
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={closeEditModal}
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit" style={{ color: "white" }}>
                  Guardar
                </Button>
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
