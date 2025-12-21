"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Person = {
  name: string
  id: string
}

export default function PeopleForm() {
  const [people, setPeople] = useState<Person[]>([])

  return (
    <>
      <FieldSet>
        <FieldLegend>Friend list</FieldLegend>
        <FieldDescription>
          Add your friends to the list. List cannot be changed later.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Friend name</FieldLabel>
            <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
          </Field>
          <Field orientation="horizontal">
            <Button
              onClick={() =>
                setPeople([...people, { name: "", id: crypto.randomUUID() }])
              }
            >
              Add friend
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>

      <div>
        {people.map((person) => (
          <div key={person.id}>
            <p>{person.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
