import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  posts: [],
  createdPosts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    try {
      const response = await axios.get(API_BASE_URL + "posts");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const createNewUser = createAsyncThunk(
//   "users/addNewUser",
//   async (initialUser) => {
//     try {
//       const response = await axios.post(
//         API_BASE_URL + "posts",
//         initialUser
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const postsSlice = createSlice({
  name: "posts",
  initialState: initialData,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers(builder) {
    // cases for User Create
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeesed";
        const loadedPosts = action.payload;
        state.posts.push(...loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    //   .addCase(createNewUser.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.createdUsers.push(action.payload);
    //   })
    //   .addCase(createNewUser.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   });
  },
});

export const { changeTab } = postsSlice.actions;

export default postsSlice.reducer;
