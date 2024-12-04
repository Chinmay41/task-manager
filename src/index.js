import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice'; // Import the tasksReducer from tasksSlice.js
import App from './App';

const store = configureStore({
  reducer: {
    tasks: tasksReducer, // This connects the reducer to Redux
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
