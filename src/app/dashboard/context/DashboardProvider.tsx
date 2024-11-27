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
    const [salesAmount, setSalesAmount] = useState<Sales>({
        amount: 0,
        monthlyAmount: 0
    });
    const [chartData, setChartData] = useState<any>([]);
    const [pieChartData, setPieChartData] = useState<any>([]);
    const [pieChartData2, setPieChartData2] = useState<any>([]);
    const [orders, setOrders] = useState<any>([]);
    const chartConfig = {
        yerbas: {
            label: "Yerbas",
            color: "hsl(var(--chart-1))",
        },
        mates: {
            label: "Mates",
            color: "hsl(var(--chart-2))",
        },
        termos: {
            label: "Termos",
            color: "hsl(var(--chart-3))",
        },
        materas: {
            label: "Materas",
            color: "hsl(var(--chart-4))",
        },
        bombillas: {
            label: "Bombillas",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig
    const chartConfig2 = {
        sales: {
            label: "Ventas",
        },
        yerbas: {
            label: "Yerbas",
            color: "hsl(var(--chart-1))",
        },
        mates: {
            label: "Mates",
            color: "hsl(var(--chart-2))",
        },
        termos: {
            label: "Termos",
            color: "hsl(var(--chart-3))",
        },
        materas: {
            label: "Materas",
            color: "hsl(var(--chart-4))",
        },
        bombillas: {
            label: "Bombillas",
            color: "hsl(var(--chart-5))",
        },
        // other: {
        //     label: "Other",
        //     color: "hsl(var(--chart-6))",
        // },
    } satisfies ChartConfig

    const fetchSales = async () => {
        const response = await getOrders();
        const orders: any = response.data;
        setOrders(response.data);
        console.log(orders);
        // const chartData2 = [
        //     { category: "mates", sales: Math.floor(Math.random() * 100), fill: "var(--color-mates)" },
        //     { category: "yerbas", sales: Math.floor(Math.random() * 100), fill: "var(--color-yerbas)" },
        //     { category: "bombillas", sales: Math.floor(Math.random() * 100), fill: "var(--color-bombillas)" },
        //     { category: "materas", sales: Math.floor(Math.random() * 100), fill: "var(--color-materas)" },
        //     { category: "termos", sales: Math.floor(Math.random() * 100), fill: "var(--color-termos)" },
        // ]

        // const chartData = [
        //     { month: "February", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "March", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "April", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "May", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "June", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "July", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "August", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "September", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "October", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "November", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

        //     { month: "December", yerbas: chartData2.find(data => data.category === "yerbas")?.sales || 0, mates: chartData2.find(data => data.category === "mates")?.sales || 0, termos: chartData2.find(data => data.category === "termos")?.sales || 0, materas: chartData2.find(data => data.category === "materas")?.sales || 0, bombillas: chartData2.find(data => data.category === "bombillas")?.sales || 0 },

        // ];

        // Inicializar los meses

        // Procesar los datos para calcular las ventas mensuales por categoría

        // Convertir el objeto a un array

        // Calculate sales totals for each category
        // const calculateCategorySales = (category) => {
        //     return chartData.reduce((total, month) => total + (month[category] || 0), 0);
        // };

        // // Populate chartData3
        // const chartData3 = [
        //     { category: "mates", sales: calculateCategorySales("mates"), fill: "var(--color-mates)" },
        //     { category: "yerbas", sales: calculateCategorySales("yerbas"), fill: "var(--color-yerbas)" },
        //     { category: "bombillas", sales: calculateCategorySales("bombillas"), fill: "var(--color-bombillas)" },
        //     { category: "materas", sales: calculateCategorySales("materas"), fill: "var(--color-materas)" },
        //     { category: "termos", sales: calculateCategorySales("termos"), fill: "var(--color-termos)" },
        // ];

        
        // Generar chartData3
        const chartData2 = Object.values(
            orders.reduce((acc, sale) => {
                sale.products.forEach((product) => {
                    const categoryName = product.category.name; // Nombre de la categoría
                    if (!acc[categoryName]) {
                        acc[categoryName] = {
                            category: categoryName,
                            sales: 0, // Ventas en cantidad
                            fill: categoryColors[categoryName] || "var(--color-default)",
                        };
                    }
                    acc[categoryName].sales += 1; // Incrementar por cada producto vendido
                });
                return acc;
            }, {})
        );
        
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        
        const monthlySales = orders.reduce((acc, sale) => {
            const saleDate = new Date(sale.createtime);
            const month = months[saleDate.getMonth()]; // Obtener el nombre del mes
        
            // Inicializar el mes si no existe
            if (!acc[month]) {
                acc[month] = { month };
                months.forEach((category) => {
                    acc[month][category.toLowerCase()] = 0;
                });
            }
        
            // Sumar las cantidades por categoría
            sale.products.forEach((product) => {
                const category = product.category.name.toLowerCase(); // Nombre de la categoría
                acc[month][category] = (acc[month][category] || 0) + 1; // Incrementar por cada producto vendido
            });
        
            return acc;
        }, {});
        
        const chartData = Object.values(monthlySales);
        
        function calculateCategorySales(categoryName) {
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
                        .reduce((categoryTotal) => categoryTotal + 1, 0);
        
                    return total + categorySales;
                }, 0);
        }
        
        // Generar chartData3
        const chartData3 = [
            { category: "mates", sales: calculateCategorySales("mates"), fill: "var(--color-mates)" },
            { category: "yerbas", sales: calculateCategorySales("yerbas"), fill: "var(--color-yerbas)" },
            { category: "bombillas", sales: calculateCategorySales("bombillas"), fill: "var(--color-bombillas)" },
            { category: "materas", sales: calculateCategorySales("materas"), fill: "var(--color-materas)" },
            { category: "termos", sales: calculateCategorySales("termos"), fill: "var(--color-termos)" },
        ];
        
        // Cálculo del monto total del último mes
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
                const saleTotal = sale.products.reduce((saleSum, product) => saleSum + product.price, 0); // Usar precio directamente
                return total + saleTotal;
            }, 0);
        
        // Cálculo del monto total anual
        const totalSalesAnnual = orders
            .filter((sale) => {
                const saleDate = new Date(sale.createtime);
                return saleDate.getFullYear() === currentYear;
            })
            .reduce((total, sale) => {
                const saleTotal = sale.products.reduce((saleSum, product) => saleSum + product.price, 0);
                return total + saleTotal;
            }, 0);
                
        setChartData(chartData.reverse());
        setPieChartData(chartData3);
        setPieChartData2(chartData2);
        console.log(chartData);
        console.log(chartData2);
        console.log(chartData3);
        // Guarda los totales en el estado o donde lo necesites
        setSalesAmount({
            amount: totalSalesAnnual,
            monthlyAmount: totalSalesLastMonth,
        });
        
        
    }
    useEffect(() => {
        fetchSales();
    }, []);


    // const fetchSales = async () => {
    //     try {

    //       console.log(response);
    //       // setProducts(filtered);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

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
                orders
            }}>
            {children}
        </DashboardContext.Provider>
    );
};
