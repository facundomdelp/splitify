type TableNames = {
  GROUPS: string
  EXPENSES: string
}

export const tableNames = () => {
  const names: TableNames = {
    GROUPS: `groups`,
    EXPENSES: `expenses`,
  }

  if (process.env.ENVIRONMENT === 'development') {
    return Object.entries(names).reduce((acc, [key, value]) => {
      acc[key as keyof TableNames] = `dev-${value}`
      return acc
    }, {} as TableNames)
  }

  return names
}
