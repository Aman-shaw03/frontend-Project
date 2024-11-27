import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import {parseErrorMessage} from "../../helpers/parseErrMsg.helper"

const initialState = {
    loading: false,
    status: false,
    data: null
}

export const toggleVideoLike = createAsyncThunk("like/toggleVideoLike", async(videoId)=>{
    try {
        const response = await axiosInstance.patch(`/like/videos/${videoId}`)
        return response.data.data
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data))
        throw error
    }
})
export const toggleLike = createAsyncThunk("like/toggleLike", async({toggleLike, qs})=>{
    try {
        //toggle like determines the boolean of true or false for like and qs is additonal query string passed on
        const response = await axiosInstance.patch(`/like?toggleLike=${toggleLike}&${qs}`)
        return response.data.data
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data))
        throw error
    }
})
export const toggleCommentLike = createAsyncThunk("like/toggleCommentLike", async({commentId, toggleLike})=>{
    try {
        const response = await axiosInstance.patch(`/like/comment/${commentId}?toggleLike=${toggleLike}`)
        return response.data.data
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data))
        throw error
    }
})
export const toggleTweetLike = createAsyncThunk("like/toggleTweetLike", async(tweetId)=>{
    try {
        const response = await axiosInstance.patch(`/like/tweet/${tweetId}`)
        return response.data.data
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data))
        throw error
    }
})
export const getLikedVideos = createAsyncThunk("like/toggleVideoLike", async(videoId)=>{
    try {
        const response = await axiosInstance.post(`/like/videos/${videoId}`)
        return response.data.data
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data))
        throw error
    }
})

const likeSlice = createSlice({
    name: "like",
    initialState,
    extraReducers: (builder)=>{
        //getLikedVideos
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
            state.data = null;
          });
          builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
          });
          builder.addCase(getLikedVideos.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });

        //toggleTweetLike
        builder.addCase(toggleTweetLike.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(toggleTweetLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
          });
          builder.addCase(toggleTweetLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });

        //toggleCommentLike
        builder.addCase(toggleCommentLike.pending, (state) => {
            state.loading = true;
            state.data = null;
          });
          builder.addCase(toggleCommentLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
          });
          builder.addCase(toggleCommentLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });

        //toggleLike
        builder.addCase(toggleLike.pending, (state) => {
            state.loading = true;
            state.data = null;
          });
          builder.addCase(toggleLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
          });
          builder.addCase(toggleLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });

        //toggleVideoLike
        builder.addCase(toggleVideoLike.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(toggleVideoLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
          });
          builder.addCase(toggleVideoLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });
    }
})
export default likeSlice.reducer;