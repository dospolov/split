"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import type { AddExpenseFormValues } from "./formTypes"

export function TitleField() {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<AddExpenseFormValues>()

  const isTouched = !!touchedFields.title
  const hasError = !!errors.title
  const isInvalid = isTouched && hasError

  return (
    <Field data-invalid={isInvalid} className="w-3/10">
      <FieldLabel htmlFor="title">Title</FieldLabel>
      <Input
        id="title"
        autoComplete="off"
        placeholder="Pizza"
        aria-invalid={isInvalid}
        {...register("title")}
      />
      {isInvalid && (
        <FieldError
          errors={[{ message: errors.title?.message }].filter(Boolean)}
        />
      )}
    </Field>
  )
}
