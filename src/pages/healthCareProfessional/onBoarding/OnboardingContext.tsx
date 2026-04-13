import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { STORAGE_KEY } from "./constants"
import { INITIAL_FILES, INITIAL_FORM_DATA, type OnboardingFiles, type OnboardingFormData } from "./types"

type OnboardingContextValue = {
  data: OnboardingFormData
  files: OnboardingFiles
  updateField: <K extends keyof OnboardingFormData>(key: K, value: OnboardingFormData[K]) => void
  setFiles: (patch: Partial<OnboardingFiles>) => void
  resetFiles: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function loadPersisted(): OnboardingFormData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<OnboardingFormData>
    return { ...INITIAL_FORM_DATA, ...parsed }
  } catch {
    return null
  }
}

function persist(data: OnboardingFormData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* quota or private mode */
  }
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingFormData>(() => loadPersisted() ?? INITIAL_FORM_DATA)
  const [files, setFilesState] = useState<OnboardingFiles>(INITIAL_FILES)

  useEffect(() => {
    persist(data)
  }, [data])

  const updateField = useCallback(<K extends keyof OnboardingFormData>(key: K, value: OnboardingFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const setFiles = useCallback((patch: Partial<OnboardingFiles>) => {
    setFilesState((prev) => ({ ...prev, ...patch }))
  }, [])

  const resetFiles = useCallback(() => {
    setFilesState(INITIAL_FILES)
  }, [])

  const value = useMemo(
    () => ({
      data,
      files,
      updateField,
      setFiles,
      resetFiles,
    }),
    [data, files, updateField, setFiles, resetFiles],
  )

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return ctx
}
