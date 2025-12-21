"use client"

import { Controller, useFormContext } from "react-hook-form"
import { FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Friend } from "../types"
import type { AddExpenseFormValues } from "../types"

export function FromField({ friends }: { friends: Friend[] }) {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext<AddExpenseFormValues>()

  const isTouched = !!touchedFields.fromId
  const hasError = !!errors.fromId
  const isInvalid = isTouched && hasError

  return (
    <FieldSet className="w-3/10 gap-3">
      <FieldLabel htmlFor="fromId">From</FieldLabel>

      <Controller
        name="fromId"
        control={control}
        render={({ field }) => (
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            {friends.map((friend) => {
              const id = `from-${friend.id}`
              return (
                <div className="flex items-center gap-3" key={friend.id}>
                  <RadioGroupItem
                    value={friend.id}
                    id={id}
                    aria-invalid={isInvalid}
                  />
                  <Label htmlFor={id}>{friend.name}</Label>
                </div>
              )
            })}
          </RadioGroup>
        )}
      />

      {isInvalid && (
        <FieldError
          errors={[{ message: errors.fromId?.message }].filter(Boolean)}
        />
      )}
    </FieldSet>
  )
}
