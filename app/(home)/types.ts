import * as z from "zod"
import type { addFrendFormSchema } from "./AddFriendForm"

export type Friend = z.infer<typeof addFrendFormSchema> & {
  id: string
}
