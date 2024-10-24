import { CategoryProvider } from "./context/CategoryProvider";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <CategoryProvider>
            {children}
        </CategoryProvider>
    </div>
  );
}