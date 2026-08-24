// shared/schemas.ts
import { z } from "zod"

/**
 * Shared primitives
 */
export const uuidSchema = z.uuid()

/**
 * Friends
 */
export const friendSchema = z.object({
  id: uuidSchema,
  name: z
    .string()
    .min(1, "Name is required.")
    .max(48, "Name must be at most 48 characters."),
})

export type Friend = z.infer<typeof friendSchema>

export const friendsStateSchema = z.object({
  byId: z.record(uuidSchema, friendSchema),
  allIds: z.array(uuidSchema),
})

export type FriendsState = z.infer<typeof friendsStateSchema>

/**
 * Transactions
 */
export const transactionSchema = z.object({
  id: uuidSchema,
  payerId: uuidSchema,
  amount: z.number().min(1, "Amount must be at least 1."),
  type: z.enum(["expense", "earning"]).default("expense"),
  participantIds: z
    .array(uuidSchema)
    .min(1, "Select at least one participant."),
  title: z.string().max(64, "Title must be at most 64 characters.").optional(),
  createdAt: z.string(), // ISO string
  updatedAt: z.string(), // ISO string
  revision: z.number().int().min(0),
})

export type Transaction = z.infer<typeof transactionSchema>

/**
 * For react-hook-form input.
 * We keep id/timestamps/revision out of the form model.
 */
export const transactionInputSchema = z.object({
  payerId: uuidSchema,
  amount: z.number().min(1, "Amount must be at least 1."),
  type: z.enum(["expense", "earning"]),
  participantIds: z
    .array(uuidSchema)
    .min(1, "Select at least one participant."),
  title: z.string().max(64, "Title must be at most 64 characters.").optional(),
})

export type TransactionInput = z.infer<typeof transactionInputSchema>

/**
 * For editing an existing transaction (patch-like).
 */
export const transactionUpdateSchema = transactionInputSchema.partial()

export type TransactionUpdate = z.infer<typeof transactionUpdateSchema>
