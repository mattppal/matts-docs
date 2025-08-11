import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function for handling async operations with loading states
export function fetchCallback({ setIsPending }: { setIsPending: (pending: boolean) => void }) {
  return {
    onRequest: () => {
      setIsPending(true)
    },
    onSuccess: () => {
      setIsPending(false)
    },
    onError: () => {
      setIsPending(false)
    },
  }
}
