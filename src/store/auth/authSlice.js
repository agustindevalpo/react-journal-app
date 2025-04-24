
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {

    },

    logout: (state, payload) => {

    },

    checkingCredentials: (state) => {

      state.status = 'not-authenticated', // not-authenticated, authenticated
      state.uid = null,
      state.email = null;
      state.displayName = null;
      state.photoUrl = null;
      state.errorMessage = null;

    }
  }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;

export default authSlice.reducer;