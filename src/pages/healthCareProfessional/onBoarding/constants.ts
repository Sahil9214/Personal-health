export const formLabelClassName =
  "font-plus-jakarta-sans text-sm font-medium leading-5 text-[#0F172A]"

export const formHintClassName = "font-plus-jakarta-sans text-sm font-medium leading-relaxed text-[#737373]"

export const inputClassName =
  "box-border flex h-10 w-full min-w-0 shrink-0 items-center rounded-xl border border-[#D4D4D4] bg-white px-3 py-1 font-plus-jakarta-sans text-sm font-medium leading-5 text-neutral-900 shadow-sm outline-none transition-[border,box-shadow] placeholder:font-medium placeholder:text-[#A3A3A3] focus-visible:border-[#0D9488] focus-visible:ring-2 focus-visible:ring-[#0D9488]/20"

export const STORAGE_KEY = "staffton-hcp-onboarding-v1"

/** Max upload size per file (5 MiB) */
export const MAX_FILE_BYTES = 5 * 1024 * 1024

export const DOC_ACCEPT = "image/jpeg,image/png,application/pdf,.jpg,.jpeg,.png,.pdf"

export const STEP_LABELS = [
  "Role",
  "About you",
  "Credentials",
  "Resume",
  "Documents",
  "Preferences",
] as const
