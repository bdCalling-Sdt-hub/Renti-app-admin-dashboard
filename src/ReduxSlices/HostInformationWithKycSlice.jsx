import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../Config'


const initialState = {
    Error: false,
    Success: false,
    Loading: false,
    HostData:[],
    pagination:{}

};

let token=localStorage.getItem("token");


// ${value.page}&search=${value.search}
export const HostInformationWithKycData=createAsyncThunk(

    "HostInfo",
    async (value,thunkAPI) => {
        console.log("user info page number",value)
        try {

            let response=await axios.get(`/api/user/all-host?limit=2&page=${value.page}&search=${value.search}`,{
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${token}`
                }
            });
            console.log("host info data",response.data);
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


export const HostInformationWithKycSlice = createSlice({
    name: 'hostinfo',
    initialState,
    reducers: {
        reset: (state) => {
            state.Loading = false
            state.Success = false
            state.Error = false
            state.HostData=[],
            state.pagination={}

          },
    },
    extraReducers:{
        [HostInformationWithKycData.pending]:(state,action)=>{
            state.Loading = true
        },
        [HostInformationWithKycData.fulfilled]:(state,action)=>{

            state.Loading = false
            state.Success = true
            state.Error = false
            state.HostData=action.payload.hostData,
            state.pagination=action.payload.pagination


        },
        [HostInformationWithKycData.rejected]:(state,action)=>{

            state.Loading = false
            state.Success = false
            state.Error = true
            state.HostData=[],
            state.pagination={}
        },
    }
  })

  // Action creators are generated for each case reducer function
  export const {reset} = HostInformationWithKycSlice.actions

  export default HostInformationWithKycSlice.reducer




