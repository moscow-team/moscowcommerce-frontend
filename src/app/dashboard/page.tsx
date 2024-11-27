
import { Charts } from "./components/Charts";
import { PieCharts } from "./components/PieCharts";
import SalesComponent from "./components/SalesComponent";

export const metadata = {
  title: "Dashboard - Moskow Commerce",
  description: "Admin Panel",
};
export default function DashboardPage() {
  return (
      <div className="flex flex-col gap-3">
        <SalesComponent/>
        <PieCharts />
        <Charts></Charts>
    </div>
  );
}
