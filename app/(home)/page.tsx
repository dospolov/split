// app/page.tsx
"use client"

import { useMemo, useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { DebtMatrix } from "@/features/ledger/ui/DebtMatrix"
import { TransactionList } from "@/features/transactions/ui/TransactionList"
import { FriendsPanel } from "@/features/friends/ui/FriendsPanel"
import { createDemoFriends, createDemoTransactions } from "@/shared/demo/seed"

import { Button } from "@/components/ui/button"

export default function Page() {
  const {
    friends,
    transactions,
    addFriend,
    renameFriend,
    deleteFriend,
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
      <FriendsPanel
        friends={friends}
        onAdd={addFriend}
        onRename={renameFriend}
        onDelete={deleteFriend}
      />

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

      <Button
        variant="outline"
        onClick={() => {
          const demoFriends = createDemoFriends()
          const demoTransactions = createDemoTransactions(demoFriends)

          // прямое обновление store
          localStorage.setItem("friends", JSON.stringify(demoFriends))
          localStorage.setItem("transactions", JSON.stringify(demoTransactions))
          location.reload()
        }}
      >
        Load demo data
      </Button>
    </main>
  )
}
