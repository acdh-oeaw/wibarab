export function formatDate(date: number | Date): string {
  return Intl.DateTimeFormat('en').format(date)
}
