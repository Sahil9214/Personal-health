import type { OnboardingFiles, OnboardingFormData } from "./types"

export function validateStep(stepIndex: number, data: OnboardingFormData, files: OnboardingFiles): string | null {
  switch (stepIndex) {
    case 0:
      if (!data.role) return "Select your professional role to continue."
      return null
    case 1: {
      if (data.fullName.trim().length < 2) return "Enter your full name."
      if (data.city.trim().length < 2) return "Enter your city."
      if (data.phone.trim() && !/^[\d\s+()-]{8,}$/.test(data.phone.trim())) {
        return "Enter a valid phone number or leave it blank."
      }
      return null
    }
    case 2: {
      if (data.specialty.trim().length < 2) return "Enter your primary specialty or department."
      const years = Number(data.yearsExperience)
      if (data.yearsExperience.trim() === "" || Number.isNaN(years) || years < 0 || years > 60) {
        return "Enter years of experience (0–60)."
      }
      if (data.licenseNumber.trim().length < 3) return "Enter your medical registration or license number."
      if (data.councilName.trim().length < 2) return "Enter the registering council or authority name."
      return null
    }
    case 3: {
      const hasResume = Boolean(files.resume)
      const url = data.linkedinUrl.trim()
      if (!hasResume && !url) return null
      if (url && !/^https?:\/\/.+\..+/.test(url)) {
        return "Enter a valid URL starting with http:// or https://"
      }
      return null
    }
    case 4: {
      if (data.documentsDeferred) return null
      if (!files.governmentId && !files.medicalRegistration) {
        return "Upload at least one document, or choose to verify later."
      }
      return null
    }
    case 5: {
      if (!data.workType) return "Select a preferred work type."
      if (!data.noticePeriod) return "Select your availability / notice period."
      if (data.openToRelocate === null) return "Let us know if you are open to relocation."
      return null
    }
    default:
      return null
  }
}
