import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';
import { TaskStatus } from '../constants';

const initialState: Task[] = [
  {
    id: Date.now(),
    title: 'Task 1',
    desc: 'Description 1',
    status: TaskStatus.PENDING,
    dueDate: Date.now(),
  },
];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },

    deleteTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state[index].status = TaskStatus.DELETED;
      }
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
