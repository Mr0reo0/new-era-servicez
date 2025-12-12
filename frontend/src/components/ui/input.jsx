import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full bg-white border border-graphite/20 rounded-sm px-4 py-2 text-sm font-body text-onyx placeholder:text-graphite/50 focus:border-cyan focus:ring-1 focus:ring-cyan outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
