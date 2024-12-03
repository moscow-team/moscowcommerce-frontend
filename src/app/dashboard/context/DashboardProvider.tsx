"use client";
import { ChartConfig } from '@/components/ui/chart';
import { getOrders } from '@/services/OrderService';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { set } from 'react-hook-form';

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
    chartData: any;
    chartConfig: ChartConfig;
    salesAmount: Sales;
    chartConfig2: ChartConfig;
    pieChartData: any;
    pieChartData2: any;
    orders: any;
    barsConfig: any;
}
const categoryColors = {
    Mates: "var(--color-mates)",
    Yerbas: "var(--color-yerbas)",
    Bombillas: "var(--color-bombillas)",
    Materas: "var(--color-materas)",
    Termos: "var(--color-termos)",
};

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
interface SelectedFile {
    file: File;
    previewUrl: string;
}

type Sales = {
    amount: number;
    monthlyAmount: number;
    totalAmount?: number;
}
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [archivedProducts, setArchivedProducts] = useState<any>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [salesAmount, setSalesAmount] = useState({
        amount: 0,
        monthlyAmount: 0,
    });
    const [chartData, setChartData] = useState<any>([]);
    const [pieChartData, setPieChartData] = useState<any>([]);
    const [pieChartData2, setPieChartData2] = useState<any>([]);
    const [orders, setOrders] = useState<any>([]);
    const [chartConfig, setChartConfig] = useState<any>({}); // Inicializar como estado
    const [chartConfig2, setChartConfig2] = useState<any>({}); // Inicializar como estado
    const [barsConfig, setBarsConfig] = useState([]);

    const fetchSales = async () => {
        const response = await getOrders();
        const orders = response.data;
        setOrders(orders);
    
        // Obtener las categorías dinámicamente desde las órdenes
        const getCategories = () => {
            const allCategories = new Set();
            orders.forEach((sale) =>
                sale.products.forEach((product) => allCategories.add(product.category.name.toLowerCase()))
            );
            return Array.from(allCategories);
        };
    
        // Inicialización de los meses
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
    
        // Función para calcular ventas por categoría
        const calculateCategorySales = (categoryName) => {
            return orders.reduce((total, sale) => {
                const categorySales = sale.products
                    .filter((product) => product.category.name.toLowerCase() === categoryName.toLowerCase())
                    .reduce((categoryTotal, product) => categoryTotal + product.price, 0);
    
                return total + categorySales;
            }, 0);
        };
    
        // Generar las ventas mensuales por categoría
        const monthlySales = orders.reduce((acc, sale) => {
            const saleDate = new Date(sale.createtime);
            const month = months[saleDate.getMonth()]; // Obtener el nombre del mes
    
            // Inicializar el mes si no existe
            if (!acc[month]) {
                acc[month] = { month };
                // Inicializar las categorías con valor 0
                getCategories().forEach((category) => {
                    acc[month][category] = 0;
                });
            }
    
            // Sumar las cantidades por categoría
            sale.products.forEach((product) => {
                const category = product.category.name.toLowerCase(); // Nombre de la categoría
                acc[month][category] = (acc[month][category] || 0) + 1; // Incrementar por cada producto vendido
            });
    
            return acc;
        }, {});
    
        // Transformar la información a la estructura necesaria para el gráfico
        const chartData = Object.values(monthlySales);
        console.log("Chart Data:", chartData); // Verifica los datos generados
    
        // Verificar si los datos tienen el formato correcto antes de actualizarlos
        if (Array.isArray(chartData) && chartData.length > 0) {
            setChartData(chartData); // Actualiza el estado con los datos
        } else {
            console.error("chartData tiene un formato incorrecto o está vacío");
        }
    
        // Generar la configuración dinámica para el gráfico principal
        const generateChartConfig = (categories) => {
            return categories.reduce((config, category, index) => {
                config[category] = {
                    label: category.charAt(0).toUpperCase() + category.slice(1),
                    color: `hsl(var(--chart-${index + 1}))`, // Genera un color dinámico
                };
                return config;
            }, {});
        };
    
        // Generar la configuración extendida con "Ventas"
        const generateChartConfig2 = (categories) => {
            const baseConfig = {
                sales: {
                    label: "Ventas",
                },
            };
            const dynamicConfig = generateChartConfig(categories);
            return { ...baseConfig, ...dynamicConfig };
        };
    
        const categories = getCategories();
    
        // Configuración de los estados dinámicos
        const dynamicChartConfig = generateChartConfig(categories);
        const dynamicChartConfig2 = generateChartConfig2(categories);
    
        setChartConfig(dynamicChartConfig);
    
        // Generar datos para el gráfico de torta
        const chartData3 = categories.map((category) => {
            const salesCount = calculateCategorySales(category);
            console.log(`Sales count for category ${category}:`, salesCount); // Verifica los datos calculados
            return {
                category,
                sales: salesCount,
                fill: dynamicChartConfig[category].color,
            };
        });
    
        console.log("Chart Data 3:", chartData3); // Verifica los datos generados
    
        // Verifica si los datos tienen el formato correcto antes de actualizarlos
        if (Array.isArray(chartData3) && chartData3.length > 0) {
            setPieChartData(chartData3); // Actualiza el estado con los datos
        } else {
            console.error("chartData3 tiene un formato incorrecto o está vacío");
        }
    
        // Calcular monto total de ventas del mes actual y anual
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
    
        const totalSalesLastMonth = orders
            .filter((sale) => {
                const saleDate = new Date(sale.createtime);
                return (
                    saleDate.getMonth() === currentMonth &&
                    saleDate.getFullYear() === currentYear
                );
            })
            .reduce((total, sale) => {
                const saleTotal = sale.products.reduce((saleSum, product) => saleSum + product.price, 0);
                return total + saleTotal;
            }, 0);
    
        const totalSalesAnnual = orders
            .filter((sale) => {
                const saleDate = new Date(sale.createtime);
                return saleDate.getFullYear() === currentYear;
            })
            .reduce((total, sale) => {
                const saleTotal = sale.products.reduce((saleSum, product) => saleSum + product.price, 0);
                return total + saleTotal;
            }, 0);
    
        // Generar datos anuales para el gráfico de torta
        const calculateAnnualCategorySales = (categoryName) => {
            return orders
                .filter((sale) => {
                    const saleDate = new Date(sale.createtime);
                    return saleDate.getFullYear() === currentYear;
                })
                .reduce((total, sale) => {
                    const categorySales = sale.products
                        .filter((product) => product.category.name.toLowerCase() === categoryName.toLowerCase())
                        .reduce((categoryTotal) => categoryTotal + 1, 0);
    
                    return total + categorySales;
                }, 0);
        };
    
        const annualChartData = categories.map((category) => ({
            category,
            sales: calculateAnnualCategorySales(category),
            fill: dynamicChartConfig[category].color,
        }));
    
        // Actualizar estados
        setChartConfig2(dynamicChartConfig2);
        setPieChartData2(annualChartData);
        setSalesAmount({
            amount: totalSalesAnnual,
            monthlyAmount: totalSalesLastMonth,
        });
    };
    
        useEffect(() => {
            fetchSales();
        }, []);

        
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
                    chartData,
                    chartConfig,
                    salesAmount,
                    chartConfig2,
                    pieChartData,
                    pieChartData2,
                    orders,
                    barsConfig
                }}>
                {children}
            </DashboardContext.Provider>
        );
    };
