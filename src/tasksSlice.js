// tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the tasks slice
const initialState = {
  tasks: [],
  filter: 'all', // Default filter to show all tasks
};

// Create a slice for tasks
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(), // Generate a unique ID based on the current timestamp
        ...action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Selectors
export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks;
  const currentDate = new Date();

  switch (filter) {
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'pending':
      return tasks.filter((task) => !task.completed);
    case 'overdue':
      return tasks.filter((task) => new Date(task.dueDate) < currentDate && !task.completed);
    default: // 'all'
      return tasks;
  }
};

// Export actions from the slice
export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  setFilter,
} = tasksSlice.actions;

// Export the reducer for configuration in the store
export default tasksSlice.reducer;
