import type { Friend } from "../types"

export function FriendList({ friends }: { friends: Friend[] }) {
  return (
    <div>
      {friends.map((friend) => (
        <div key={friend.id}>{friend.name}</div>
      ))}
    </div>
  )
}
