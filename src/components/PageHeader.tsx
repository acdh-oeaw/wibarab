import { PageNavigation } from '@/components/PageNavigation'
import { ThemeToggleButton } from '@/components/ThemeToggleButton'

export function PageHeader(): JSX.Element {
  return (
    <header className="py-8 page-section">
      <div className="flex items-center justify-between gap-6">
        <PageNavigation />
        <ThemeToggleButton />
      </div>
    </header>
  )
}
