"use client";
import { createContext, useState, ReactNode } from 'react';

interface DashboardContextType {
    archivedProducts: any;
    setArchivedProducts: React.Dispatch<React.SetStateAction<any>>;
    selectedProduct: any;
    setSelectedProduct: React.Dispatch<React.SetStateAction<any>>;
    filteredProducts: any;
    setFilteredProducts: React.Dispatch<React.SetStateAction<any>>;
    photosToDelete: any;
    setPhotosToDelete: React.Dispatch<React.SetStateAction<any>>;
    imagePreviews: any;
    setImagePreviews: React.Dispatch<React.SetStateAction<any>>;
    selectedFiles: any;
    setSelectedFiles: React.Dispatch<React.SetStateAction<any>>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
interface SelectedFile {
    file: File;
    previewUrl: string;
}
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [archivedProducts, setArchivedProducts] = useState<any>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    return (
        <DashboardContext.Provider
            value={{
                archivedProducts,
                setArchivedProducts,
                selectedProduct,
                setSelectedProduct,
                filteredProducts,
                setFilteredProducts,
                photosToDelete,
                setPhotosToDelete,
                imagePreviews,
                setImagePreviews,
                selectedFiles,
                setSelectedFiles,
            }}>
            {children}
        </DashboardContext.Provider>
    );
};
