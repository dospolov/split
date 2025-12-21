import Header from "./Header"
import { PeopleForm } from "./PeopleForm"

export default function Home() {
  return (
    <div className="flex flex-col h-screen space-y-4 max-w-2xl mx-auto">
      <Header />
      <PeopleForm />
    </div>
  )
}
