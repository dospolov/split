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
    resetAll,
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
    <main className="mx-auto max-w-2xl p-6 space-y-8">
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

      <TransactionList
        friends={friends}
        transactions={sortedTransactions}
        onAdd={(value) => addTransaction(value)}
        onUpdate={(id, value) => updateTransaction(id, value)}
        onDelete={(id) => deleteTransaction(id)}
      />

      {/* Debts */}
      <section className="space-y-3 md:p-4">
        <DebtMatrix friends={friends} transactions={sortedTransactions} />
      </section>

      <footer className="flex items-center gap-2 pt-6">
        <Button
          variant="outline"
          onClick={() => {
            const demoFriends = createDemoFriends()
            const demoTransactions = createDemoTransactions(demoFriends)

            localStorage.setItem("friends", JSON.stringify(demoFriends))
            localStorage.setItem(
              "transactions",
              JSON.stringify(demoTransactions),
            )
            location.reload()
          }}
        >
          Load demo data
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            if (
              !confirm(
                "Clear everything? This will remove all friends and transactions.",
              )
            ) {
              return
            }
            resetAll()
          }}
        >
          Clear everything
        </Button>
      </footer>
    </main>
  )
}
