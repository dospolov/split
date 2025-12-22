"use client"

import { Controller, useFormContext } from "react-hook-form"
import { FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Friend, UUID } from "../types"
import type { AddExpenseFormValues } from "../types"

export function WithField({ friends }: { friends: Friend[] }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddExpenseFormValues>()

  // const isTouched = !!touchedFields.fromId
  const hasError = !!errors.withId

  return (
    <FieldSet className="w-3/10 gap-3">
      <FieldLabel htmlFor="withId">With</FieldLabel>

      <Controller
        name="withId"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            {friends.map((friend) => {
              const id = `with-${friend.id}`
              return (
                <div className="flex items-center gap-3" key={friend.id}>
                  <Checkbox
                    value={friend.id}
                    id={id}
                    aria-invalid={hasError}
                    checked={field.value.includes(friend.id)}
                    onCheckedChange={(checked) =>
                      field.onChange(
                        checked
                          ? [...(field.value as UUID[]), friend.id]
                          : field.value.filter((id) => id !== friend.id),
                      )
                    }
                  />
                  <Label htmlFor={id}>{friend.name}</Label>
                </div>
              )
            })}
          </div>
        )}
      />

      {hasError && (
        <FieldError
          errors={[{ message: errors.withId?.message }].filter(Boolean)}
        />
      )}
    </FieldSet>
  )
}
