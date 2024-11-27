"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/interfaces/User";
import { Mail, User as UserIcon, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateProfileData } from "../lib/validateProfile";

interface ProfileFormProps {
  user: User | null;
  onUpdate: (userData: Partial<User>) => Promise<any>;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    password: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { isValid, errors } = validateProfileData(formData);

      if (!isValid) {
        const errorMessages = Object.values(errors).join(", ");
        toast.error(errorMessages);
        return;
      }
      console.log("formData", formData);
      const updateData: Partial<User> = {
        ...user,
        ...formData,
        id: user?.userId,
        password: formData.password || undefined
      };
      console.log(updateData);
      const result = await onUpdate(updateData);
      console.log(result);
      if (result?.success) {
        toast.success("Perfil actualizado correctamente");
        router.push("/");
      } else {
        toast.error(result?.message || "Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error al actualizar el perfil");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFormData({ fullName: user?.fullName || "", email: user?.email || "", password: "" });
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nombre completo</Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="pl-10"
            placeholder="Nombre completo"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="pl-10"
            placeholder="correo@ejemplo.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Nueva contraseña (opcional)</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="pl-10"
            placeholder="Dejar en blanco para mantener la actual"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Actualizando..." : "Actualizar perfil"}
      </Button>
    </form>
  );
}