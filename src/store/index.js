import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../features/theme/themeSlice";
import tabsReducer from "../features/tabs/tabsSlice";
import userReducer from "../features/users/usersSlice";
import postReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tabs: tabsReducer,
    users: userReducer,
    posts: postReducer,
  },
});
