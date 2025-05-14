export const reorderTasks = (taskOrder, tasks) => {
  const taskMap = new Map();
  tasks.forEach(task => {
    taskMap.set(task._id.toString(), task);
  });
  return taskOrder.map(id => taskMap.get(id.toString()));
};

