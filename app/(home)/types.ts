import * as z from "zod"
import type { addFrendFormSchema } from "./schema"
import type { addExpenseFormSchema } from "./schema"

export const UUIDSchema = z.uuid()

export type UUID = z.infer<typeof UUIDSchema>

export type Friend = z.infer<typeof addFrendFormSchema> & {
  id: UUID
}

export type Expense = z.infer<typeof addExpenseFormSchema> & {
  id: UUID
}

export type AddExpenseFormValues = {
  title: string
  amount: number
  fromId: string | undefined
  withId: UUID[]
}
