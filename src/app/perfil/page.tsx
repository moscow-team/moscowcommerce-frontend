"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/interfaces/User";
import { updateUser } from "@/services/dashboard/usuarioService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProfileForm } from "./form";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
        const matchedUser = session.user as User;
        console.log(matchedUser);
      if (matchedUser) {
        setCurrentUser(matchedUser);
      }
    }
  }, [session, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Mi Perfil</CardTitle>
          <p className="text-muted-foreground">
            Actualiza tu información personal
          </p>
        </CardHeader>
        <CardContent>
          <ProfileForm user={currentUser} onUpdate={updateUser} />
        </CardContent>
      </Card>
    </div>
  );
}