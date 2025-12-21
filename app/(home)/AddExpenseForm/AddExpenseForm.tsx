"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
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

import type { AddExpenseFormValues } from "../types"
import { TitleField } from "./TitleField"
import { AmountField } from "./AmountField"
import { FromField } from "./FromField"
import { WithField } from "./WithField"

export function AddExpenseForm({
  addExpense,
  friends,
}: {
  addExpense: (expense: Expense) => void
  friends: Friend[]
}) {
  const methods = useForm<AddExpenseFormValues>({
    defaultValues: {
      title: "",
      amount: 1,
      fromId: undefined,
      withId: undefined,
    },
    resolver: zodResolver(addExpenseFormSchema),
    mode: "onBlur", // optional, closer to your "touched" logic
  })

  const onSubmit = (value: AddExpenseFormValues) => {
    toast.success("You have added a new expense")
    addExpense({
      id: crypto.randomUUID(),
      title: value.title,
      amount: value.amount,
      fromId: value.fromId,
      withId: value.withId,
    })
    methods.reset()
  }

  if (!friends.length) return <div>No friends added yet</div>

  return (
    <FormProvider {...methods}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add a new expense</CardTitle>
        </CardHeader>

        <CardContent>
          <form id="add-expense-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup className="flex flex-row gap-4">
              <TitleField />
              <AmountField />
              <FromField friends={friends} />
              <WithField friends={friends} />
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
    </FormProvider>
  )
}
