// Re-export Sonner toast for compatibility
import { toast } from "sonner"

export { toast }

// Simple hook that just exports sonner's toast
export function useToast() {
  return {
    toast,
  }
}
