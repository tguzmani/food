export const sortByDate = (list, order) => {
  if (order === 'asc')
    return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
