"use client"

import type { AnyFieldApi } from "@tanstack/react-form"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export function AmountField({ field }: { field: AnyFieldApi }) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} className="w-1/10">
      <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        aria-invalid={isInvalid}
        placeholder="10"
        autoComplete="off"
        inputMode="numeric"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
