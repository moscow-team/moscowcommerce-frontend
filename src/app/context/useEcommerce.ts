import { useContext } from "react";
import { EcommerceContext } from "./EcommerceProvider";

export const useEcommerce = () => {
    const context = useContext(EcommerceContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    const { products, categories, setCategories, setProducts } = context; 

    return { products, categories, setCategories, setProducts };
}