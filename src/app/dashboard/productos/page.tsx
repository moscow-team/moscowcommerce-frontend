"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
  getProductsByFilters,
} from "@/services/dashboard/productoService";
import { getCategorias } from "@/services/dashboard/categoriaService";
import { toast } from "sonner";
import { Search } from "lucide-react";

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
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
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

  // const openModal = () => setIsModalOpen(true);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setImagePreviews([]);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setImagePreviews([]);
  }, []);

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    console.log(product);
    setImagePreviews(product.urlPhotos);
    setIsEditModalOpen(true);
  };

  const closeEditModal = useCallback(() => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
    setImagePreviews([]);
  }, []);

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
      // console.log("Product to send: ", newFormData);
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

      // Agregar fotos existentes al nuevo FormData
      selectedProduct.urlPhotos.forEach((url) => {
        newFormData.append("existingPhotos", url);
      });
      
      console.log("Existing photos to add: ", selectedProduct.urlPhotos); // Verifica las fotos existentes

      // Agregar nuevas fotos
      if (formData.getAll("photos").length > 0) {
        const newPhotos = formData.getAll("photos");
        newPhotos.forEach((photo) => {
            newFormData.append("photos", photo);
        });
        console.log("New photos to add: ", newPhotos); // Verifica las nuevas fotos
      }

      // Agregar otros campos, evitando agregar "photos" nuevamente
      formData.forEach((value, key) => {
        if (key === "category") {
          newFormData.append("categoryId", value as string);
        } else if (key !== "photos") {
          newFormData.append(key, value as string);
        }
      });

      console.log("Previous product: ", selectedProduct);
      
      // Muestra el contenido del nuevo FormData
      console.log("FormData before submission: ");
      newFormData.forEach((value, key) => {
          console.log(key, value);
      })

      toast.loading("Editando producto...");
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
        toast.error("Error editando el producto");
        console.error("Error editing product: ", error);
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

  /* Previsualizador de Imagenes */
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 5) {
      toast.error("Solo se puede subir un máximo de 5 archivos");
      target.value = "";
      return;
    }

    if (target.files) {
      const filesArray = Array.from(target.files);
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...imageUrls]);
    }
  };
  const handleDeleteImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    const input = document.getElementById("photos") as HTMLInputElement;
    if (input && input.files) {
      const dataTransfer = new DataTransfer();
      Array.from(input.files)
        .filter((_, i) => i !== index)
        .forEach((file) => dataTransfer.items.add(file));
      input.files = dataTransfer.files;
    }
  };

  /* Filtros */
  const openFilterModal = () => {
    setIsModalFilterOpen(true);
  };
  const filterByName = (name: string) => {
    const filters: any = {};
    const operators: any = {};
    if (name) {
      filters.name = name;
      operators.name = "LIKE";
    }
    return { filters, operators };
  };
  
  /* -> Cambios: ver el console.log del servicio, no se envían los parametros
  const filterByCategory = (categoryId: string) => {
    const filters: any = {};
    const operators: any = {};
    if (categoryId) {
      filters["category.id"] = categoryId;
      operators["category.id"] = "==";
    }
    return { filters, operators };
  };
  */
  
  /* -> Cambios: no existe minPrice ni maxPrice, solo price
  const filterByPriceRange = (minPrice: string, maxPrice: string) => {
    const filters: any = {};
    const operators: any = {};
    if (minPrice) {
      filters.minPrice = parseFloat(minPrice);
      operators.minPrice = ">=";
    }
    if (maxPrice) {
      filters.maxPrice = parseFloat(maxPrice);
      operators.maxPrice = "<=";
    }
    return { filters, operators };
  };
  */
  
  const filterProducts = async () => {
    try {
      const nameInput = document.getElementById("search") as HTMLInputElement;
      const categorySelect = document.querySelector("[name='filterCategory']") as HTMLSelectElement;
      const minPriceInput = document.querySelector("#filterByPriceRange[placeholder='Precio mínimo']") as HTMLInputElement;
      const maxPriceInput = document.querySelector("#filterByPriceRange[placeholder='Precio máximo']") as HTMLInputElement;
  
      let filters: any = {};
      let operators: any = {};
  
      if (nameInput && nameInput.value) {
        const { filters: nameFilters, operators: nameOperators } = filterByName(nameInput.value);
        filters = { ...filters, ...nameFilters };
        operators = { ...operators, ...nameOperators };
      }
      /*
      if (categorySelect && categorySelect.value) {
        const { filters: categoryFilters, operators: categoryOperators } = filterByCategory(categorySelect.value);
        filters = { ...filters, ...categoryFilters };
        operators = { ...operators, ...categoryOperators };
      }
      if (minPriceInput && minPriceInput.value || maxPriceInput && maxPriceInput.value) {
        const { filters: priceFilters, operators: priceOperators } = filterByPriceRange(minPriceInput.value, maxPriceInput.value);
        filters = { ...filters, ...priceFilters };
        operators = { ...operators, ...priceOperators };
      }
        */
  
      console.log("Filtros:", filters);
      console.log("Operadores:", operators);
  
      const response = await getProductsByFilters(filters, operators);
      setProducts(response.data);
      setIsModalFilterOpen(false);
    } catch (error) {
      console.error("Error filtering products: ", error);
      toast.error("Error filtrando productos");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div className="flex gap-2">
          <Button onClick={openFilterModal} className="bg-gray-800 text-white">
            <Search size={16} className="mr-2" />
            Filtrar
          </Button>
          <Button
            onClick={openArchivedModal}
            className="bg-gray-800 text-white"
          >
            Ver archivados
          </Button>
          <Button
            onClick={openModal}
            className="bg-blue-950 hover:bg-blue-800 text-white font-bold rounded"
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
              <TableCell>
                {product.description.length > 75
                  ? `${product.description.substring(0, 75)}...`
                  : product.description}
              </TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {product.category ? product.category.name : "No Category"}
              </TableCell>
              <TableCell>
                <div className="h-11 w-11 aspect-square">
                  <img src={product.urlPhotos[0]} alt={product.name} />
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
        <DialogContent aria-describedby={undefined}>
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
              <Input
                id="photos"
                name="photos"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </div>
            <div>
              {/* Previsualizador de Imagenes */}
              {imagePreviews.map((src, index) => (
                <div key={index} className="image-preview-container">
                  <img
                    src={src}
                    alt={`preview ${index}`}
                    className="image-preview"
                  />
                  <button
                    className="delete-icon"
                    onClick={() => handleDeleteImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
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
        <DialogContent aria-describedby={undefined}>
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
              <Input
                id="photos"
                name="photos"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </div>
            <div>
              {selectedProduct?.urlPhotos
                ? imagePreviews.map((src: string, index: number) => (
                    <div key={index} className="image-preview-container">
                      <img
                        src={src}
                        alt={`preview ${index}`}
                        className="image-preview"
                      />
                      <button
                        className="delete-icon"
                        onClick={() => handleDeleteImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))
                : null}
            </div>
            <DialogFooter>
              <Button onClick={closeEditModal} variant="outline" type="submit">
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
            <DialogDescription>
              En esta vista puedes deshacer la acción de archivar un producto.
            </DialogDescription>
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
      <Dialog open={isModalFilterOpen} onOpenChange={setIsModalFilterOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Filtros</DialogTitle>
          </DialogHeader>

          <div>
            <Label htmlFor="search">Buscar por nombre</Label>
            <div className="relative">
              <Input
                type="search"
                id="search"
                placeholder="Introduce el nombre del producto"
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="filterCategory">Buscar por categoría</Label>
            <Select name="filterCategory" disabled>
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
            <Label htmlFor="filterByPriceRange">Buscar por precio</Label>
            <div className="flex gap-4">
              <Input
                id="filterByPriceRange"
                type="number"
                placeholder="Precio mínimo"
                disabled
              />
              <Input
                id="filterByPriceRange"
                type="number"
                placeholder="Precio máximo"
                disabled
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={filterProducts} type="submit">
              Aplicar
            </Button>
            <Button
              onClick={() => setIsModalFilterOpen(false)}
              variant="outline"
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
