export const reorder = (itemOrder, items) => {
  const itemMap = new Map();
  items.forEach(item => {
    itemMap.set(item._id.toString(), item);
  });
  return itemOrder.map(id => itemMap.get(id.toString()));
};

