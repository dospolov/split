"use client"

import { useState } from "react"
import type { Expense, Friend } from "./types"
import { AddFriendForm } from "./AddFriendForm"
import { AddExpenseForm } from "./AddExpenseForm"

export function PeopleForm() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])

  const addFriend = (friend: Friend) => setFriends([...friends, friend])
  const addExpense = (expense: Expense) => setExpenses([...expenses, expense])

  return (
    <>
      <AddFriendForm addFriend={addFriend} />
      <div className="flex flex-col gap-4">
        {friends.map((friend) => (
          <div key={friend.id}>{friend.name}</div>
        ))}
      </div>
      <AddExpenseForm addExpense={addExpense} />
      <div className="flex flex-col gap-4">
        {expenses.map((expense) => (
          <div key={expense.id}>{expense.title}</div>
        ))}
      </div>
    </>
  )
}
