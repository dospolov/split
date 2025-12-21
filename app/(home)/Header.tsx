import { ThemeSwitcher } from "@/components/shared/theme-switcher"

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <h1>Split your expenses with friends</h1>
      <ThemeSwitcher />
    </header>
  )
}
