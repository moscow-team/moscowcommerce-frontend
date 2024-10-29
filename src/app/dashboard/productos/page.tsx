"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import { NewProductModal } from "./modals/NewProductModal";
import { EditProductModal } from "./modals/EditProductModal";
import { FilterModal } from "./modals/FilterModal";
import { ArchivedProductModal } from "./modals/ArchivedProductModal";
import ProductTable from "./tables/ProductTable";
import { Product } from "@/interfaces/Product";

interface SelectedFile {
  file: File;
  previewUrl: string;
}

export default function ProductList() {
  const { setSelectedProduct, setPhotosToDelete, fetchArchivedProducts } = useDashboard()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchivedModalOpen, setIsArchivedModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setImagePreviews([]);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setImagePreviews([]);
    setPhotosToDelete([]);
    setSelectedFiles([]);
  }, []);

  const openEditModal = (product: Product) => {
    console.log(product);
    setSelectedProduct(product);
    setImagePreviews(product.urlPhotos);
    setIsEditModalOpen(true);
  };

  const closeEditModal = useCallback(() => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
    setImagePreviews([]);
    setPhotosToDelete([]);
    setSelectedFiles([]);
  }, []);

  const openArchivedModal = async () => {
    await fetchArchivedProducts()
    setIsArchivedModalOpen(true);
  };
  const closeArchivedModal = () => {
    setIsArchivedModalOpen(false);
  };
  const closefilterModal = () => {
    setIsModalFilterOpen(false);
  };

  /* Filtros */
  const openFilterModal = () => {
    setIsModalFilterOpen(true);
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

;

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
      <ProductTable openEditModal={openEditModal}></ProductTable>
      <NewProductModal open={isModalOpen} onOpenChange={setIsModalOpen} closeModal={closeModal}></NewProductModal>
      <EditProductModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} closeModal={closeEditModal}></EditProductModal>
      <ArchivedProductModal open={isArchivedModalOpen} onOpenChange={setIsArchivedModalOpen} closeModal={closeArchivedModal}></ArchivedProductModal>
      <FilterModal open={isModalFilterOpen} onOpenChange={setIsModalFilterOpen} closeModal={closefilterModal}></FilterModal>
    </div>
  );
}
