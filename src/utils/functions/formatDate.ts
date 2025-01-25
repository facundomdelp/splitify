export const formatTimestampToDate = (timestamp: number) => {
  const formatter = new Intl.DateTimeFormat(undefined, {
    timeZone: 'UTC',
  })

  return formatter.format(timestamp)
}
