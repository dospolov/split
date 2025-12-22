// features/ledger/ui/DebtMatrix.tsx
"use client"

import type { FriendsState, Transaction } from "@/shared/schemas"
import { cn } from "@/lib/utils"
import { deriveDebtCell, deriveDebtLedger } from "../derive"

type Props = {
  friends: FriendsState
  transactions: Transaction[]
}

export function DebtMatrix({ friends, transactions }: Props) {
  const ledger = deriveDebtLedger(friends, transactions)
  const ids = friends.allIds

  if (ids.length === 0) {
    return <div className="text-sm text-muted-foreground">No friends yet</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            {/* Legend cell */}
            <th className="px-2 py-1 text-xs text-muted-foreground whitespace-nowrap">
              From ↓ / To →
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
          {ids.map((rowId, rowIndex) => (
            <tr key={rowId}>
              {/* Row header */}
              <th className="px-2 py-1 font-medium text-left whitespace-nowrap">
                {friends.byId[rowId]?.name}
              </th>

              {ids.map((colId, colIndex) => {
                // показываем только нижний треугольник
                if (colIndex >= rowIndex) {
                  return <td key={colId} className="px-2 py-1" />
                }

                const value = deriveDebtCell(ledger, rowId, colId)

                return (
                  <td
                    key={colId}
                    className={cn(
                      "px-2 py-1 text-right min-w-[3rem]",
                      value ? "font-medium" : "text-muted-foreground",
                    )}
                  >
                    {value ?? ""}
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
