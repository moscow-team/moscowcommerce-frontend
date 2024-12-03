"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useCharts } from "../hooks/useChart";

export function Charts() {
    const { chartConfig, chartData } = useCharts()
    return (
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                {Object.keys(chartConfig).map((category) => (
                <Bar 
                    key={category} 
                    dataKey={category} 
                    fill={chartConfig[category].color} 
                    radius={4} 
                />
            ))}
            </BarChart>
        </ChartContainer>
    )
}
