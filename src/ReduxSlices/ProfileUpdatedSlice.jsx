import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  adminData: {},
};

const token = localStorage.token;

export const AdminData = createAsyncThunk(
  "AdminData",
  async (value, thunkAPI) => {
    try {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));

      let response = await axios.post(
        `api/user/update/${userFromLocalStorage._id}`,
        value,
        {
          headers: {
            "Content-type": "application/multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("yourInfo", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      if (
        "You are not authorised to sign in now" === error.response.data.message
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("yourInfo");
      }
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

export const adminSlice = createSlice({
  name: "adminData",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.adminData = {};
    },
  },

  extraReducers: {
    [AdminData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [AdminData.fulfilled]: (state, action) => {
      console.log(action.payload.user);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.adminData = action.payload.user;
    },
    [AdminData.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = adminSlice.actions;

export default adminSlice.reducer;
