// shared/demo/seed.ts
import type { FriendsState, Transaction } from "@/shared/schemas"

export function createDemoFriends(): FriendsState {
  const ivan = crypto.randomUUID()
  const oleg = crypto.randomUUID()
  const misha = crypto.randomUUID()
  const alex = crypto.randomUUID()

  return {
    byId: {
      [ivan]: { id: ivan, name: "Иван" },
      [oleg]: { id: oleg, name: "Олег" },
      [misha]: { id: misha, name: "Миша" },
      [alex]: { id: alex, name: "Алекс" },
    },
    allIds: [ivan, oleg, misha, alex],
  }
}

export function createDemoTransactions(friends: FriendsState): Transaction[] {
  const [ivan, oleg, misha, alex] = friends.allIds

  const now = new Date().toISOString()

  return [
    {
      id: crypto.randomUUID(),
      payerId: ivan,
      amount: 100,
      participantIds: [ivan, oleg, misha],
      title: "Pizza",
      createdAt: now,
      updatedAt: now,
      revision: 0,
    },
    {
      id: crypto.randomUUID(),
      payerId: misha,
      amount: 66,
      participantIds: [oleg, alex],
      title: "Beer",
      createdAt: now,
      updatedAt: now,
      revision: 0,
    },
  ]
}
