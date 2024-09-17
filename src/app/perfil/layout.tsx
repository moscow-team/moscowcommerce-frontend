export const metadata = {
    title: "Moskow Commerce - Perfil",
    description: "Perfil en Moskow Commerce",
  };
  
  export default function PerfilLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="perfil-layout">
        {children}
      </div>
    );
  }