// features/ledger/derive.ts
import type { FriendsState, Transaction } from "@/shared/schemas"

type UUID = string

/**
 * ledger[fromId][toId] = amount (fromId owes toId)
 * Only positive numbers are stored. Missing/0 = no debt.
 */
export type DebtLedger = Record<UUID, Record<UUID, number>>

type DeriveOptions = {
  /**
   * Decimal rounding used during accumulation to prevent floating drift.
   * 2 is typical for PLN.
   */
  precision?: number
}

function roundTo(value: number, precision: number) {
  const m = 10 ** precision
  const rounded = Math.round(value * m) / m
  // prevent -0
  return Object.is(rounded, -0) ? 0 : rounded
}

function addDebt(
  ledger: DebtLedger,
  fromId: UUID,
  toId: UUID,
  delta: number,
  precision: number,
) {
  if (fromId === toId) return

  const cur = ledger[fromId]?.[toId] ?? 0
  const next = roundTo(cur + delta, precision)

  if (next <= 0) {
    // keep it clean: remove zeros
    if (ledger[fromId]) {
      delete ledger[fromId][toId]
      if (Object.keys(ledger[fromId]).length === 0) delete ledger[fromId]
    }
    return
  }

  ledger[fromId] ??= {}
  ledger[fromId][toId] = next
}

/**
 * Creates a directed debt ledger from transactions.
 *
 * Rule:
 * - amount is split equally across participantIds
 * - each participant (except payer) owes payer their share
 * - payer may or may not be in participants (both are supported)
 */
export function deriveDebtLedger(
  friends: FriendsState,
  transactions: Transaction[],
  options: DeriveOptions = {},
): DebtLedger {
  const precision = options.precision ?? 2
  const friendSet = new Set(friends.allIds)

  const ledger: DebtLedger = {}

  for (const tx of transactions) {
    const payerId = tx.payerId
    const participants = tx.participantIds.filter((id) => friendSet.has(id))

    // if payer is unknown (was removed) or participants empty, skip safely
    if (!friendSet.has(payerId)) continue
    if (participants.length === 0) continue

    const share = roundTo(tx.amount / participants.length, precision)

    for (const participantId of participants) {
      if (participantId === payerId) continue
      addDebt(ledger, participantId, payerId, share, precision)
    }
  }

  return ledger
}

/**
 * Convenience for your lower-triangular UI:
 * - rows/cols come from friends.allIds order
 * - cell is "number | null" where null = render empty
 *
 * You can render only i > j (lower triangle) and show null as empty.
 */
export function deriveDebtCell(
  ledger: DebtLedger,
  fromId: UUID,
  toId: UUID,
): number | null {
  const v = ledger[fromId]?.[toId] ?? 0
  return v === 0 ? null : v
}
