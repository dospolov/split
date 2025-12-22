"use client"

import { useState } from "react"
import type { Expense, Friend } from "./types"
import { AddFriendForm } from "./AddFriendForm"
import { AddExpenseForm } from "./AddExpenseForm"
import { ExpenseList } from "./ExpenseList"

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
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "019b474d-b125-750b-b2d7-870a0c3e43ff",
      title: "Beer for 2",
      amount: 100,
      fromId: "019b426d-98a5-7759-95c9-c3e66487c8d4",
      withId: [
        "019b426d-98a5-7759-95c9-c3e66487c8d4",
        "019b426d-bc30-76ff-a289-ac876a7d61b2",
      ],
    },
  ])

  const addFriend = (friend: Friend) => setFriends([...friends, friend])
  const addExpense = (expense: Expense) => setExpenses([...expenses, expense])

  return (
    <>
      <div className="flex gap-4">
        <div className="w-3/4">
          <AddFriendForm addFriend={addFriend} />
        </div>
        <div className="w-1/4">
          {friends.map((friend) => (
            <div key={friend.id}>{friend.name}</div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-3/4">
          <AddExpenseForm addExpense={addExpense} friends={friends} />
        </div>
        <div className="flex flex-col gap-4 w-1/4">
          <ExpenseList expenses={expenses} friends={friends} />
        </div>
      </div>
    </>
  )
}
