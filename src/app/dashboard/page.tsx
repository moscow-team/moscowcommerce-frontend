export const metadata = {
  title: "Dashboard - Moskow Commerce",
  description: "Admin Panel",
};
export default function DashboardPage() {
  const session = useSession();
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
        <p className="text-gray-600">
          Opciones para un futuro:
          <br />
          - Agregar gráficos estadísticos
          <br />
          - Cards para acceder más rápido a los datos
          <br />
          - Diseñar en Figma
        </p>
      </div>
    </div>
  );
}
