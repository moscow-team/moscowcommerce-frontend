"use client"
import { PriceFormatter } from "@/utils/PriceFormatter";
import { useCharts } from "../hooks/useChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { useDashboard } from "../hooks/useDashboard";

export default function SalesComponent() {
    const { salesAmount } = useCharts();
    const { printSales, printSalesMonthly } = useDashboard();
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Monto de Ventas Mensuales</CardTitle>

                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <h3 className="text-3xl font-bold">{PriceFormatter(salesAmount.monthlyAmount)}</h3>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" variant="outline" size="icon" onClick={()=>printSalesMonthly()}><PrinterIcon></PrinterIcon></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p className="font-semibold text-sm bg-white p-2 shadow-md rounded-xl">Imprimir Ventas Mensuales</p>                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Monto de Ventas Anuales</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <h3 className="text-3xl font-bold">{PriceFormatter(salesAmount.amount)}</h3>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" variant="outline" size="icon" onClick={()=>printSales()}><PrinterIcon></PrinterIcon></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-semibold text-sm bg-white p-2 shadow-md rounded-xl">Imprimir Ventas Anuales</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardContent>
            </Card>
        </div>
    );
}