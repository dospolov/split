import * as z from "zod"
import type { expenseSchema, friendSchema } from "./schema"

export const UUIDSchema = z.uuid()

export type UUID = z.infer<typeof UUIDSchema>

export type Friend = z.infer<typeof friendSchema>

export type Expense = z.infer<typeof expenseSchema>

export type AddExpenseFormValues = {
  title: string
  amount: number
  fromId: string | undefined
  withId: UUID[]
}
