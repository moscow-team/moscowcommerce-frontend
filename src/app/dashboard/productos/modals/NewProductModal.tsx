import { useCategory } from "@/app/context/useCategory";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useDashboard } from "../../hooks/useDashboard";

export function NewProductModal({ open, onOpenChange, closeModal }: {
    open: boolean, onOpenChange: any, closeModal: any
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const { categories } = useCategory();
    const { saveProduct } = useDashboard();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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

            await saveProduct(newFormData);
            closeModal();
        }
    };
    const handleDeleteImage = (url: string) => {
        setImagePreviews((prev) => prev.filter((imageUrl) => imageUrl !== url));

        // // Agregar la foto eliminada a la lista de fotos a eliminar
        // if (selectedProduct?.urlPhotos.includes(url)) {
        //     setPhotosToDelete((prev) => [...prev, url]);
        // }

        const input = document.getElementById("photos") as HTMLInputElement;
        if (input && input.files) {
            const filesArray = Array.from(input.files);

            // Usar URL.createObjectURL para verificar si la URL coincide
            const filteredFiles = filesArray.filter((file) => {
                const fileURL = URL.createObjectURL(file);
                return fileURL !== url; // Comparar con la URL de previsualización
            });

            // Crear un nuevo DataTransfer y agregar los archivos filtrados
            const dataTransfer = new DataTransfer();
            filteredFiles.forEach((file) => dataTransfer.items.add(file));

            // Asignar los archivos filtrados de nuevo al input
            input.files = dataTransfer.files;
        }
    };
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                                    type="button"
                                    className="delete-icon"
                                    onClick={() => handleDeleteImage(src)}
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
    )
}