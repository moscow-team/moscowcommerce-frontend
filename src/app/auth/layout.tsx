export const metadata = {
    title: "Moskow Commerce - Autenticación",
    description: "Login y registro en Moskow Commerce",
  };
  
  export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="auth-layout">
        {children}
      </div>
    );
  }
  