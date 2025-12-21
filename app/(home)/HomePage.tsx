"use client"

import { useState } from "react"
import type { Expense, Friend } from "./types"
import { AddFriendForm } from "./AddFriendForm"
import { AddExpenseForm } from "./AddExpenseForm"

export function HomePage() {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "019b426d-98a5-7759-95c9-c3e66487c8d4",
      name: "John Doe",
    },
    {
      id: "019b426d-a89b-777a-80f8-32f0f6970cf9",
      name: "Jane Doe",
    },
    {
      id: "019b426d-bc30-76ff-a289-ac876a7d61b2",
      name: "John Smith",
    },
  ])
  const [expenses, setExpenses] = useState<Expense[]>([])

  const addFriend = (friend: Friend) => setFriends([...friends, friend])
  const addExpense = (expense: Expense) => setExpenses([...expenses, expense])

  return (
    <>
      <AddFriendForm addFriend={addFriend} friends={friends} />
      <AddExpenseForm addExpense={addExpense} friends={friends} />
      <div className="flex flex-col gap-4">
        {expenses.map((expense) => (
          <div key={expense.id}>
            {expense.title}: {expense.amount} PLN
          </div>
        ))}
      </div>
    </>
  )
}
