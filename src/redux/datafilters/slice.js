import { createSlice } from "@reduxjs/toolkit";
import generateTrackNumbers from "../../auxiliary/generateTrackNumbers";
import { logOut } from "../auth/operations";
import generateImmConsistentValues from "../../auxiliary/generateImmConsistentValues";

const initialState = {
  trackNum: "All",
  selectedTrackNums: generateTrackNumbers(29),
  trackNumbers: generateTrackNumbers(29),
  immConsistent: "All",
  immConsistentValues: generateImmConsistentValues(),
  immConsistentMaxValue: "0.0",
  startTime: "",
  endTime: "",
  is3D: false,
};

const dataFiltersSlice = createSlice({
  name: "datafilters",
  initialState,
  reducers: {
    saveTrackNum: (state, action) => {
      state.trackNum = action.payload;
    },

    saveSelectedTrackNums: (state, action) => {
      state.selectedTrackNums = action.payload;
    },

    saveImmConsistent: (state, action) => {
      state.immConsistent = action.payload;
    },

    saveImmConsistentMaxValue: (state, action) => {
      state.immConsistentMaxValue = action.payload;
    },

    updateTrackNumbers: (state, action) => {
      state.selectedTrackNums = [...action.payload];
      state.trackNumbers = action.payload;
      state.trackNumbers.push("All");
    },

    saveTime: (state, action) => {
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },

    setIs3D: (state, action) => {
      state.is3D = action.payload;
    },

    resetDataFilters: (state) => {
      state.trackNum = "All";
      state.immConsistent = "All";
      state.immConsistentMaxValue = "0.0";
      state.startTime = "";
      state.endTime = "";
    },

    resetAll: (state) => {
      state.trackNum = "All";
      state.selectedTrackNums = generateTrackNumbers(29);
      state.trackNumbers = generateTrackNumbers(29);
      state.immConsistent = "All";
      state.immConsistentValues = generateImmConsistentValues();
      state.immConsistentMaxValue = "0.0";
      state.startTime = "";
      state.endTime = "";
      state.is3D = false;
    },

    extraReducers: (builder) => {
      builder.addCase(logOut.fulfilled, () => initialState);
    },
  },
});

export const {
  saveTrackNum,
  saveSelectedTrackNums,
  saveImmConsistent,
  saveImmConsistentMaxValue,
  updateTrackNumbers,
  saveTime,
  setIs3D,
  resetDataFilters,
} = dataFiltersSlice.actions;
export default dataFiltersSlice.reducer;
