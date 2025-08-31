import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className,
  prefix = "",
  suffix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = easeOutQuart * value
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString()

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  color?: "primary" | "success" | "warning" | "destructive"
}

export function AnimatedProgress({
  value,
  max = 100,
  className,
  showLabel = false,
  color = "primary"
}: AnimatedProgressProps) {
  const [progress, setProgress] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [percentage])

  const colorClasses = {
    primary: "bg-primary",
    success: "bg-success", 
    warning: "bg-warning",
    destructive: "bg-destructive"
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-1000 ease-out rounded-full",
            colorClasses[color]
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}

interface PulsingDotProps {
  className?: string
  color?: "primary" | "success" | "warning" | "destructive"
  size?: "sm" | "md" | "lg"
}

export function PulsingDot({ 
  className, 
  color = "primary", 
  size = "md" 
}: PulsingDotProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4"
  }

  const colorClasses = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning", 
    destructive: "bg-destructive"
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative">
        <div className={cn(
          "rounded-full animate-ping absolute",
          sizeClasses[size],
          colorClasses[color],
          "opacity-75"
        )} />
        <div className={cn(
          "rounded-full",
          sizeClasses[size],
          colorClasses[color]
        )} />
      </div>
    </div>
  )
}