import { createSlice } from "@reduxjs/toolkit";
import { getAllSources } from "./operations";

const sourcesSlice = createSlice({
  name: "sources",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetDataState(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllSources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getAllSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default sourcesSlice.reducer;
