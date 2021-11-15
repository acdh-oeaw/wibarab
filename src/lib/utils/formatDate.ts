export function formatDate(date: Date | number): string {
  return Intl.DateTimeFormat('en').format(date)
}
