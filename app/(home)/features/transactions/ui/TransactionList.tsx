// features/transactions/ui/TransactionList.tsx
"use client"

import { useState } from "react"
import type {
  FriendsState,
  Transaction,
  TransactionInput,
} from "@/shared/schemas"
import { Button } from "@/components/ui/button"
import { TransactionForm } from "./TransactionForm"

type Props = {
  friends: FriendsState
  transactions: Transaction[]
  onAdd: (value: TransactionInput) => void
  onUpdate: (id: string, value: TransactionInput) => void
  onDelete: (id: string) => void
}

export function TransactionList({
  friends,
  transactions,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const editingTx = editingId
    ? transactions.find((t) => t.id === editingId)
    : undefined

  return (
    <div className="space-y-6">
      {/* Add new */}
      <div className="rounded-md border p-4">
        <h3 className="mb-3 text-sm font-medium">Add transaction</h3>
        <TransactionForm friends={friends} onSubmit={(value) => onAdd(value)} />
      </div>

      {/* List */}
      <div className="space-y-3">
        {transactions.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No transactions yet
          </div>
        )}

        {transactions.map((tx) => {
          const payerName = friends.byId[tx.payerId]?.name ?? "Unknown"
          const participantNames = tx.participantIds
            .map((id) => friends.byId[id]?.name)
            .filter(Boolean)
            .join(", ")

          const isEditing = editingId === tx.id

          return (
            <div key={tx.id} className="rounded-md border p-4">
              {!isEditing && (
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {tx.title || "Transaction"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {payerName} {tx.type === "earning" ? "received" : "paid"}{" "}
                      {tx.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Participants: {participantNames || "—"}
                    </div>
                    {tx.revision > 0 && (
                      <div className="text-[10px] text-muted-foreground">
                        edited
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(tx.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(tx.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}

              {isEditing && (
                <TransactionForm
                  friends={friends}
                  initial={tx}
                  onSubmit={(value) => {
                    onUpdate(tx.id, value)
                    setEditingId(null)
                  }}
                  onCancel={() => setEditingId(null)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
