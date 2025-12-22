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
   * Decimal rounding used during accumulation / netting.
   * 2 is typical for PLN.
   */
  precision?: number
}

function roundTo(value: number, precision: number) {
  const m = 10 ** precision
  const rounded = Math.round(value * m) / m
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
 * Net mutual debts:
 * if A owes B = x and B owes A = y,
 * keep only one direction with |x-y|.
 */
function netLedger(ledger: DebtLedger, precision: number): DebtLedger {
  const result: DebtLedger = {}
  const seen = new Set<string>()

  for (const a of Object.keys(ledger)) {
    for (const b of Object.keys(ledger[a] ?? {})) {
      if (a === b) continue

      const key = a < b ? `${a}|${b}` : `${b}|${a}`
      if (seen.has(key)) continue
      seen.add(key)

      const ab = ledger[a]?.[b] ?? 0
      const ba = ledger[b]?.[a] ?? 0
      const diff = roundTo(ab - ba, precision)

      if (diff > 0) {
        result[a] ??= {}
        result[a][b] = diff // a owes b
      } else if (diff < 0) {
        result[b] ??= {}
        result[b][a] = roundTo(-diff, precision) // b owes a
      }
      // diff === 0 => nothing kept
    }
  }

  return result
}

/**
 * Creates a directed debt ledger from transactions (then nets mutual debts).
 *
 * Rule:
 * - amount is split equally across participantIds
 * - each participant (except payer) owes payer their share
 * - payer may or may not be in participants
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

    if (!friendSet.has(payerId)) continue
    if (participants.length === 0) continue

    const share = roundTo(tx.amount / participants.length, precision)

    for (const participantId of participants) {
      if (participantId === payerId) continue
      addDebt(ledger, participantId, payerId, share, precision)
    }
  }

  // critical: net mutual debts so UI shows reduced totals
  return netLedger(ledger, precision)
}
