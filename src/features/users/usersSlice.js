import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  users: [],
  createdUsers: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    try {
      const response = await axios.get(API_BASE_URL + "users");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createNewUser = createAsyncThunk(
  "users/addNewUser",
  async (initialUser) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "users",
        initialUser
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: initialData,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers(builder) {
    // cases for User Create
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeesed";
        const loadedUsers = action.payload;
        state.users.push(...loadedUsers.data);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createdUsers.push(action.payload);
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeTab } = usersSlice.actions;

export default usersSlice.reducer;
