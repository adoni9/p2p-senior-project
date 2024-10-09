import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  tech: [],
};
export const techReducer = createSlice({
  name: "tech",
  initialState,
  reducers: {
    addTech: (state, action) => {
      const {
        firstname,
        lastname,
        gender,
        phonenumber,
        deposite,
        email1,
        image,
        location,
        _id,
        token,
      } = action.payload;
      const tech = {
        id: nanoid(),
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        phonenumber: phonenumber,
        deposite: deposite,
        email1: email1,
        image: image,
        location: location,
        _id: _id,
        tk: token,
      };
      state.tech.push(tech);
    },
    removeTech: (state, action) => {
      state.tech = state.tech.filter((todo) => todo.id !== action.payload);
    },
    setTech: (state, action) => {
      const techs = action.payload.map((todo) => ({
        id: nanoid(),
        firstname: todo.firstname,
        lastname: todo.lastname,
        gender: todo.gender,
        phonenumber: todo.phonenumber,
        deposite: todo.deposite,
        email1: todo.email1,
        image: todo.image,
        location: todo.location,
        _id: todo._id,
        tk: todo.token,
      }));
      state.tech = techs;
    },
    updateTech: (state, action) => {
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
    logOut: (state, action) => {
      state.tech = action.payload;
    },
  },
});
export const { addTech, removeTech, setTech, updateTech, logOut } =
  techReducer.actions;
export default techReducer.reducer;
