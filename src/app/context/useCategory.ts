import { useContext } from "react";
import { EcommerceContext } from "./EcommerceProvider";

export const useCategory = () => {
    const context = useContext(EcommerceContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    const { categories, setCategories } = context; 

    // const fetchCategories = async () => {
    //     try {
    //         const response = await getCategorias();
    //         const filtered = response.data
    //     .map((category: Categoria) => ({
    //       ...category,
    //       photo: `/images/${category.name.toLowerCase()}.png`,
    //     }))
    //     .filter((category: Categoria) => category.archived === false);
    //         setCategories(filtered);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const getCategoryById = async (id: number) => {
        const category = categories.find((category: any) => category.id === id);
        return category
    }
    
    return { categories, setCategories, getCategoryById };
}