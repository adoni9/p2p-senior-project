import { configureStore } from "@reduxjs/toolkit";
import techReducer from "../features/tech/techSlice";
import chatReducer from "../features/chat/chatSlice";
import adminReducer from "../features/admin/adminSlice";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
export const store = configureStore({
  reducer: {
    tech: techReducer,
    chat: chatReducer,
    admin: adminReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
