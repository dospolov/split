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
        <div key={expense.id}>
          <div>{expense.title}</div>
          <div>{expense.amount} PLN</div>
          <div>
            From: {friends.find((friend) => friend.id === expense.fromId)?.name}
          </div>
          <div>
            With:{" "}
            {expense.withId
              .map((id) => friends.find((friend) => friend.id === id)?.name)
              .join(", ")}
          </div>
        </div>
      ))}
    </div>
  )
}
