"use client"
import { PriceFormatter } from "@/utils/PriceFormatter";
import { useCharts } from "../hooks/useChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SalesComponent() {
    const { salesQuantity } = useCharts();
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Monto de Ventas Mensuales</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl">{PriceFormatter(salesQuantity.monthQuantity * 1013)}</h3>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Monto de Ventas Anuales</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl">{PriceFormatter(salesQuantity.quantity * 1019)}</h3>
                </CardContent>
            </Card>
        </div>
    );
}