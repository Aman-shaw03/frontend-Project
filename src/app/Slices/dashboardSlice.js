import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import {parseErrorMessage} from "../../helpers/formatFigures"

const initialState = {
    loading: false,
    status: false,
    data: {}
}

export const getChannelStats = createAsyncThunk("dashboard/getChannelStats", async()=>{
    try {
        const response = await axiosInstance.get("/dashboard/stats")
        console.log(response);
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting channel stats. Please try again later.");
        }
        console.log(error);
        throw error;
    }
})
export const getChannelVideos = createAsyncThunk("dashboard/getChannelVideos", async()=>{
    try {
        const response = await axiosInstance.get("/dashboard/videos")
        console.log(response);
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting channel videos. Please try again later.");
        }
        console.log(error);
        throw error;
    }
})

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    extraReducers: (builder)=>{
        //getChannelStats
        builder.addCase(getChannelStats.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(getChannelStats.fulfilled, (state, action) => {
            state.loading = false;
            state.data.channelStates = action.payload;
            state.status = true;
          });
          builder.addCase(getChannelStats.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });

        //getChannelVideos
        builder.addCase(getChannelVideos.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(getChannelVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.data.channelVideos = action.payload;
            state.status = true;
          });
          builder.addCase(getChannelVideos.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });
    }
})

export default dashboardSlice.reducer