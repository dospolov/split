import z from "zod"

export const addFrendFormSchema = z.object({
  name: z
    .string()
    .min(3, "Friend name must be at least 3 characters.")
    .max(32, "Friend name must be at most 32 characters."),
})

export const friendSchema = addFrendFormSchema.extend({
  id: z.uuid(),
})

export const addExpenseFormSchema = z.object({
  title: z
    .string()
    .min(3, "Expense title must be at least 3 characters.")
    .max(32, "Expense title must be at most 32 characters."),
  amount: z.number().min(1, "Expense amount must be at least 1."),
  fromId: z.string().min(1, "Select who paid").pipe(z.uuid()),
  withId: z.array(z.uuid()).min(1, "Select at least one person"),
})

export const expenseSchema = addExpenseFormSchema.extend({
  id: z.uuid(),
})
