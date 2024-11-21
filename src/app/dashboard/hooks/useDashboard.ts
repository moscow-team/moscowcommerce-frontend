"use client";
import { EcommerceContext } from "@/app/context/EcommerceProvider";
import {
  createProduct,
  deleteProduct,
  getProducts,
  unarchivedProduct,
  updateProduct,
} from "@/services/dashboard/productoService";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardContext } from "../context/DashboardProvider";
import { Product } from "@/interfaces/Product";
import { PDFService } from "@/services/PDFService";

export const useDashboard = () => {
  const context = useContext(EcommerceContext);
  const dashboardContext = useContext(DashboardContext);

  // Sincroniza filteredProducts solo la primera vez que se cargan los productos

  if (context === undefined) {
    throw new Error("useDashboard must be used within a EcommerceContext");
  }
  if (dashboardContext === undefined) {
    throw new Error("useDashboard must be used within a DashboardContext");
  }
  const { categories, products, setProducts } = context;
  const {
    archivedProducts,
    setArchivedProducts,
    selectedProduct,
    setSelectedProduct,
    setFilteredProducts,
    filteredProducts,
    photosToDelete,
    setPhotosToDelete,
    imagePreviews,
    setImagePreviews,
    selectedFiles,
    setSelectedFiles
  } = dashboardContext;
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const saveProduct = async (product: any) => {
    toast.loading("Creando producto...");
    try {
      const response = await createProduct(product);
      if (response.success) {
        toast.dismiss();
        toast.success("Producto creado correctamente");
        setProducts([...products, response.data]);
        setFilteredProducts([...filteredProducts, response.data]);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error creando el producto");
    }
  };

  const editProduct = async (id: number, form: any) => {
    toast.loading("Editando producto...");
    try {
      const response = await updateProduct(id, form);
      if (response.success) {
        toast.dismiss();
        toast.success("Producto editado correctamente");
        const updatedProducts = products.filter(
          (product: any) => product.id !== id
        );
        const updatedFilteredProducts = products.filter(
          (product: any) => product.id !== id
        );
        setProducts([...updatedProducts, response.data]);
        setFilteredProducts([...updatedFilteredProducts, response.data]);
      } else {
        toast.dismiss();
        toast.error(response.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error editando el producto");
      console.error("Error editing product: ", error);
    }
  };
  // const filterByName = (name: string) => {
  //   const filters: any = {};
  //   const operators: any = {};
  //   if (name) {
  //     filters.name = name;
  //     operators.name = "LIKE";
  //   }
  //   return { filters, operators };
  // };

  const removeProduct = async (id: number) => {
    toast.loading("Eliminando producto...");
    try {
      const response = await deleteProduct(id);
      if (response.success) {
        const updatedProducts = products.filter(
          (product: any) => product.id !== id
        );
        const updatedFilteredProducts = filteredProducts.filter(
          (product: any) => product.id !== id
        );
        setProducts(updatedProducts);
        setFilteredProducts([...updatedFilteredProducts]);
        toast.dismiss();
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast.dismiss();
      toast.error("Error eliminando el producto");
    }
  };

  const [form, setForm] = useState({
    nameInput: "",
    categorySelect: "",
    minPriceInput: "",
    maxPriceInput: "",
  });

  const handleFormChange = (id: string, e: any) => {
    setForm({ ...form, [id]: e.target ? e.target.value : e });
  };

  const filterProducts = async () => {
    // try {
    //   const nameInput = document.getElementById("search") as HTMLInputElement;
    //   const categorySelect = document.querySelector(
    //     "[name='filterCategory']"
    //   ) as HTMLSelectElement;
    //   const minPriceInput = document.querySelector(
    //     "#filterByPriceRange[placeholder='Precio mínimo']"
    //   ) as HTMLInputElement;
    //   const maxPriceInput = document.querySelector(
    //     "#filterByPriceRange[placeholder='Precio máximo']"
    //   ) as HTMLInputElement;

    //   let filters: any = {};
    //   let operators: any = {};

    //   if (nameInput && nameInput.value) {
    //     const { filters: nameFilters, operators: nameOperators } = filterByName(
    //       nameInput.value
    //     );
    //     filters = { ...filters, ...nameFilters };
    //     operators = { ...operators, ...nameOperators };
    //   }

    //   // if (categorySelect && categorySelect.value) {
    //   //   const { filters: categoryFilters, operators: categoryOperators } =
    //   //     filterByCategory(categorySelect.value);
    //   //   filters = { ...filters, ...categoryFilters };
    //   //   operators = { ...operators, ...categoryOperators };
    //   // }

    //   /*
    //       if (minPriceInput && minPriceInput.value || maxPriceInput && maxPriceInput.value) {
    //         const { filters: priceFilters, operators: priceOperators } = filterByPriceRange(minPriceInput.value, maxPriceInput.value);
    //         filters = { ...filters, ...priceFilters };
    //         operators = { ...operators, ...priceOperators };
    //       }
    //         */

    //   console.log("Filtros:", filters);
    //   console.log("Operadores:", operators);

    //   const response = await getProductsByFilters(filters, operators);
    //   setProducts(response.data);
    // } catch (error) {
    //   console.error("Error filtering products: ", error);
    //   toast.error("Error filtrando productos");
    // }

    const filtered = filteredProducts.filter((product: any) => {
      const nameMatch = form.nameInput
        ? product.name.toLowerCase().includes(form.nameInput.toLowerCase())
        : true;
      const categoryMatch = form.categorySelect
        ? product.category.id === parseInt(form.categorySelect)
        : true;
      const minPriceMatch = form.minPriceInput
        ? product.price >= form.minPriceInput
        : true;
      const maxPriceMatch = form.maxPriceInput
        ? product.price <= form.maxPriceInput
        : true;
      return nameMatch && categoryMatch && minPriceMatch && maxPriceMatch;
    });
    toast.success("Productos filtrados");
    setFilteredProducts(filtered);
  };

  const fetchArchivedProducts = async () => {
    toast.loading("Buscando productos...");
    try {
      const response = await getProducts();
      if (response.success) {
        const archived = response.data.filter(
          (product: Product) => product.archived
        );
        setArchivedProducts(archived);
        toast.dismiss();
        toast.success(response.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error eliminando el producto");
    }
  };

  const filterProductsCriteria = (filters: any, operators: any) => {
    console.log(form);
  };

  const handleRestore = async (id: number) => {
    try {
      const response = await unarchivedProduct(id);
      if (response.success) {
        const updatedProducts = archivedProducts.filter(
          (product: any) => product.id !== id
        );
        setProducts([...products, response.data]);
        setArchivedProducts(updatedProducts);
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error restoring product: ", error);
      toast.error("Error restaurando el producto");
    }
  };

  const resetForm = () => {
    setForm({ nameInput: "", categorySelect: "", minPriceInput: "", maxPriceInput: "" });
  }
  const resetFilter = () => {
    setFilteredProducts(products);
  }

  const printInventoryReport = async () => {
    await PDFService.printStockProduct(products, "Lista de Productos");	
  }
  const printLowStockReport = async () => {
    const lowStock = products.filter((product: any) => product.stock < 5);
    await PDFService.printStockProduct(lowStock, "Lista de Productos con poco stock");	
  }

  return {
    categories,
    products,
    saveProduct,
    editProduct,
    setSelectedProduct,
    selectedProduct,
    photosToDelete,
    setPhotosToDelete,
    filterProducts,
    removeProduct,
    fetchArchivedProducts,
    archivedProducts,
    handleRestore,
    form,
    handleFormChange,
    filteredProducts,
    imagePreviews,
    setImagePreviews,
    selectedFiles,
    setSelectedFiles,
    resetFilter,
    resetForm,
    printInventoryReport,
    printLowStockReport
  };
};
