import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  login: null,
  error: null,
};

export const publishLogin = createAsyncThunk(
  "login/publishLogin",
  async (initialLogin) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "login",
        initialLogin
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: initialData,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers(builder) {
    // cases for User Create
    builder
      .addCase(publishLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.login = action.payload;
      })
      .addCase(publishLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeTab } = loginSlice.actions;

export default loginSlice.reducer;
