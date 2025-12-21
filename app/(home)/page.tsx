import Header from "./Header"
import { PeopleForm } from "./PeopleForm"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Header />
      <PeopleForm />
    </div>
  )
}
