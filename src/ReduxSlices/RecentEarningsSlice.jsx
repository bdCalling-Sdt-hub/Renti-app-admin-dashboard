import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../Config'


const initialState = {
    Error: false,
    Success: false,
    Loading: false,
    recentEarning:[],
    pagination:{}

};

let token=localStorage.getItem("token");

export const RecentEarningsData=createAsyncThunk(

    "RecentEarning",
    async (value,thunkAPI) => {
        console.log(value)
        try {
           
            let response=await axios.get(`api/dashboard/earnings/${value.income}?page=${value.page}&limit=1`,{
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${token}`
                }
            });
            console.log("saiful",response.data);
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


export const RecentEarningsSlice = createSlice({
    name: 'recentearning',
    initialState,
    reducers: {
        reset: (state) => {
            state.Loading = false
            state.Success = false
            state.Error = false
            state.recentEarning=[]
            state.pagination={}
         
          },
    },
    extraReducers:{
        [RecentEarningsData.pending]:(state,action)=>{
            state.Loading = true
        },
        [RecentEarningsData.fulfilled]:(state,action)=>{
            //console.log("tushar-saiful",action.payload)
            state.Loading = false
            state.Success = true
            state.Error = false
            state.recentEarning=action.payload.allEarning
            state.pagination=action.payload.pagination
         
        },
        [RecentEarningsData.rejected]:(state,action)=>{
           
            state.Loading = false
            state.Success = false
            state.Error = true
            state.recentEarning=[]
            state.pagination={}
         
        },
    }
  })
  
  // Action creators are generated for each case reducer function
  export const {reset} = RecentEarningsSlice.actions
  
  export default RecentEarningsSlice.reducer



