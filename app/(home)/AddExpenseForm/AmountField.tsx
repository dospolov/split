"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import type { AddExpenseFormValues } from "./formTypes"

export function AmountField() {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<AddExpenseFormValues>()

  const isTouched = !!touchedFields.amount
  const hasError = !!errors.amount
  const isInvalid = isTouched && hasError

  return (
    <Field data-invalid={isInvalid} className="w-1/10">
      <FieldLabel htmlFor="amount">Amount</FieldLabel>
      <Input
        id="amount"
        placeholder="10"
        autoComplete="off"
        inputMode="numeric"
        aria-invalid={isInvalid}
        {...register("amount", { valueAsNumber: true })}
      />
      {isInvalid && (
        <FieldError
          errors={[{ message: errors.amount?.message }].filter(Boolean)}
        />
      )}
    </Field>
  )
}
