import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";

export const getAllSources = createAsyncThunk(
  "sources/getAllSources",
  async (thunkAPI) => {
    try {
      const response = await axiosInst.get("/sources");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
