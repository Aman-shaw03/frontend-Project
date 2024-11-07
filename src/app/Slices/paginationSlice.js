import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import {parseErrorMessage} from "../../helpers/formatFigures"

const initialState = {
    loading: false,
    status: false,
    data: {videos:[], pagingInfo:{}}
}

export const getAllVideosByOption = createAsyncThunk(
    "pagingVideos/getAllVideosByOption", 
    async({...queryData}, {signal}) =>{
    try {
        const queryString = 
        "?"+ Object.entries(queryData)
        .map(([key,value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}` )
        .join("&")
        // here we used the querydata entries, extract them with map and set them like in  url using (encodeURIComponent which ensures the words we are putting in URL is safe and join them using &)

        const controller = new AbortController() // this create a new abortController Object 
        // its allows to abort one or more fetch or DOM request when it gets the signal , and we will put it in the fetch request too

        signal.addEventListener("abort", ()=>{
            controller.abort()
        })
        // when we does controller.signal it returns a abortsignal object which represents the signal associated with the AbortController. This signal can be used to abort the request. so with controller.signal , we are using this signal code.

        const response = await axiosInstance.get(`/videos/all/options${queryString}`,{signal: controller.signal})
        console.log(response);
        return response.data.data
        
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

const paginationSlice = createSlice({
    name: "pagingVideos",
    initialState,
    reducers:{
        emptyPagingVideosData: (state,action)=>{
            state.data = { videos: [], pagingInfo: {}}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllVideosByOption.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getAllVideosByOption.fulfilled, (state, action)=>{
            state.loading = false;
            const {videos, pagingInfo} = action.payload;
            state.data.videos = action.meta.arg.page == 1? videos : [...state.data.videos, ...videos]; // if its first page , then entire videos array is there , but if not ":" then previous state videos is spread then the videos from response is spread 
            state.data.pagingInfo = pagingInfo;
            state.status = true;
        })
        //since in controller code , i have return video docs and paginginfo separately so we used it here separately, and since we have to pass a arg here so we did action.meta.arg

        builder.addCase(getAllVideosByOption.rejected, (state)=>{
            state.loading = false;
            state.status = false;
        })
    }
})

export default paginationSlice.reducer
export const {emptyPagingVideosData} = paginationSlice.actions