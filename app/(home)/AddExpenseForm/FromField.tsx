"use client"

import type { AnyFieldApi } from "@tanstack/react-form"
import { FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Friend } from "../types"

export function FromField({
  field,
  friends,
}: {
  field: AnyFieldApi
  friends: Friend[]
}) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldSet className="w-6/10">
      <FieldLabel htmlFor={field.name}>From</FieldLabel>

      <RadioGroup
        name={field.name}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        {friends.map((friend) => {
          const id = `form-tanstack-radiogroup-${friend.id}`
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

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </FieldSet>
  )
}
