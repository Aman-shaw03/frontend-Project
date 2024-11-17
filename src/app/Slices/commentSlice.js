import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axios.helper";
import { parseErrorMessage } from "../../helpers/parseErrMsg.helper";
import { toast } from "react-toastify";

const initialState = {
    loading : false,
    status: false,
    data: null
}

export const getVideoComments = createAsyncThunk("comment/getVideoComments", async(videoId) => {
    try {
        const response = await axiosInstance.get(`/comment/get/${videoId}`)
        console.log(response);
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting Video Comments. Please try again later.");
        }
        console.log(error);
        throw error;
    }
})

export const addComment = createAsyncThunk("comment/addComment", async({videoId, content}) =>{
    try {
        const response = await axiosInstance.post(`/comment/add/${videoId}`, {content})
        console.log(response);
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Adding Comments. Please try again later.");
        }
        console.log(error);
        throw error;        
    }
})

export const updateComment = createAsyncThunk("comment/updateComment", async({commentId, content}) =>{
    try {
        const response = await axiosInstance.patch(`/comment/${commentId}`, {content})
        toast.success(response.data.message)
        console.log(response);
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Updating Comments. Please try again later.");
        }
        console.log(error);
        throw error;        
    }
})
export const deleteComment = createAsyncThunk("comment/deleteComment", async(commentId) =>{
    try {
        const response = await axiosInstance.delete(`/comment/${commentId}`)
        toast.success(response.data.message)
        console.log(response);
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during deleting Comments. Please try again later.");
        }
        console.log(error);
        throw error;        
    }
})

const commentSlice = createSlice({
    name: "comment",
    initialState,
    extraReducers: (builder) =>{
        //getVideoComments
        builder.addCase(getVideoComments.pending, (state) =>{
            state.loading = true,
            state.data = []
        })
        builder.addCase(getVideoComments.fulfilled, (state, action) =>{
            state.loading = false,
            state.data = action.payload,
            state.status = true
        })
        builder.addCase(getVideoComments.rejected, (state) =>{
            state.loading = false,
            state.status = false
        })

        //addComment

        builder.addCase(addComment.pending, (state) =>{
            state.loading = true,
            state.data = null
        })
        builder.addCase(addComment.fulfilled, (state, action) =>{
            state.loading = false,
            state.data.unshift(action.payload)
            state.status = true
        })
        builder.addCase(addComment.rejected, (state) =>{
            state.loading = false,
            state.status = false
        })
        //updateContent
        builder.addCase(updateComment.pending, (state) =>{
            state.loading = true,
            state.data = null
        })
        builder.addCase(updateComment.fulfilled, (state, action) =>{
            state.loading = false,
            // state.data = action.payload
            state.status = true
        })
        builder.addCase(updateComment.rejected, (state) =>{
            state.loading = false,
            state.status = false
        })
        //deleteContent
        builder.addCase(deleteComment.pending, (state) =>{
            state.loading = true,
            state.data = null
        })
        builder.addCase(deleteComment.fulfilled, (state, action) =>{
            state.loading = false,
            // state.data = action.payload
            state.status = true
        })
        builder.addCase(deleteComment.rejected, (state) =>{
            state.loading = false,
            state.status = false
        })
    }
})

export default commentSlice.reducer