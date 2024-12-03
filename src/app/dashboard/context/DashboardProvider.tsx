"use client";
import { ChartConfig } from '@/components/ui/chart';
import { getOrders } from '@/services/OrderService';
import { createContext, useState, ReactNode, useEffect } from 'react';

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

        // Calcular ventas mensuales por categoría
        const calculateMonthlyCategorySales = (categoryName) => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            return orders
                .filter((sale) => {
                    const saleDate = new Date(sale.createtime);
                    return (
                        saleDate.getMonth() === currentMonth &&
                        saleDate.getFullYear() === currentYear
                    );
                })
                .reduce((total, sale) => {
                    const categorySales = sale.products
                        .filter((product) => product.category.name.toLowerCase() === categoryName.toLowerCase())
                        .length; // Cuenta los productos vendidos en la categoría
                    return total + categorySales;
                }, 0);
        };

        // Generar datos mensuales para el gráfico
        const monthlySales = orders.reduce((acc, sale) => {
            const saleDate = new Date(sale.createtime);
            const month = months[saleDate.getMonth()];

            if (!acc[month]) {
                acc[month] = { month };
                getCategories().forEach((category) => {
                    acc[month][category] = 0;
                });
            }

            sale.products.forEach((product) => {
                const category = product.category.name.toLowerCase();
                acc[month][category] = (acc[month][category] || 0) + 1;
            });

            return acc;
        }, {});

        const chartData = Object.values(monthlySales);

        if (Array.isArray(chartData) && chartData.length > 0) {
            setChartData(chartData);
        } else {
            console.error("chartData tiene un formato incorrecto o está vacío");
        }

        // Configuración dinámica para gráficos
        const generateChartConfig = (categories) => {
            return categories.reduce((config, category, index) => {
                config[category] = {
                    label: category.charAt(0).toUpperCase() + category.slice(1),
                    color: `hsl(var(--chart-${index + 1}))`,
                };
                return config;
            }, {});
        };

        const categories = getCategories();
        const dynamicChartConfig = generateChartConfig(categories);
        setChartConfig(dynamicChartConfig);

        // Gráfico de torta para el mes actual
        const chartData3 = categories.map((category) => {
            const salesCount = calculateMonthlyCategorySales(category);
            return {
                category,
                sales: salesCount,
                fill: dynamicChartConfig[category].color,
            };
        });

        if (Array.isArray(chartData3) && chartData3.length > 0) {
            setPieChartData(chartData3);
        } else {
            console.error("chartData3 tiene un formato incorrecto o está vacío");
        }

        // Ventas totales del mes actual
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

            const totalSales = orders
            .filter((sale) => {
                const saleDate = new Date(sale.createtime);
                return (
                    saleDate.getFullYear() === currentYear
                );
            })
            .reduce((total, sale) => {
                const saleTotal = sale.products.reduce((saleSum, product) => saleSum + product.price, 0);
                return total + saleTotal;
            }, 0);
        // Calcular ventas anuales por categoría
        const calculateAnnualCategorySales = (categoryName) => {
            return orders
                .filter((sale) => {
                    const saleDate = new Date(sale.createtime);
                    return saleDate.getFullYear() === currentYear;
                })
                .reduce((total, sale) => {
                    const categorySales = sale.products
                        .filter((product) => product.category.name.toLowerCase() === categoryName.toLowerCase())
                        .length;
                    return total + categorySales;
                }, 0);
        };

        const annualChartData = categories.map((category) => ({
            category,
            sales: calculateAnnualCategorySales(category),
            fill: dynamicChartConfig[category].color,
        }));

        if (Array.isArray(annualChartData) && annualChartData.length > 0) {
            setPieChartData2(annualChartData);
        } else {
            console.error("annualChartData tiene un formato incorrecto o está vacío");
        }

        setSalesAmount({
            amount: totalSales,
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
