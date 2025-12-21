import * as z from "zod"
import type { addFrendFormSchema } from "./AddFriendForm"
import type { addExpenseFormSchema } from "./AddExpenseForm"

export type Friend = z.infer<typeof addFrendFormSchema> & {
  id: UUID
}

export type Expense = z.infer<typeof addExpenseFormSchema> & {
  id: UUID
}

export type UUID = string & { readonly __brand: unique symbol }
