import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

export interface TaskState {
  tasks: Task[];
  searchKey: string;
  isLandedFirstTime: boolean;
}

const initialState: TaskState = {
  tasks: [],
  searchKey: '',
  isLandedFirstTime: true,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
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
    updateIsLandedFirstTime: (state) => {
      state.isLandedFirstTime = false;
    },
  },
});

export const { addTask, deleteTask, updateTask, updateSearchKey, updateIsLandedFirstTime } =
  taskSlice.actions;
export default taskSlice.reducer;
