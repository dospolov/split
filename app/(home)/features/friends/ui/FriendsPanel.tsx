// features/friends/ui/FriendsPanel.tsx
"use client"

import { useState } from "react"
import type { FriendsState } from "@/shared/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  friends: FriendsState
  onAdd: (id: string, name: string) => void
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
}

export function FriendsPanel({ friends, onAdd, onRename, onDelete }: Props) {
  const [newFriendName, setNewFriendName] = useState("")

  const canAdd = newFriendName.trim().length > 0

  return (
    <section className="space-y-3 rounded-md border p-4">
      <h2 className="text-sm font-medium">Friends</h2>

      <div className="flex gap-2">
        <Input
          placeholder="Add friend name"
          value={newFriendName}
          onChange={(e) => setNewFriendName(e.target.value)}
        />
        <Button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            const name = newFriendName.trim()
            if (!name) return
            onAdd(crypto.randomUUID(), name)
            setNewFriendName("")
          }}
        >
          Add
        </Button>
      </div>

      {friends.allIds.length === 0 ? (
        <div className="text-sm text-muted-foreground">No friends yet</div>
      ) : (
        <div className="space-y-2">
          {friends.allIds.map((id) => (
            <div key={id} className="flex items-center gap-2">
              <Input
                value={friends.byId[id]?.name ?? ""}
                onChange={(e) => onRename(id, e.target.value)}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => onDelete(id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
