import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import EmailValidator from "email-validator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEmail(email: string) {
  return EmailValidator.validate(email);
}

export function reloadSession() {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
}
