// features/ledger/ui/DebtMatrix.tsx
"use client"

import { useMemo } from "react"
import type { FriendsState, Transaction } from "@/shared/schemas"
import { cn } from "@/lib/utils"
import { deriveDebtLedger } from "../derive"

type Props = {
  friends: FriendsState
  transactions: Transaction[]
}

export function DebtMatrix({ friends, transactions }: Props) {
  const ids = friends.allIds

  const ledger = useMemo(() => {
    return deriveDebtLedger(friends, transactions)
  }, [friends, transactions])

  if (ids.length === 0) {
    return <div className="text-sm text-muted-foreground">No friends yet</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-xs text-muted-foreground whitespace-nowrap">
              Кто должен ↓ / Кому →
            </th>
            {ids.map((id) => (
              <th
                key={id}
                className="px-2 py-1 font-medium text-left whitespace-nowrap"
              >
                {friends.byId[id]?.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {ids.map((rowId) => (
            <tr key={rowId}>
              <th className="px-2 py-1 font-medium text-left whitespace-nowrap">
                {friends.byId[rowId]?.name}
              </th>

              {ids.map((colId) => {
                // диагональ пустая
                if (colId === rowId) {
                  return <td key={colId} className="px-2 py-1" />
                }

                const value = ledger[rowId]?.[colId] ?? 0

                return (
                  <td
                    key={colId}
                    className={cn(
                      "px-2 py-1 text-right min-w-[4rem]",
                      value > 0 ? "font-medium" : "text-muted-foreground",
                    )}
                    title={
                      value > 0
                        ? `${friends.byId[rowId]?.name} owes ${friends.byId[colId]?.name}`
                        : undefined
                    }
                  >
                    {value > 0 ? value : ""}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
