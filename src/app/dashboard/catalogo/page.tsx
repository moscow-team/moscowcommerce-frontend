// app/dashboard/catalogo/page.tsx

export const metadata = {
  title: "Catálogo - Moskow Commerce",
  description: "Admin Panel",
};
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

  // TODO: Se debe tener la lógica para cargar los datos
  const products = [
    { id: 1, name: "Mates", description: "Test descripción", creationDate: "2022-01-01", modificationDate: "2022-01-02", archivedDate: "-" },
    { id: 2, name: "Bombillas", description: "Test descripción", creationDate: "2022-01-01", modificationDate: "-", archivedDate: "-" },
  ]

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catálogo</h1>
        <Button className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Añadir</Button>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}