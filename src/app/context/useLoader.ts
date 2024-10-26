import { useContext } from "react";
import { EcommerceContext } from "./EcommerceProvider";

export const useLoader = () => {
    const context = useContext(EcommerceContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    const { isLoading } = context; 


    return { isLoading };
}