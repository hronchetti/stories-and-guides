export const updateFilters = (event, setFilters, filters) => {
  const changedFilter = event.target.name

  if (
    filters.selected.some((selectedFilter) => selectedFilter === changedFilter)
  ) {
    setFilters((curFilters) => ({
      ...curFilters,
      selected: [
        ...curFilters.selected.filter(
          (selectedFilter) => selectedFilter !== changedFilter
        ),
      ],
    }))
  } else {
    setFilters((curFilters) => ({
      ...curFilters,
      selected: [...curFilters.selected, changedFilter],
    }))
  }

  setTimeout(() => {
    setFilters((curFilters) => ({
      ...curFilters,
      visible: false,
    }))
  }, 300)
}
