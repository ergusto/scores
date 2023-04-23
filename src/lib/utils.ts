import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import EmailValidator from "email-validator";
import type { GameUserOrder } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEmail(email: string) {
  return EmailValidator.validate(email);
}

export function gameUserOrderSort(a: GameUserOrder, b: GameUserOrder) {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}

