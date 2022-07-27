import { createSlice } from '@reduxjs/toolkit';

export const todoStore = createSlice({
  name: 'todos',
  initialState: {
    value: []
  },

  reducers: {
    create: (state, action) => {
      state.value.push(action.payload)
    },  
    remove:(state, action) => {
      state.value = state.value.filter((t=> t.id !== action.payload))
    },

    edit(state, action) {
      state.value = state.value.filter(( t=> t.id !== action.payload.id))
      state.value.push(action.payload);
    }
  }
});

export const  { create, remove, edit } = todoStore.actions;
export default todoStore.reducer;