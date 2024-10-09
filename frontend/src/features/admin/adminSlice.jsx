import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  admin: [],
};
export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      const { _id, firstname, lastname, gender, phonenumber, email, image } =
        action.payload;
      const admin = {
        id: nanoid(),
        _id: _id,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        phonenumber: phonenumber,
        email: email,
        image: image,
      };
      state.admin.push(admin);
    },
    removeAdmin: (state, action) => {
      state.admin = state.admin.filter((todo) => todo.id !== action.payload);
    },
    setAdmin: (state, action) => {
      const admins = action.payload.map((todo) => ({
        id: nanoid(),
        firstname: todo.firstname,
        lastname: todo.lastname,
        gender: todo.gender,
        phonenumber: todo.phonenumber,
        email: todo.email,
        image: todo.image,
        _id: todo._id,
      }));
      state.admin = admins;
    },
    updateAdmin: (state, action) => {
      const { id, firstname, lastname, gender, phonenumber, email, image } =
        action.payload;
      const existingTodo = state.admin.find((todo) => todo.id === id);
      if (existingTodo) {
        (existingTodo.firstname = firstname),
          (existingTodo.lastname = lastname),
          (existingTodo.gender = gender),
          (existingTodo.phonenumber = phonenumber),
          (existingTodo.email = email),
          (existingTodo.image = image);
      }
    },
  },
});
export const { addAdmin, removeAdmin, setAdmin, updateAdmin } =
  adminReducer.actions;
export default adminReducer.reducer;
