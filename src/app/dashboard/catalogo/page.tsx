// app/dashboard/catalogo/page.tsx
"use client";
// export const metadata = {
//   title: "Catálogo - Moskow Commerce",
//   description: "Admin Panel",
// };
import { useState } from "react";
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

export default function ProductList() {
  /*
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false, columnDefinition = "DATE", updatable = false)
    private LocalDate creationDate;

    @Column(nullable = true, columnDefinition = "DATE")
    private LocalDate modificationDate;

    @Column(nullable = true, columnDefinition = "DATE")
    private LocalDate archivedDate;
  */

  const [isModalOpen, setIsModalOpen] = useState(false);
  // TODO: Se debe tener la lógica para cargar los datos
  const products = [
    {
      id: 1,
      name: "Mates",
      description: "Test descripción",
      creationDate: "2022-01-01",
      modificationDate: "2022-01-02",
      archivedDate: "-",
    },
    {
      id: 2,
      name: "Bombillas",
      description: "Test descripción",
      creationDate: "2022-01-01",
      modificationDate: "-",
      archivedDate: "-",
    },
  ];
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categoría</h1>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.creationDate}</TableCell>
              <TableCell>{product.modificationDate}</TableCell>
              <TableCell>{product.archivedDate}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon">
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
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
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Nombre del producto" />
            </div>
            <div>
              <Label htmlFor="category">Descripción</Label>
              <Input id="category" placeholder="Categoría del producto" />
            </div>
          </form>
          <DialogFooter>
            <Button onClick={closeModal} variant="outline">
              Cancelar
            </Button>
            <Button onClick={closeModal} style={{ color: "white" }}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
