// features/transactions/ui/TransactionForm.tsx
"use client"

import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  transactionInputSchema,
  type FriendsState,
  type Transaction,
  type TransactionInput,
} from "@/shared/schemas"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  friends: FriendsState
  initial?: Transaction
  onSubmit: (value: TransactionInput) => void
  onCancel?: () => void
}

export function TransactionForm({
  friends,
  initial,
  onSubmit,
  onCancel,
}: Props) {
  const form = useForm<TransactionInput>({
    resolver: zodResolver(transactionInputSchema),
    defaultValues: initial
      ? {
          payerId: initial.payerId,
          amount: initial.amount,
          participantIds: initial.participantIds,
          title: initial.title,
        }
      : {
          payerId: "",
          amount: undefined,
          participantIds: [],
          title: "",
        },
    mode: "onBlur",
  })

  useEffect(() => {
    if (!initial) return
    form.reset({
      payerId: initial.payerId,
      amount: initial.amount,
      participantIds: initial.participantIds,
      title: initial.title,
    })
  }, [initial, form])

  const friendIds = friends.allIds

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={form.handleSubmit((value) => {
        onSubmit(value)

        // reset ONLY in "Add" mode
        if (!initial) {
          form.reset({
            payerId: "",
            amount: undefined,
            participantIds: [],
            title: "",
          })
        }
      })}
    >
      {/* Title */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <Input
              {...field}
              id={field.name}
              placeholder="Pizza, beer, taxi…"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
            />
            <FieldDescription>Optional</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Amount (integers only, can be empty while typing) */}
      <Controller
        name="amount"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
            <Input
              id={field.name}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g. 100"
              value={field.value == null ? "" : String(field.value)}
              onChange={(e) => {
                const raw = e.target.value

                if (raw === "") {
                  field.onChange(undefined)
                  return
                }

                if (/^\d+$/.test(raw)) {
                  field.onChange(Number(raw))
                }
              }}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Payer */}
      <Controller
        name="payerId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Payer</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Select payer" />
              </SelectTrigger>
              <SelectContent>
                {friendIds.map((id) => (
                  <SelectItem key={id} value={id}>
                    {friends.byId[id]?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Participants */}
      <Controller
        name="participantIds"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Participants</FieldLabel>
            <div className="space-y-2">
              {friendIds.map((id) => {
                const checked = field.value.includes(id)
                return (
                  // biome-ignore lint/a11y/noLabelWithoutControl: "Label is inside"
                  <label key={id} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => {
                        if (v) field.onChange([...field.value, id])
                        else field.onChange(field.value.filter((x) => x !== id))
                      }}
                      aria-invalid={fieldState.invalid}
                    />
                    {friends.byId[id]?.name}
                  </label>
                )
              })}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex gap-2">
        <Button type="submit">{initial ? "Save" : "Add"}</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
