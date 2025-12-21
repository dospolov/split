"use client"

import { useState } from "react"
import type { Friend } from "./types"
import { AddFriendForm } from "./AddFriendForm"

export function PeopleForm() {
  const [friends, setFriends] = useState<Friend[]>([])

  const addFriend = (friend: Friend) => {
    setFriends([...friends, friend])
  }

  return (
    <>
      <AddFriendForm addFriend={addFriend} />
      <div className="flex flex-col gap-4">
        {friends.map((friend) => (
          <div key={friend.id}>{friend.name}</div>
        ))}
      </div>
    </>
  )
}
