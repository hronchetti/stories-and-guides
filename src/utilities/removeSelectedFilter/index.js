export const removeSelectedFilter = (changedFilter, setFilters) => {
  setFilters((curFilters) => ({
    ...curFilters,
    selected: [
      ...curFilters.selected.filter(
        (selectedFilter) => selectedFilter !== changedFilter
      ),
    ],
  }))
}
