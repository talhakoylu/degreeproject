import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const InitialAuthData = {
    isReady: false,
    isLoggedIn: false,
    user: {},
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState: InitialAuthData,
  reducers: {
    setReady: (state, { payload }) => ({
      ...state,
      isReady: payload,
    }),
    setStoreAuth: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    resetStoreAuth: (state) => ({
      ...state,
      ...InitialAuthData,
    }),
  },
});

export const authValue = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const { setStoreAuth, resetStoreAuth, setReady } = authSlice.actions;

export default authSlice.reducer;
