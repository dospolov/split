import { Button } from "@/components/ui/button"
import type { Expense } from "../types"
import type { Friend } from "../types"

export function ExpenseList({
  expenses,
  friends,
}: {
  expenses: Expense[]
  friends: Friend[]
}) {
  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="flex w-full">
          <div className="w-1/5">{expense.title}</div>
          <div className="w-1/5">{expense.amount} PLN</div>
          <div className="w-1/5">
            From: {friends.find((friend) => friend.id === expense.fromId)?.name}
          </div>
          <div className="w-1/5">
            With:{" "}
            {expense.withId
              .map((id) => friends.find((friend) => friend.id === id)?.name)
              .join(", ")}
          </div>
          <div className="w-1/5 flex justify-end">
            <Button variant="outline">Edit</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
