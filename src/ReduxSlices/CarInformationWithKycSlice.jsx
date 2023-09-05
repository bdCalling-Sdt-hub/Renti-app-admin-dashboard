import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../Config'


const initialState = {
    Error: false,
    Success: false,
    Loading: false,
    CarData:[],
    pagination:{}

};

let token=localStorage.getItem("token");


// ${value.page}&search=${value.search}
export const CarInformationWithKycData=createAsyncThunk(

    "CarInfo",
    async (value,thunkAPI) => {
        console.log("car info page number",value)
        try {

            let response=await axios.get(`/api/car/all?page=${value.page}&limit=2&search=${value.search}`,{
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${token}`
                }
            });
            console.log("car info data",response.data);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }

);


export const CarInformationWithKycSlice = createSlice({
    name: 'carinfo',
    initialState,
    reducers: {
        reset: (state) => {
            state.Loading = false
            state.Success = false
            state.Error = false
            state.CarData=[],
            state.pagination={}

          },
    },
    extraReducers:{
        [CarInformationWithKycData.pending]:(state,action)=>{
            state.Loading = true
        },
        [CarInformationWithKycData.fulfilled]:(state,action)=>{
 
            state.Loading = false
            state.Success = true
            state.Error = false
            state.CarData=action.payload.cars,
            state.pagination=action.payload.pagination


        },
        [CarInformationWithKycData.rejected]:(state,action)=>{
           //console.log(action.payload)
            state.Loading = false
            state.Success = false
            state.Error = true
            state.CarData=[],
            state.pagination={}
        },
    }
  })

  // Action creators are generated for each case reducer function
  export const {reset} = CarInformationWithKycSlice.actions

  export default CarInformationWithKycSlice.reducer



