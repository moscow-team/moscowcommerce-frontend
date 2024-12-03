"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<string | null>(null);

  useEffect(() => {
    const route = searchParams.get("callbackUrl");
    if (route) {
      const url = new URL(route);
      setParams(url.pathname);
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LoginForm params={params} />
    </Suspense>
  );
}
