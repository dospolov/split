import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UUID } from "@/app/(home)/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function asUUID(value: string): UUID {
  // optional runtime validation
  return value as UUID
}
