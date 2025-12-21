"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import type { z } from "zod"

type FormValues = z.infer<typeof addFrendFormSchema>

export function AddFriendForm({
  addFriend,
  friends,
}: {
  addFriend: (friend: Friend) => void
  friends: Friend[]
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(addFrendFormSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    toast.success("You have added a new person")

    addFriend({
      id: crypto.randomUUID(),
      name: values.name,
    })

    reset()
  }

  const isInvalid = touchedFields.name && !!errors.name

  return (
    <div className="flex gap-4">
      <Card className="w-full w-3/4">
        <CardHeader>
          <CardTitle>Add a new friend</CardTitle>
          <CardDescription>This cannot be changed later.</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="add-friend-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>

                <Input
                  id="name"
                  placeholder="Alex"
                  autoComplete="off"
                  aria-invalid={isInvalid}
                  {...register("name")}
                />

                {isInvalid && (
                  <FieldError
                    errors={[{ message: errors.name?.message }].filter(Boolean)}
                  />
                )}
              </Field>
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
