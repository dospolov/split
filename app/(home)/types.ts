import * as z from "zod"
import type { addFrendFormSchema } from "./AddFriendForm"
import type { addExpenseFormSchema } from "./AddExpenseForm"

export const UUIDSchema = z.uuid()

export type UUID = z.infer<typeof UUIDSchema>

export type Friend = z.infer<typeof addFrendFormSchema> & {
  id: UUID
}

export type Expense = z.infer<typeof addExpenseFormSchema> & {
  id: UUID
}
