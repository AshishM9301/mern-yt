import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import auth from "./features/auth";

export const store = configureStore({
  reducer: {
    auth: auth,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
