import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import { parseErrorMessage } from "../../helpers/parseErrMsg.helper";
import { act } from "react";

const initialState = {
    loading: false,
    status: false,
    userData: {}
}

export const login = createAsyncThunk("auth/login", async(data) => {
    try {
        const response = await axiosInstance.post("/users/login", data)
        toast.success(response.data.message + " 🤩");
        return response.data.data.user            
    } catch (error) {
        // if (error.response) {
        //     toast.error(error.response.data.message || parseErrorMessage(error.response.data));
        // } else {
        //     // Handle other types of errors (e.g., network errors)
        //     toast.error("An error occurred during login. Please try again later.");
        // }
        // console.log(error); // Log the entire error object for debugging
        // throw error;
        toast.error(error.response.data.message || parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
})

export const logout = createAsyncThunk("auth/logout", async() => {
    try {
        await axiosInstance.post("/users/logout")
        toast.success("Logout Successfully")        
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Logout. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async() => {
    try {
        const response = await axiosInstance.get("/users/get-current-user")
        // console.log(response);
        return response.data.data;      
    } catch (error) {
        console.error("BACKEND ERROR :: GET CURRENT USER", error)
        throw error;
    }
})

export const changeCurrentPassword = createAsyncThunk("auth/changeCurrentPassword", async(data) => {
    try {
        const response = await axiosInstance.patch("/users/change-password", data, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Changing Password. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})

export const updateProfile = createAsyncThunk("auth/updateProfile", async(data) => {
    try {
        const response = await axiosInstance.patch("/users/update-account", data, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Updating Details from Profile. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})

export const uploadAvatar = createAsyncThunk("user/uploadAvatar", async({data}) => {
    try {
        const response = await axiosInstance.patch("/users/avatar", data, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Uploading Avatar. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})

export const uploadCoverImage = createAsyncThunk("user/uploadCoverImage", async({data}) => {
    try {
        const response = await axiosInstance.patch("/users/cover-image", data, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Uploading Cover Image. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})

export const watchHistory = createAsyncThunk("user/history", async () => {
    try {
      const response = await axiosInstance.get("/users/history");
      // toast.success(response.data.message);
      return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Getting watch History. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
  });
  
export const clearWatchHistory = createAsyncThunk("user/clearWatchHistory", async () => {
try {
        const response = await axiosInstance.delete("/users/history");
        toast.success(response.data.message);
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Clearing watch History. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
});

export const userPlaylists = createAsyncThunk("user/userPlaylists", async(userid) => {
    try {
        const response = await axiosInstance.get(`/playlist/users/${userid}`)
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Getting User Playlist. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})

export const addLink = createAsyncThunk("user/addlink", async({formdata}) => {
    try {
        const response = await axiosInstance.post("/about/user/link/add", formdata)
        toast.success(response.data.message);
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Adding Link. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})
export const updateLink = createAsyncThunk("user/updateLink", async({linkId, formdata}) => {
    try {
        const response = await axiosInstance.patch(`/about/user/link/${linkId}`, formdata)
        toast.success(response.data.message);
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Updating Link. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})
export const deleteLink = createAsyncThunk("user/deleteLink", async(linkId) => {
    try {
        const response = await axiosInstance.delete(`/about/user/link/${linkId}`)
        toast.success(response.data.message);
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            // Handle other types of errors (e.g., network errors)
            toast.error("An error occurred during Deleting Link. Please try again later.");
        }
        console.log(error); // Log the entire error object for debugging
        throw error;
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        //login
        builder.addCase(login.pending, (state, action) =>{
            state.loading = true
        } )
        builder.addCase(login.fulfilled, (state, action) =>{
            state.loading = false,
            state.status = true, //status as in login status
            state.userData = action.payload
        } )
        builder.addCase(login.rejected, (state, action) =>{
            state.loading = false,
            state.status = false,
            state.userData = null
        } )

        //logout
        builder.addCase(logout.pending, (state, action) =>{
            state.loading = true
        } )
        builder.addCase(logout.fulfilled, (state, action) =>{
            state.loading = false,
            state.status = false, 
            state.userData = null
        } )
        builder.addCase(logout.rejected, (state, action) =>{
            state.loading = false,
            state.status = false
            
        } )

        //getCurrentUser
        builder.addCase(getCurrentUser.pending, (state, action) =>{
            state.loading = true
        } )
        builder.addCase(getCurrentUser.fulfilled, (state, action) =>{
            state.loading = false,
            state.status = true, 
            state.userData = action.payload
        } )
        builder.addCase(getCurrentUser.rejected, (state, action) =>{
            state.loading = false,
            state.status = false,
            state.userData = null
            
        } )

        //changeCurrentPassword
        builder.addCase(changeCurrentPassword.pending, (state, action) =>{
            state.loading = true
        } )
        builder.addCase(changeCurrentPassword.fulfilled, (state, action) =>{
            state.loading = false

        } )
        builder.addCase(changeCurrentPassword.rejected, (state, action) =>{
            state.loading = false
        } )


        //updateProfile
        builder.addCase(updateProfile.pending, (state, action) =>{
            state.loading = true
        } )
        builder.addCase(updateProfile.fulfilled, (state, action) =>{
            state.loading = false,
            // state.status = true, 
            state.userData = action.payload
        } )
        builder.addCase(updateProfile.rejected, (state, action) =>{
            state.loading = false            
        } )

        //uploadAvatar
        builder.addCase(uploadAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(uploadAvatar.rejected, (state) => {
            state.loading = false;
        });

        //uploadCoverImage
        builder.addCase(uploadCoverImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadCoverImage.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(uploadCoverImage.rejected, (state) => {
            state.loading = false;
        });

        //watchHistory
        builder.addCase(watchHistory.pending, (state) =>{
            state.loading = true
        });
        builder.addCase(watchHistory.fulfilled, (state, action) =>{
            state.loading = false,
            state.userData.watchHistory = action.payload
        });
        builder.addCase(watchHistory.rejected, (state)=>{
            state.loading = false
        })

        //clearWatchHistory
        builder.addCase(clearWatchHistory.pending, (state) =>{
            state.loading = true
        });
        builder.addCase(clearWatchHistory.fulfilled, (state, action) =>{
            state.loading = false,
            state.userData.watchHistory = []
        });
        builder.addCase(clearWatchHistory.rejected, (state)=>{
            state.loading = false
        })

        //userPlaylists
        builder.addCase(userPlaylists.pending, (state) =>{
            state.loading = true
        })
        builder.addCase(userPlaylists.fulfilled, (state, action)=>{
            state.loading = false,
            state.userData.userPlaylists = action.payload
        })
        builder.addCase(userPlaylists.rejected, (state)=>{
            state.loading = false
        })
        //Add Link
        builder.addCase(addLink.pending, (state) => {});
        builder.addCase(addLink.fulfilled, (state, action) => {});
        builder.addCase(addLink.rejected, (state) => {});

        //Update Link
        builder.addCase(updateLink.pending, (state) => {});
        builder.addCase(updateLink.fulfilled, (state, action) => {});
        builder.addCase(updateLink.rejected, (state) => {});

        //Delete Link
        builder.addCase(deleteLink.pending, (state) => {});
        builder.addCase(deleteLink.fulfilled, (state, action) => {});
        builder.addCase(deleteLink.rejected, (state) => {});
    }
});

export default authSlice.reducer