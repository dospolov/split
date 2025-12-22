// shared/demo/seed.ts
import type { FriendsState, Transaction } from "@/shared/schemas"

export function createDemoFriends(): FriendsState {
  const ivan = crypto.randomUUID()
  const marat = crypto.randomUUID()
  const george = crypto.randomUUID()
  const dima = crypto.randomUUID()

  return {
    byId: {
      [ivan]: { id: ivan, name: "Ivan" },
      [marat]: { id: marat, name: "Marat" },
      [george]: { id: george, name: "George" },
      [dima]: { id: dima, name: "Dima" },
    },
    allIds: [ivan, marat, george, dima],
  }
}

export function createDemoTransactions(friends: FriendsState): Transaction[] {
  const [ivan, marat, george, dima] = friends.allIds

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
      amount: 66,
      participantIds: [marat, dima],
      title: "Beer",
      createdAt: now,
      updatedAt: now,
      revision: 0,
    },
  ]
}
