import { useCategory } from "@/app/context/useCategory";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDashboard } from "../../hooks/useDashboard";

interface SelectedFile {
  file: File;
  previewUrl: string;
}

export function EditProductModal({ open, onOpenChange, closeModal }: {
  open: boolean, onOpenChange: any, closeModal: any
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { categories } = useCategory();
  const { selectedProduct, setPhotosToDelete, photosToDelete, editProduct } = useDashboard();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && selectedProduct) {
      const formData = new FormData(formRef.current);
      const newFormData = new FormData();

      // Agregar fotos existentes al nuevo FormData
      selectedProduct.urlPhotos.forEach((url: string) => {
        newFormData.append("existingPhotos", url);
      });

      // Añadir todas las fotos del estado `selectedFiles` al FormData
      selectedFiles.forEach(({ file }) => {
        newFormData.append("photos", file);
      });

      // Agregar otros campos, evitando agregar "photos" nuevamente
      formData.forEach((value, key) => {
        if (key === "category") {
          newFormData.append("categoryId", value as string);
        } else if (key !== "photos") {
          newFormData.append(key, value as string);
        }
      });

      // Agregar las fotos a eliminar al formData para enviar al backend
      if (photosToDelete.length > 0) {
        photosToDelete.forEach((url) => {
          newFormData.append("photosToDelete", url);
        });
      }
      await editProduct(selectedProduct.id, newFormData);
    // DEUDA TECNICA: No se recarga la página al cerrar el modal de edición (no se actualiza la tabla)
      window.location.reload();
      closeModal();
    }
  };

  const handleDeleteImage = (url: string) => {
    setImagePreviews((prev) => prev.filter((imageUrl) => imageUrl !== url));

    // Si es una foto existente, agregar la foto a la lista de fotos a eliminar
    if (selectedProduct?.urlPhotos.includes(url)) {
      setPhotosToDelete((prev) => [...prev, url]);
    } else {
      // Si es una foto nueva, localizar el archivo correspondiente y eliminarlo de `selectedFiles`
      setSelectedFiles((prevFiles) => prevFiles.filter((item) => item.previewUrl !== url));
    }

    const input = document.getElementById("photos") as HTMLInputElement;
    if (input && input.files) {

      // Usar URL.createObjectURL para verificar si la URL coincide
      const filteredFiles = Array.from(input.files).filter(
        (file) => URL.createObjectURL(file) !== url
      );

      // Crear un nuevo DataTransfer y agregar los archivos filtrados
      const dataTransfer = new DataTransfer();
      filteredFiles.forEach((file) => dataTransfer.items.add(file));

      // Asignar los archivos filtrados de nuevo al input
      input.files = dataTransfer.files;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.files) {
      // Comprobar el total de imágenes actuales más las nuevas
      const totalImages = imagePreviews.length + target.files.length;
      if (totalImages > 5) {
        toast.error("Solo puedes subir un máximo de 5 imágenes en total");
        target.value = ""; // Limpiar el input de archivo si se excede el límite
        return;
      }

      // Convertir los archivos a objetos SelectedFile
      const newFiles = Array.from(target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // Actualizar las URLs de previsualización
      const newPreviews = newFiles.map((item) => item.previewUrl);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  useEffect(() => { 
    if (selectedProduct) {
      setImagePreviews(selectedProduct.urlPhotos);
    }
  }, [selectedProduct]);


  useEffect(() => {
    setSelectedFiles([]);
    setImagePreviews([]);
}, []);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
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
                  {categories.map((category: { id: number; name: string }) => (
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
                    type="button"
                    className="delete-icon"
                    onClick={() => handleDeleteImage(src)}
                  >
                    &times;
                  </button>
                </div>
              ))
              : null}
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
  )
}