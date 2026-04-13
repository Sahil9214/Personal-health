import type { OnboardingFiles, OnboardingFormData } from "./types"

/**
 * Builds multipart payload for POST /healthcare-professional/onboarding (or your API route).
 * Replace `submitOnboarding` body with axios/fetch when the endpoint is ready.
 */
export function buildOnboardingFormData(data: OnboardingFormData, files: OnboardingFiles): FormData {
  const fd = new FormData()
  fd.append("role", data.role)
  fd.append("fullName", data.fullName.trim())
  fd.append("city", data.city.trim())
  fd.append("phone", data.phone.trim())
  fd.append("specialty", data.specialty.trim())
  fd.append("yearsExperience", data.yearsExperience.trim())
  fd.append("licenseNumber", data.licenseNumber.trim())
  fd.append("councilName", data.councilName.trim())
  fd.append("linkedinUrl", data.linkedinUrl.trim())
  fd.append("documentsDeferred", String(data.documentsDeferred))
  fd.append("workType", data.workType)
  fd.append("noticePeriod", data.noticePeriod)
  fd.append("openToRelocate", data.openToRelocate === null ? "" : String(data.openToRelocate))

  if (files.resume) fd.append("resume", files.resume, files.resume.name)
  if (files.governmentId) fd.append("governmentId", files.governmentId, files.governmentId.name)
  if (files.medicalRegistration) {
    fd.append("medicalRegistration", files.medicalRegistration, files.medicalRegistration.name)
  }

  return fd
}

export async function submitOnboarding(data: OnboardingFormData, files: OnboardingFiles): Promise<void> {
  const payload = buildOnboardingFormData(data, files)
  // Placeholder: wire to API when available, e.g.:
  // await api.post('/healthcare-professional/onboarding', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
  if (import.meta.env.DEV) {
    console.info("[onboarding] submit payload keys:", [...payload.keys()])
  }
  await new Promise((r) => window.setTimeout(r, 600))
}
