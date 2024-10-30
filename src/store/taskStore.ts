import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice';

const taskStore = configureStore({
  reducer: {
    task: taskSlice,
  },
});

export type RootState = ReturnType<typeof taskStore.getState>;

export default taskStore;
