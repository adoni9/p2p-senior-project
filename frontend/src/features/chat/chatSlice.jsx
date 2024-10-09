import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  chat: [],
};
export const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      const { Message, createdAt } = action.payload;
      const chat = {
        id: nanoid(),
        Message: Message,
        createdAt: createdAt,
      };
      state.chat.push(chat);
    },
    removeChat: (state, action) => {
      state.chat = state.chat.filter((todo) => todo._id !== action.payload);
    },
    setChat: (state, action) => {
      const chats = action.payload.map((todo) => ({
        id: nanoid(),
        _id: todo._id,
        Sender_id: todo.Sender_id,
        Receiver_id: todo.Receiver_id,
        Message: todo.Message,
        image: todo.image,
        createdAt: todo.createdAt,
      }));
      state.chat = chats;
    },
    updateChat: (state, action) => {
      const { Message, image } = action.payload;
      const existingTodo = state.chat.find((todo) => todo.id === id);
      if (existingTodo) {
        (existingTodo.Message = Message), (existingTodo.image = image);
      }
    },
  },
});
export const { addChat, removeChat, setChat, updateChat } = chatReducer.actions;
export default chatReducer.reducer;
