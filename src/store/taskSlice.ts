import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';
import { currentDateTimestamp, TaskStatus } from '../constants';

export interface TaskState {
  tasks: Task[];
  searchKey: string;
}

const initialState: TaskState = {
  tasks: [],
  searchKey: '',
};

const welcomeTask: Task = {
  id: 0,
  title: 'Welcome to Your Task Hub! Let’s achieve your goals together! 🎉',
  desc: "We're excited to help you stay organized. Start adding your tasks now and make every day productive! 🎉",
  status: TaskStatus.PENDING,
  dueDate: currentDateTimestamp,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      if (state.tasks.length === 0) {
        state.tasks.push(welcomeTask);
      }
      state.tasks.unshift(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    updateSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, updateSearchKey } =
  taskSlice.actions;
export default taskSlice.reducer;
