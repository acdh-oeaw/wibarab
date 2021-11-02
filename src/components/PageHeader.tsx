import { PageNavigation } from '@/components/PageNavigation'
import { ThemeToggleButton } from '@/components/ThemeToggleButton'

export function PageHeader(): JSX.Element {
  return (
    <header className="py-8 page-section">
      <div className="flex justify-between gap-6 item-center">
        <PageNavigation />
        <ThemeToggleButton />
      </div>
    </header>
  )
}
