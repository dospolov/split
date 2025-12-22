"use client"

import { useCallback } from "react"
import { useLocalStorage } from "usehooks-ts"
import {
  friendsStateSchema,
  transactionSchema,
  type FriendsState,
  type Transaction,
  type TransactionInput,
  type TransactionUpdate,
} from "@/shared/schemas"

/**
 * Helpers
 */
function nowIso() {
  return new Date().toISOString()
}

function createEmptyFriendsState(): FriendsState {
  return {
    byId: {},
    allIds: [],
  }
}

/**
 * Store
 */
export function useAppStore() {
  // ---- friends ----
  const [friends, setFriends] = useLocalStorage<FriendsState>(
    "friends",
    createEmptyFriendsState(),
    {
      initializeWithValue: false,
      serializer: (value) => JSON.stringify(friendsStateSchema.parse(value)),
      deserializer: (value) => friendsStateSchema.parse(JSON.parse(value)),
    },
  )

  // ---- transactions ----
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "transactions",
    [],
    {
      initializeWithValue: false,
      serializer: (value) =>
        JSON.stringify(value.map((t) => transactionSchema.parse(t))),
      deserializer: (value) =>
        transactionSchema.array().parse(JSON.parse(value)),
    },
  )

  // ---- friends actions ----
  const addFriend = useCallback(
    (id: string, name: string) => {
      setFriends((prev) => {
        if (prev.byId[id]) return prev

        return {
          byId: {
            ...prev.byId,
            [id]: { id, name },
          },
          allIds: [...prev.allIds, id],
        }
      })
    },
    [setFriends],
  )

  const renameFriend = useCallback(
    (id: string, name: string) => {
      setFriends((prev) => {
        if (!prev.byId[id]) return prev

        return {
          ...prev,
          byId: {
            ...prev.byId,
            [id]: { ...prev.byId[id], name },
          },
        }
      })
    },
    [setFriends],
  )

  const deleteFriend = useCallback(
    (id: string) => {
      // 1) remove friend
      setFriends((prev) => {
        if (!prev.byId[id]) return prev

        const { [id]: _, ...rest } = prev.byId
        return {
          byId: rest,
          allIds: prev.allIds.filter((x) => x !== id),
        }
      })

      // 2) update transactions:
      // - remove friend from participantIds
      // - if payerId was this friend -> drop tx (or you could require reassign)
      // - if participants become empty -> drop tx
      setTransactions((prev) =>
        prev
          .map((tx) => {
            if (tx.payerId === id) return null

            const nextParticipants = tx.participantIds.filter((x) => x !== id)
            if (nextParticipants.length === 0) return null

            if (nextParticipants.length !== tx.participantIds.length) {
              return {
                ...tx,
                participantIds: nextParticipants,
                updatedAt: new Date().toISOString(),
                revision: tx.revision + 1,
              }
            }

            return tx
          })
          .filter((x): x is Transaction => x !== null),
      )
    },
    [setFriends, setTransactions],
  )

  // ---- transaction actions ----
  const addTransaction = useCallback(
    (input: TransactionInput) => {
      setTransactions((prev) => {
        const tx: Transaction = {
          id: crypto.randomUUID(),
          payerId: input.payerId,
          amount: input.amount,
          participantIds: input.participantIds,
          title: input.title,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          revision: 0,
        }

        return [...prev, tx]
      })
    },
    [setTransactions],
  )

  const updateTransaction = useCallback(
    (id: string, patch: TransactionUpdate) => {
      setTransactions((prev) =>
        prev.map((tx) => {
          if (tx.id !== id) return tx

          const next: Transaction = {
            ...tx,
            ...patch,
            updatedAt: nowIso(),
            revision: tx.revision + 1,
          }

          return transactionSchema.parse(next)
        }),
      )
    },
    [setTransactions],
  )

  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id))
    },
    [setTransactions],
  )

  return {
    friends,
    transactions,

    addFriend,
    renameFriend,
    deleteFriend,

    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
