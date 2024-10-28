"use client";
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface DashboardContextType {
    archivedProducts: any;
    setArchivedProducts: React.Dispatch<React.SetStateAction<any>>;
    selectedProduct: any;
    setSelectedProduct: React.Dispatch<React.SetStateAction<any>>;
    filteredProducts: any;
    setFilteredProducts: React.Dispatch<React.SetStateAction<any>>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [archivedProducts, setArchivedProducts] = useState<any>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [filteredProducts, setFilteredProducts] = useState([]);

    return (
        <DashboardContext.Provider 
        value={{ 
            archivedProducts,
            setArchivedProducts,
            selectedProduct,
            setSelectedProduct,
            filteredProducts,
            setFilteredProducts
            }}>
            {children}
        </DashboardContext.Provider>
    );
};
