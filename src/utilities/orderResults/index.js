export const orderResults = (items, sortOption, type) => {
  if (sortOption === "Alphabetical") {
    if (type === "story") {
      return items.sort((item1, item2) =>
        item1.node.title.localeCompare(item2.node.title)
      )
    } else {
      return items.sort((item1, item2) =>
        item1.node.name.localeCompare(item2.node.name)
      )
    }
  } else if (sortOption === "Latest") {
    return items
      .sort(
        (item1, item2) =>
          new Date(item1.node.updatedAt) - new Date(item2.node.updatedAt)
      )
      .reverse()
  }
}
