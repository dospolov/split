"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import type { Expense, Friend } from "../types"
import { addExpenseFormSchema } from "../schema"

import { TitleField } from "./TitleField"
import { AmountField } from "./AmountField"
import { FromField } from "./FromField"

export function AddExpenseForm({
  addExpense,
  friends,
}: {
  addExpense: (expense: Expense) => void
  friends: Friend[]
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 1,
      fromId: undefined as string | undefined,
    },
    validators: { onSubmit: addExpenseFormSchema },
    onSubmit: async ({ value }) => {
      toast.success("You have added a new expense")
      addExpense({
        id: crypto.randomUUID(),
        title: value.title,
        amount: value.amount,
        fromId: value.fromId,
      })
      form.reset()
    },
  })

  if (!friends.length) return <div>No friends added yet</div>

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
          <FieldGroup className="flex flex-row gap-3">
            <form.Field name="title">
              {(field) => <TitleField field={field} />}
            </form.Field>

            <form.Field name="amount">
              {(field) => <AmountField field={field} />}
            </form.Field>

            <form.Field name="fromId">
              {(field) => <FromField field={field} friends={friends} />}
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
