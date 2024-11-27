import { validateEmail, validateName } from "./validateRegister";

export const validateFullName = (value: string) => {
  const names = value.split(" ");
  return names.every(name => validateName(name));
};

export const validateProfileData = (data: { 
  email: string; 
  fullName: string; 
  password?: string;
}) => {
  const errors: Record<string, string> = {};

  if (!validateEmail(data.email)) {
    errors.email = "Email inválido";
  }

  if (!validateFullName(data.fullName)) {
    errors.fullName = "Nombre inválido";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};