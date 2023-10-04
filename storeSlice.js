import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    clearUserData: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
