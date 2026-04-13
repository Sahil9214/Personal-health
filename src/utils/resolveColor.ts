export const resolveColor = (value?: string) => {
    if (!value) return undefined
    if (value.startsWith("#") || value.startsWith("rgb") || value.startsWith("hsl") || value.startsWith("var(")) {
      return value
    }
    return `var(--${value})`
  }
