import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/taskStore';

const useFilteredTasksbySearchKey = () => {
  const { tasks, searchKey } = useSelector((store: RootState) => store.task);

  const filteredTasks = useMemo(() => {
    if (!searchKey || searchKey.trim() === '') {
      return tasks;
    }
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        task.desc.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [tasks, searchKey]);

  return filteredTasks;
};

export default useFilteredTasksbySearchKey;
