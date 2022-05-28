import { configureStore } from '@reduxjs/toolkit';
import combinedSlices from './slices';

export const resetAction = { type: 'reset' };

const rootSlices = (state, action) => {
  if (action === resetAction) {
    state = undefined;
    localStorage.clear();
  }
  return combinedSlices(state, action);
};

export const store = configureStore({
  reducer: rootSlices,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    });

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

export const resetStore = () => resetAction;