

"use client";
import { getCategorias } from '@/services/dashboard/categoriaService';
import { createContext, useState, ReactNode, useEffect } from 'react';

interface ProductContextType {
  categorys: any;
  setCategorys: React.Dispatch<React.SetStateAction<any>>;
}

export const CategoryContext = createContext<ProductContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categorys, setCategorys] = useState<any>([]);


  const getCategorys = async () => { 
    try {
      const response = await getCategorias();
      // console.log(response.data);
      setCategorys(response.data);
    } catch (error) {
      console.error(error);
    }
}
    useEffect(() => {
        getCategorys();
    }, []);


  return (
    <CategoryContext.Provider value={{ categorys, setCategorys }}>
      {children}
    </CategoryContext.Provider>
  );
};
