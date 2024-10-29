import { useDashboard } from "../../hooks/useDashboard";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
export default function ProductTable({
  openEditModal,
}: {
  openEditModal: any;
}) {
  const { removeProduct, filteredProducts } = useDashboard();
  const handleDelete = async (id: number) => {
    await removeProduct(id);
  };
  return (
    <Table className="bg-white rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Fotos</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              {product.description.length > 35
                ? `${product.description.substring(0, 35)}...`
                : product.description}
            </TableCell>
            <TableCell>${product.price.toLocaleString("es")}</TableCell>
            <TableCell>
              <Badge variant={`default`}>{product.stock}</Badge>
            </TableCell>
            <TableCell>
              {product.category ? product.category.name : "No Category"}
            </TableCell>
            <TableCell>
              <div className="h-12 w-12 aspect-square">
                {product.urlPhotos.length != 0 ? (<Carousel className="w-full max-w-sm">
                  <CarouselContent>
                    {product.urlPhotos.map((image: any, index: any) => (
                      <CarouselItem key={index}>
                        <Card>
                          <img src={image} alt={product.name} className="aspect-square object-contain"/>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>) : null}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openEditModal(product)}
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
                <AlertDialog>
                  <AlertDialogTrigger asChild className="bg-red">
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
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Estás seguro que quieres eliminar el producto?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(product.id)}>
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
