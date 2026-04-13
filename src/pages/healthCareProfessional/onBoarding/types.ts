export type HealthcareRole =
  | "physician"
  | "nurse"
  | "therapist"
  | "allied_health"
  | "administrator"
  | "other"

export type WorkTypePreference = "full_time" | "part_time" | "contract" | "locum" | ""

export interface OnboardingFormData {
  role: HealthcareRole | ""
  fullName: string
  city: string
  phone: string
  specialty: string
  yearsExperience: string
  licenseNumber: string
  councilName: string
  linkedinUrl: string
  documentsDeferred: boolean
  workType: WorkTypePreference
  noticePeriod: string
  openToRelocate: boolean | null
}

export interface OnboardingFiles {
  governmentId: File | null
  medicalRegistration: File | null
  resume: File | null
}

export const INITIAL_FORM_DATA: OnboardingFormData = {
  role: "",
  fullName: "",
  city: "",
  phone: "",
  specialty: "",
  yearsExperience: "",
  licenseNumber: "",
  councilName: "",
  linkedinUrl: "",
  documentsDeferred: false,
  workType: "",
  noticePeriod: "",
  openToRelocate: null,
}

export const INITIAL_FILES: OnboardingFiles = {
  governmentId: null,
  medicalRegistration: null,
  resume: null,
}
