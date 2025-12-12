import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium font-body transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-onyx text-white hover:bg-onyx/90 btn-shadow",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-onyx bg-transparent text-onyx hover:bg-porcelain",
        secondary:
          "bg-graphite text-white hover:bg-graphite/90",
        ghost: "text-graphite hover:text-onyx hover:bg-porcelain/50",
        link: "text-cyan underline-offset-4 hover:underline",
        accent: "bg-cyan text-onyx hover:bg-cyan/90 btn-shadow",
        gradient: "bg-gradient-to-r from-violet to-cyan text-white hover:opacity-90",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
