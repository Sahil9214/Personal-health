import { useState } from "react"
import { FileText, Link2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import {
  DOC_ACCEPT,
  MAX_FILE_BYTES,
  formHintClassName,
  formLabelClassName,
  inputClassName,
} from "../constants"
import { useOnboarding } from "../OnboardingContext"

function formatMaxSize() {
  return `${MAX_FILE_BYTES / (1024 * 1024)} MB`
}

const ResumeStep = () => {
  const { data, files, setFiles, updateField } = useOnboarding()
  const [fileError, setFileError] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-plus-jakarta-sans text-lg font-semibold text-[#0F172A]">Resume & links</h2>
        <p className={cn(formHintClassName, "mt-1")}>
          Optional for now—adding a CV or LinkedIn improves shortlisting. PDF or image, up to {formatMaxSize()} per file.
        </p>
      </div>

      <div>
        <label className={formLabelClassName} htmlFor="resume-file">
          Upload CV / resume
        </label>
        <label
          htmlFor="resume-file"
          className={cn(
            "mt-2 flex cursor-pointer flex-col rounded-xl border border-dashed border-[#D4D4D4] bg-white px-4 py-6 transition hover:border-[#0D9488]/40",
            files.resume && "border-[#0D9488] bg-[#f0fdfa]/40",
          )}
        >
          <FileText className="mb-2 h-6 w-6 text-[#0D9488]" aria-hidden />
          <span className="font-plus-jakarta-sans text-sm font-semibold text-[#0F172A]">
            {files.resume?.name ?? "PDF, PNG, or JPG"}
          </span>
          <input
            id="resume-file"
            type="file"
            accept={DOC_ACCEPT}
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null
              e.target.value = ""
              setFileError(null)
              if (!f) {
                setFiles({ resume: null })
                return
              }
              if (f.size > MAX_FILE_BYTES) {
                setFileError(`File must be ${MAX_FILE_BYTES / (1024 * 1024)} MB or smaller.`)
                return
              }
              setFiles({ resume: f })
            }}
          />
        </label>
        {fileError ? (
          <p className="mt-2 font-plus-jakarta-sans text-sm text-amber-800">{fileError}</p>
        ) : null}
      </div>

      <div>
        <label className={formLabelClassName} htmlFor="ob-linkedin">
          <span className="inline-flex items-center gap-2">
            <Link2 className="h-4 w-4 text-[#0D9488]" aria-hidden />
            LinkedIn or portfolio URL
          </span>
        </label>
        <Input
          id="ob-linkedin"
          type="url"
          inputMode="url"
          autoComplete="url"
          value={data.linkedinUrl}
          onChange={(e) => updateField("linkedinUrl", e.target.value)}
          placeholder="https://"
          className={cn(inputClassName, "mt-2")}
        />
      </div>
    </div>
  )
}

export default ResumeStep
