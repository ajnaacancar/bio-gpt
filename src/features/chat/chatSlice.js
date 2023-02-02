import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  isError: false,
  isSuccess: false,
  messages: [],
  isLoading: false,
};

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (message, thunkAPI) => {
    try {
      return await chatService.sendMessage(message);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendMessage.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(sendMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.messages = action.payload;
          })
          .addCase(sendMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;

          })
    }
})


export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
