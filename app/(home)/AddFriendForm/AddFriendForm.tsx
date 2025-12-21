"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Friend } from "../types"
import { addFrendFormSchema } from "../schema"

export function AddFriendForm({
  addFriend,
  friends,
}: {
  addFriend: (friend: Friend) => void
  friends: Friend[]
}) {
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: addFrendFormSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("You have added a new person")
      addFriend({
        id: crypto.randomUUID(),
        name: value.name,
      })
      form.reset()
    },
  })

  return (
    <div className="flex gap-4">
      <Card className="w-full w-3/4">
        <CardHeader>
          <CardTitle>Add a new friend</CardTitle>
          <CardDescription>This cannot be changed later.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="add-friend-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Alex"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="add-friend-form">
              Add
            </Button>
          </Field>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-4 w-1/4">
        {friends.map((friend) => (
          <div key={friend.id}>{friend.name}</div>
        ))}
      </div>
    </div>
  )
}
