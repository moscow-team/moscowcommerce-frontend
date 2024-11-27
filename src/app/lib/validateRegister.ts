export const validateName = (value: string) =>
  value.match(/^[A-Z._%+-]{2,15}(?:\s[A-Z._%+-]{2,15})*$/i);

export const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

export const validatePassword = (value: string) =>
  value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/);
