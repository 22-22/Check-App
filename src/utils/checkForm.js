export const countAllItems = (items, role) => {
  if (items) {
    return items.map(item => item.categoryItems)
      .flat()
      // .filter(item => (role === 'mentor') ? item : !item.checkByMentorOnly)
      .length;
  }
}

export const countCheckedItems = (score) => {
  if (score) {
    return Object.values(score)
      .reduce((acc, val) => acc.concat(val), [])
      .filter(obj => obj.score)
      .length;
  }
}

export const countPoints = (score) => {
  if (score) {
    return Object.values(score)
      .flat()
      .filter(obj => obj.score)
      .map(obj => +obj.score)
      .reduce((acc, val) => acc + val, 0);
  }
}