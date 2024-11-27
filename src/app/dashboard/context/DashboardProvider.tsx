"use client";
import { ChartConfig } from '@/components/ui/chart';
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
    salesQuantity: Sales;
    chartConfig2: ChartConfig;
    pieChartData: any;
    pieChartData2: any;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
interface SelectedFile {
    file: File;
    previewUrl: string;
}

type Sales = {
    quantity: number;
    monthQuantity: number;
}
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [archivedProducts, setArchivedProducts] = useState<any>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [salesQuantity, setSalesQuantity] = useState<Sales>({
        quantity: 0,
        monthQuantity: 0
    });
    const [chartData, setChartData] = useState<any>([]);
    const [pieChartData, setPieChartData] = useState<any>([]);
    const [pieChartData2, setPieChartData2] = useState<any>([]);

    const chartConfig = {
        yerbas: {
            label: "Yerbas",
            color: "#60a5fa",
        },
        mates: {
            label: "Mates",
            color: "#2563eb",
        },
        termos: {
            label: "Termos",
            color: "#3357ff",
        },
        materas: {
            label: "Materas",
            color: "#ff33a1",
        },
        bombillas: {
            label: "Bombillas",
            color: "#a133ff",
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
    useEffect(() => {

        const chartData2 = [
            { category: "mates", sales: Math.floor(Math.random() * 100), fill: "var(--color-mates)" },
            { category: "yerbas", sales: Math.floor(Math.random() * 100), fill: "var(--color-yerbas)" },
            { category: "bombillas", sales: Math.floor(Math.random() * 100), fill: "var(--color-bombillas)" },
            { category: "materas", sales: Math.floor(Math.random() * 100), fill: "var(--color-materas)" },
            { category: "termos", sales: Math.floor(Math.random() * 100), fill: "var(--color-termos)" },
        ]

        const chartData = [
            { month: "February", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "March", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "April", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "May", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "June", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "July", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "August", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "September", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "October", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "November", yerbas: Math.floor(Math.random() * 400), mates: Math.floor(Math.random() * 400), termos: Math.floor(Math.random() * 400), materas: Math.floor(Math.random() * 400), bombillas: Math.floor(Math.random() * 400) },

            { month: "December", yerbas: chartData2.find(data => data.category === "yerbas")?.sales || 0, mates: chartData2.find(data => data.category === "mates")?.sales || 0, termos: chartData2.find(data => data.category === "termos")?.sales || 0, materas: chartData2.find(data => data.category === "materas")?.sales || 0, bombillas: chartData2.find(data => data.category === "bombillas")?.sales || 0 },

        ];


        // Calculate sales totals for each category
        const calculateCategorySales = (category) => {
            return chartData.reduce((total, month) => total + (month[category] || 0), 0);
        };

        // Populate chartData3
        const chartData3 = [
            { category: "mates", sales: calculateCategorySales("mates"), fill: "var(--color-mates)" },
            { category: "yerbas", sales: calculateCategorySales("yerbas"), fill: "var(--color-yerbas)" },
            { category: "bombillas", sales: calculateCategorySales("bombillas"), fill: "var(--color-bombillas)" },
            { category: "materas", sales: calculateCategorySales("materas"), fill: "var(--color-materas)" },
            { category: "termos", sales: calculateCategorySales("termos"), fill: "var(--color-termos)" },
        ];
        setChartData(chartData);
        setPieChartData(chartData2);
        setPieChartData2(chartData3);
        setSalesQuantity(
            {
                quantity: chartData.reduce((acc, item) => acc + item.yerbas + item.mates + item.termos + item.materas + item.bombillas, 0),
                monthQuantity: chartData[chartData.length - 1].yerbas + chartData[chartData.length - 1].mates + chartData[chartData.length - 1].termos + chartData[chartData.length - 1].materas + chartData[chartData.length - 1].bombillas
            }
        );
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
                salesQuantity,
                chartConfig2,
                pieChartData,
                pieChartData2
            }}>
            {children}
        </DashboardContext.Provider>
    );
};
