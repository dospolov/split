// app/page.tsx
"use client"

import { useMemo, useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { DebtMatrix } from "@/features/ledger/ui/DebtMatrix"
import { TransactionList } from "@/features/transactions/ui/TransactionList"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  const {
    friends,
    transactions,
    addFriend,
    renameFriend,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useAppStore()

  // stable display: sort by createdAt (oldest -> newest)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    )
  }, [transactions])

  // ---- add friend UI ----
  const [newFriendName, setNewFriendName] = useState("")

  const canAddFriend = newFriendName.trim().length > 0

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <section className="space-y-3">
        <h1 className="text-xl font-semibold">Split</h1>
        <p className="text-sm text-muted-foreground">
          Friends + transactions are stored. Debts are derived.
        </p>
      </section>

      {/* Friends */}
      <section className="space-y-3 rounded-md border p-4">
        <h2 className="text-sm font-medium">Friends</h2>

        <div className="flex gap-2">
          <Input
            placeholder="Add friend name"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
          />
          <Button
            type="button"
            disabled={!canAddFriend}
            onClick={() => {
              const name = newFriendName.trim()
              if (!name) return
              addFriend(crypto.randomUUID(), name)
              setNewFriendName("")
            }}
          >
            Add
          </Button>
        </div>

        {friends.allIds.length === 0 ? (
          <div className="text-sm text-muted-foreground">No friends yet</div>
        ) : (
          <div className="space-y-2">
            {friends.allIds.map((id) => (
              <div key={id} className="flex items-center gap-2">
                <Input
                  value={friends.byId[id]?.name ?? ""}
                  onChange={(e) => renameFriend(id, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Transactions */}
      <section className="space-y-3 rounded-md border p-4">
        <h2 className="text-sm font-medium">Transactions</h2>
        <TransactionList
          friends={friends}
          transactions={sortedTransactions}
          onAdd={(value) => addTransaction(value)}
          onUpdate={(id, value) => updateTransaction(id, value)}
          onDelete={(id) => deleteTransaction(id)}
        />
      </section>

      {/* Debts */}
      <section className="space-y-3 rounded-md border p-4">
        <h2 className="text-sm font-medium">Debts</h2>
        <DebtMatrix friends={friends} transactions={sortedTransactions} />
      </section>
    </main>
  )
}
