import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import {parseErrorMessage} from "../../helpers/formatFigures"

const initialState = {
    loading: false,
    status: false,
    data: {videos:[], pagingInfo:{}}
}

export const getAllVideosByOption = createAsyncThunk("pagingVideos/getAllVideosByOption", async({...queryData}, {signal}) =>{
    try {
        const queryString = "?"+ Object.entries(queryData).map(([key,value]) => `${encodeURIComponent}` )
    } catch (error) {
        
    }
})