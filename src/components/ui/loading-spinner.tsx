import { cn } from "@/lib/utils"
import { Loader2, Truck, Package, Clock } from "lucide-react"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "dots" | "pulse" | "truck" | "package"
  text?: string
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6", 
  lg: "h-8 w-8",
  xl: "h-12 w-12"
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg", 
  xl: "text-xl"
}

export function LoadingSpinner({ 
  className, 
  size = "md", 
  variant = "default",
  text 
}: LoadingSpinnerProps) {
  const renderSpinner = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        )
      
      case "pulse":
        return (
          <div className={cn(
            "rounded-full bg-primary animate-pulse-glow",
            sizeClasses[size]
          )} />
        )
      
      case "truck":
        return (
          <Truck className={cn(
            "text-primary animate-bounce",
            sizeClasses[size]
          )} />
        )
      
      case "package":
        return (
          <Package className={cn(
            "text-primary animate-float",
            sizeClasses[size]
          )} />
        )
      
      default:
        return (
          <Loader2 className={cn(
            "animate-spin text-primary",
            sizeClasses[size]
          )} />
        )
    }
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      {renderSpinner()}
      {text && (
        <p className={cn(
          "text-muted-foreground animate-pulse",
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  )
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  text = "Loading...",
  variant = "default" 
}: {
  isLoading: boolean
  children: React.ReactNode
  text?: string
  variant?: LoadingSpinnerProps["variant"]
}) {
  if (!isLoading) return <>{children}</>

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
        <LoadingSpinner size="lg" variant={variant} text={text} />
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  )
}

export function LoadingButton({ 
  isLoading, 
  children, 
  className,
  disabled,
  ...props 
}: {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  [key: string]: any
}) {
  return (
    <button
      className={cn(
        "btn-interactive hover-lift disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export function LoadingPage({ 
  text = "Loading your dashboard...",
  variant = "truck" 
}: {
  text?: string
  variant?: LoadingSpinnerProps["variant"]
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-gradient">
      <div className="text-center space-y-6 animate-fade-in-up">
        <LoadingSpinner size="xl" variant={variant} />
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">{text}</h2>
          <p className="text-muted-foreground">Please wait while we prepare everything for you</p>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="h-1 w-8 bg-primary/30 rounded-full">
            <div className="h-1 bg-primary rounded-full animate-loading"></div>
          </div>
        </div>
      </div>
    </div>
  )
}