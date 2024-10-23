"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  unarchivedProduct,
} from "@/services/dashboard/productoService";
import { getCategorias } from "@/services/dashboard/categoriaService";
import { toast } from "sonner";

export default function ProductList() {
  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: {
      id: number;
      name: string;
    };
    // photos: {
    //   url: string;
    // }[];
    urlPhotos: string[];
    archived: boolean;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [archivedProducts, setArchivedProducts] = useState<Product[]>([]);
  const [isArchivedModalOpen, setIsArchivedModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts();
        const filteredProducts = response.data.filter(
          (product: Product) => !product.archived
        );
        setProducts(filteredProducts);
        // console.log("Products: ", response.data);
        // console.log("Products: ", filteredProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }
    async function fetchCategories() {
      try {
        const response = await getCategorias();
        const filteredCategorys = response.data.filter(
          (product: any) => !product.archived
        );
        setCategories(filteredCategorys);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    }
    fetchCategories();
    fetchProducts();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };
  const openArchivedModal = async () => {
    try {
      const response = await getProducts();
      const archived = response.data.filter(
        (product: Product) => product.archived
      );
      setArchivedProducts(archived);
      setIsArchivedModalOpen(true);
    } catch (error) {
      console.error("Error fetching archived products: ", error);
      toast.error("Error fetching archived products");
    }
  };
  const closeArchivedModal = () => {
    setIsArchivedModalOpen(false);
  };

  /* Crear producto */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const newFormData = new FormData();
      formData.forEach((value, key) => {
        if (key === "photos") {
          newFormData.append("photos", value);
        } else if (key === "category") {
          newFormData.append("categoryId", value as string);
        } else {
          newFormData.append(key, value as string);
        }
      });
      toast.loading("Creando producto...");
      try {
        await createProduct(newFormData);
        const response = await getProducts();
        const filteredProducts = response.data.filter(
          (product: Product) => !product.archived
        );
        console.log("Product to send: ", newFormData);
        setProducts(filteredProducts);
        toast.dismiss();
        toast.success("Producto creado correctamente");
        closeModal();
      } catch (error) {
        toast.dismiss();
        toast.error("Error creando el producto");
        console.error("Error creating product: ", error);
      }
    }
  };

  /* Editar producto */
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && selectedProduct) {
      const formData = new FormData(formRef.current);
      const newFormData = new FormData();
      formData.forEach((value, key) => {
        if (key === "photos") {
          newFormData.append("photos", value);
        } else if (key === "category") {
          newFormData.append("categoryId", value as string);
        } else {
          newFormData.append(key, value as string);
        }
      });
      toast.loading("Creando producto...");
      try {
        await updateProduct(selectedProduct.id, newFormData);
        const response = await getProducts();
        const filteredProducts = response.data.filter(
          (product: Product) => !product.archived
        );
        setProducts(filteredProducts);
        toast.dismiss();
        toast.success("Producto editado correctamente");
        closeEditModal();
      } catch (error) {
        toast.dismiss();
        toast.error("Error creando el producto");
        console.error("Error creating product: ", error);
      }
    }
  };

  /* Eliminar producto */
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      const response = await getProducts();
      const filteredProducts = response.data.filter(
        (product: Product) => !product.archived
      );
      setProducts(filteredProducts);
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast.error("Error eliminando el producto");
    }
  };

  /* Restaurar producto */
  const handleRestore = async (id: number) => {
    try {
      await unarchivedProduct(id);
      const response = await getProducts();
      const filteredProducts = response.data.filter(
        (product: Product) => !product.archived
      );
      setProducts(filteredProducts);
      const archived = response.data.filter(
        (product: Product) => product.archived
      );
      setArchivedProducts(archived);
      toast.success("Producto restaurado correctamente");
      closeArchivedModal();
    } catch (error) {
      console.error("Error restoring product: ", error);
      toast.error("Error restaurando el producto");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div>
          <Button
            onClick={openArchivedModal}
            className="bg-gray-800 mr-5 text-white"
          >
            Ver archivados
          </Button>
          <Button
            onClick={openModal}
            className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Añadir
          </Button>
        </div>
      </div>
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
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {product.category ? product.category.name : "No Category"}
              </TableCell>
              <TableCell>
                <div className="h-11 w-11 aspect-square">
                  <img src={product.urlPhotos[0]} alt={product.name}/>
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(product.id)}
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
            <DialogTitle>Añadir Nuevo Producto</DialogTitle>
          </DialogHeader>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="Nombre del producto" />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                name="description"
                placeholder="Descripción del producto"
              />
            </div>
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                placeholder="Precio del producto"
                type="number"
                min={0}
                step={0.01}
                /* TODO: En Firefox el type="number" no funciona como es esperado, directamente deshabilitar el botón */
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                placeholder="Stock del producto"
                type="number"
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select name="category">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="photos">Fotos</Label>
              <Input id="photos" name="photos" type="file" multiple />
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
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          <form ref={formRef} className="space-y-4" onSubmit={handleEditSubmit}>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                defaultValue={selectedProduct?.name}
                placeholder="Nombre del producto"
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                name="description"
                defaultValue={selectedProduct?.description}
                placeholder="Descripción del producto"
              />
            </div>
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                defaultValue={selectedProduct?.price}
                placeholder="Precio del producto"
                type="number"
                min={0}
                step={0.01}
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                defaultValue={selectedProduct?.stock}
                placeholder="Stock del producto"
                type="number"
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select
                name="category"
                defaultValue={selectedProduct?.category.id?.toString()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="photos">Fotos</Label>
              <Input id="photos" name="photos" type="file" multiple />
            </div>
            <DialogFooter>
              <Button onClick={closeEditModal} variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit" style={{ color: "white" }}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isArchivedModalOpen} onOpenChange={setIsArchivedModalOpen}>
        <DialogContent className="custom-width">
          <DialogHeader>
            <DialogTitle>Productos Archivados</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Revertir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archivedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.category ? product.category.name : "No Category"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-success"
                      onClick={() => handleRestore(product.id)}
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
                      <span className="sr-only">Revertir</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button onClick={closeArchivedModal} variant="outline">
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
