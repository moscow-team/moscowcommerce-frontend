import { useContext } from "react";
import { CategoryContext } from "../context/CategoryProvider";

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    const { categorys, setCategorys } = context; 

    return { categorys, setCategorys };
}