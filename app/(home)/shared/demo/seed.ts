// shared/demo/seed.ts
import type { FriendsState, Transaction } from "@/shared/schemas"

export function createDemoFriends(): FriendsState {
  const ivan = crypto.randomUUID()
  const marat = crypto.randomUUID()
  const george = crypto.randomUUID()

  return {
    byId: {
      [ivan]: { id: ivan, name: "Ivan" },
      [marat]: { id: marat, name: "Marat" },
      [george]: { id: george, name: "George" },
    },
    allIds: [ivan, marat, george],
  }
}

export function createDemoTransactions(friends: FriendsState): Transaction[] {
  const [ivan, marat, george] = friends.allIds

  const now = new Date().toISOString()

  return [
    {
      id: crypto.randomUUID(),
      payerId: ivan,
      amount: 100,
      participantIds: [ivan, marat, george],
      title: "Pizza",
      createdAt: now,
      updatedAt: now,
      revision: 0,
    },
    {
      id: crypto.randomUUID(),
      payerId: george,
      amount: 100,
      participantIds: [marat, george],
      title: "Beer",
      createdAt: now,
      updatedAt: now,
      revision: 0,
    },
  ]
}
