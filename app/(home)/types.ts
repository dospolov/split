import * as z from "zod"
import type {
  addFrendFormSchema,
  addExpenseFormSchema,
  expenseSchema,
  friendSchema,
} from "./schema"

export const UUIDSchema = z.uuid()

export type UUID = z.infer<typeof UUIDSchema>

export type Friend = z.infer<typeof friendSchema>

export type AddFriendFormValues = z.infer<typeof addFrendFormSchema>

export type Expense = z.infer<typeof expenseSchema>

export type AddExpenseFormValues = z.infer<typeof addExpenseFormSchema>
