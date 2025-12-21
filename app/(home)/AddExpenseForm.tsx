"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import type { Expense } from "./types"
import { asUUID } from "@/lib/utils"

export const addExpenseFormSchema = z.object({
  title: z
    .string()
    .min(3, "Expense title must be at least 3 characters.")
    .max(32, "Expense title must be at most 32 characters."),
  amount: z.number().min(1, "Expense amount must be at least 1."),
})

export function AddExpenseForm({
  addExpense,
}: {
  addExpense: (expense: Expense) => void
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 1,
    },
    validators: {
      onSubmit: addExpenseFormSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("You have added a new expense")
      addExpense({
        id: asUUID(crypto.randomUUID()),
        title: value.title,
        amount: value.amount,
      })
      form.reset()
    },
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add a new expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-expense-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="flex flex-row">
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Pizza"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name="amount">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      aria-invalid={isInvalid}
                      placeholder="10"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="add-expense-form">
            Add
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
