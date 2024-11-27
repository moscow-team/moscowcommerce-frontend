"use client";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardProvider";

export const useCharts = () => {
  const context = useContext(DashboardContext);
  // Sincroniza filteredProducts solo la primera vez que se cargan los productos

  if (context === undefined) {
    throw new Error("useCharts must be used within a EcommerceContext");
  }

  const { chartData, chartConfig, salesAmount, chartConfig2,pieChartData, pieChartData2} = context;

  return {
    chartData,
    chartConfig,
    salesAmount,
    chartConfig2,
    pieChartData,
    pieChartData2
  };
};
