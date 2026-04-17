import { createSlice } from "@reduxjs/toolkit";

export const authSlicer = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setError: (state, actions) => {
      state.error = actions.payload;
    },
  },
});

export const { setError, setLoading, setUser } = authSlicer.actions;
export default authSlicer.reducer;
