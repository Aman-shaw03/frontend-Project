import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import {parseErrorMessage} from "../../helpers/parseErrMsg.helper"

const initialState = {
    loading: false,
    status: false,
    userData: null
}

export const register = createAsyncThunk("user/register", async(data)=>{
    try {
        const formData = new FormData()
        for(const key in data){
            formData.append(key, data[key])
        }
        formData.append("avatar", data.avatar[0])
        if(data.coverImage){
            formData.append("coverImage", data.coverImage[0])
        }
        const response = axiosInstance.post("/users/register", formData)
        toast.success("Account Created successfully 🥳") // yeh ho rha hai 
        console.log(response.data); // yaha undefined show ho rha hai
        return (await response).data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Register. Please try again later.");
        }
        console.log(error); // fir yeh error
        throw error;
    }
})
export const channelProfile = createAsyncThunk("user/channelProfile", async(username)=>{
    try {

        const response = axiosInstance.post(`/users/c/${username}`)
        console.log(response.data);
        return (await response).data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during getting Channel Profile. Please try again later.");
        }
        console.log(error);
        throw error;
    }
})
export const getAboutChannel = createAsyncThunk("user/getAboutChannel", async(username)=>{
    try {

        const response = axiosInstance.post(`/about/user/${username}`)
        console.log(response.data);
        return (await response).data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during getting About Channel. Please try again later.");
        }
        console.log(error);
        throw error;
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder)=>{
        //register user
        builder.addCase(register.pending, (state)=>{
            state.loading = true;
            state.userData = null;
            state.status = false
        })
        builder.addCase(register.fulfilled, (state)=>{
            state.loading = false;
            state.userData = null;
            state.status = true
        })
        builder.addCase(register.rejected, (state)=>{
            state.loading = false;
            state.status = false
        })
        //get Channel Profile
        builder.addCase(channelProfile.pending, (state) => {
            state.loading = true;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(channelProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(channelProfile.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    
        //get Channel Profile
        builder.addCase(getAboutChannel.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAboutChannel.fulfilled, (state, action) => {
            state.userData.about = action.payload;
        });
        builder.addCase(getAboutChannel.rejected, (state) => {});
    }
})

export default userSlice.reducer;