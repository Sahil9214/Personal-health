import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { resolveColor } from "@/utils/resolveColor"

type AuthButtonProps = {
  color?: string
  bgColor?: string
  borderColor?: string
  link?: string
  text?: string
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}

export const AuthButton = ({
  color,
  bgColor,
  borderColor,
  link,
  text,
  type = "button",
  disabled,
  className,
}: AuthButtonProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!link) return
    navigate(link)
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={text ? `${text}-button` : undefined}
      onClick={handleClick}
      style={{
        color: resolveColor(color),
        backgroundColor: resolveColor(bgColor),
        border: borderColor
          ? `1px solid ${resolveColor(borderColor)}`
          : undefined,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={cn(
        "w-full rounded-[12px] p-3 transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      {text}
    </button>
  )
}

