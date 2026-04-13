import { useState, type ChangeEvent } from "react"
import { FileText } from "lucide-react"

import { cn } from "@/lib/utils"

import { DOC_ACCEPT, MAX_FILE_BYTES, formHintClassName, formLabelClassName } from "../constants"
import { useOnboarding } from "../OnboardingContext"

function validateFile(f: File): string | null {
  if (f.size > MAX_FILE_BYTES) {
    return `File must be ${MAX_FILE_BYTES / (1024 * 1024)} MB or smaller.`
  }
  return null
}

const DocumentStep = () => {
  const { data, files, setFiles, updateField } = useOnboarding()
  const [fileError, setFileError] = useState<string | null>(null)

  const onPick =
    (key: "governmentId" | "medicalRegistration") => (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null
      e.target.value = ""
      setFileError(null)
      if (!f) {
        setFiles({ [key]: null })
        return
      }
      const err = validateFile(f)
      if (err) {
        setFileError(err)
        return
      }
      setFiles({ [key]: f })
    }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-plus-jakarta-sans text-lg font-semibold text-[#0F172A]">Verification documents</h2>
        <p className={cn(formHintClassName, "mt-1")}>
          Upload a government ID and/or medical registration certificate. Files are encrypted in transit; review our
          privacy policy for retention.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={formLabelClassName} htmlFor="gov-id">
            Government ID
          </label>
          <label
            htmlFor="gov-id"
            className={cn(
              "mt-2 flex cursor-pointer flex-col rounded-xl border border-dashed border-[#D4D4D4] bg-white px-4 py-6 transition hover:border-[#0D9488]/40",
              files.governmentId && "border-[#0D9488] bg-[#f0fdfa]/40",
            )}
          >
            <FileText className="mb-2 h-6 w-6 text-[#0D9488]" aria-hidden />
            <span className="font-plus-jakarta-sans text-sm font-semibold text-[#0F172A]">
              {files.governmentId?.name ?? "Aadhaar / passport / driving license"}
            </span>
            <input id="gov-id" type="file" accept={DOC_ACCEPT} className="sr-only" onChange={onPick("governmentId")} />
          </label>
        </div>
        <div>
          <label className={formLabelClassName} htmlFor="med-reg">
            Medical registration proof
          </label>
          <label
            htmlFor="med-reg"
            className={cn(
              "mt-2 flex cursor-pointer flex-col rounded-xl border border-dashed border-[#D4D4D4] bg-white px-4 py-6 transition hover:border-[#0D9488]/40",
              files.medicalRegistration && "border-[#0D9488] bg-[#f0fdfa]/40",
            )}
          >
            <FileText className="mb-2 h-6 w-6 text-[#0D9488]" aria-hidden />
            <span className="font-plus-jakarta-sans text-sm font-semibold text-[#0F172A]">
              {files.medicalRegistration?.name ?? "Council certificate / ID card"}
            </span>
            <input
              id="med-reg"
              type="file"
              accept={DOC_ACCEPT}
              className="sr-only"
              onChange={onPick("medicalRegistration")}
            />
          </label>
        </div>
      </div>

      {fileError ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 font-plus-jakarta-sans text-sm text-amber-900">
          {fileError}
        </p>
      ) : null}

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3">
        <input
          type="checkbox"
          checked={data.documentsDeferred}
          onChange={(e) => {
            const checked = e.target.checked
            updateField("documentsDeferred", checked)
            if (checked) {
              setFiles({ governmentId: null, medicalRegistration: null })
              setFileError(null)
            }
          }}
          className="mt-0.5 h-4 w-4 accent-[#0D9488]"
        />
        <span className="font-plus-jakarta-sans text-sm font-medium leading-relaxed text-[#0F172A]">
          I&apos;ll complete identity verification later from my profile. I understand some job applications may stay
          limited until verification is done.
        </span>
      </label>
    </div>
  )
}

export default DocumentStep
