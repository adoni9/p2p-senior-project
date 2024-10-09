import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  product: [],
};
export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { createdAt, image, category, _id } = product.payload;
      const product = {
        createdAt: createdAt,
        image: image,
        category: category,
        _id: _id,
      };
      state.product.push(tech);
    },
    removeProduct: (state, action) => {
      state.product = state.product.filter(
        (todo) => todo._id.toString() !== action.payload
      );
    },
    setProduct: (state, action) => {
      const techs = action.payload.map((todo) => ({
        createdAt: todo.createdAt,
        image: todo.image,
        category: todo.category,
        _id: todo._id,
      }));
      state.product = techs;
    },
    updateProduct: (state, action) => {
      const {
        id,
        firstname,
        lastname,
        gender,
        phonenumber,
        deposit,
        email,
        image,
        location,
        token,
      } = action.payload;
      const existingTodo = state.tech.find((todo) => todo.id === id);
      if (existingTodo) {
        (existingTodo.firstname = firstname),
          (existingTodo.lastname = lastname),
          (existingTodo.gender = gender),
          (existingTodo.phonenumber = phonenumber),
          (existingTodo.deposite = deposit),
          (existingTodo.email1 = email),
          (existingTodo.image = image),
          (existingTodo.location = location),
          (existingTodo.token = token);
      }
    },
  },
});
export const { addProduct, removeProduct, setProduct, updateProduct } =
  productReducer.actions;
export default productReducer.reducer;
