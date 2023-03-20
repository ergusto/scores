import { InputHTMLAttributes, forwardRef } from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
  }

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          {
            'border-2 border-rose-400 px-[11px]': hasError,
          }
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
