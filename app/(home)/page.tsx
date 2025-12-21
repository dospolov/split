import { Button } from "@/components/ui/button"
import Header from "./Header"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Header />
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  )
}
