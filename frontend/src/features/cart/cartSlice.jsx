import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartt: (state, action) => {
      const { status, money, itemId, userId } = action.payload;

      // Check if an item with the same itemId and userId already exists
      const existingItemIndex = state.cart.findIndex(
        (item) => item.itemId === itemId && item.userId === userId
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update the existing item
        state.cart[existingItemIndex] = {
          ...state.cart[existingItemIndex],
          status: status,
          money: money,
        };
      } else {
        // Item not found, add it to the cart
        const cart = {
          id: nanoid(),
          status: status,
          money: money,
          itemId: itemId,
          userId: userId,
        };
        state.cart.push(cart);
      }
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((todo) => todo.itemId !== action.payload);
    },
    setCart: (state, action) => {
      const carts = action.payload.map((todo) => ({
        id: nanoid(),
        status: todo.status,
        money: todo.money,
      }));
      state.cart = carts;
    },
    updateCart: (state, action) => {
      const { status, itemId, money } = action.payload;
      const existingTodo = state.cart.find((todo) => todo.itemId === itemId);
      if (existingTodo) {
        existingTodo.status = status;
        existingTodo.money = money;
      }
    },
  },
});
export const { addCartt, updateCart, setCart, removeCart } =
  cartReducer.actions;
export default cartReducer.reducer;
