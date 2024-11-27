import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseErrorMessage } from "../../helpers/parseErrMsg.helper";
import { axiosInstance } from "../../helpers/axios.helper";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  status: false,
  data: null,
};

export const getPlaylistById = createAsyncThunk("playlist/getPlaylistById", async(playlistId)=>{
    try {
        const response = await axiosInstance.get(`/playlist/${playlistId}`);
        console.log(response);
        //toast.success(response.data.message);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting Playlist by ID. Please try again later.");
        }
        console.log(error);
        throw error;
      }
})
export const getUserPlaylists = createAsyncThunk("playlist/getUserPlaylists", async(userId)=>{
    try {
        const response = await axiosInstance.get(`/playlist/user/${userId}`);
        console.log(response);
        //toast.success(response.data.message);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting User Playlist. Please try again later.");
        }
        console.log(error);
        throw error;
      }
})

export const getCurrentPlaylists = createAsyncThunk("playlist/getCurrentPlaylists", async(videoId)=>{
    try {
        const response = await axiosInstance.get(`/playlist/user/playlists/${videoId}`);
        console.log(response);
        //toast.success(response.data.message);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting current Playlist. Please try again later.");
        }
        console.log(error);
        throw error;
      }
      // getVideoSavePlaylist
})

export const createPlaylist = createAsyncThunk("playlist/createPlaylist", async({data}) =>{
    try {
        const response = await axiosInstance.post("/playlist", {data})
        console.log(response);
        toast.success(response.data.data)
        return response.data.data
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Creating Playlist. Please try again later.");
        }
        console.log(error);
        throw error;     
    }
    
})

export const addVideoToPlaylist = createAsyncThunk(
    "playlist/addVideoToPlaylist",
    async ({ playlistId, videoId }) => {
      try {
        const response = await axiosInstance.patch(`/playlist/add/${playlistId}/${videoId}`);
        toast.success(response.data.message);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during adding Video to  Playlist. Please try again later.");
        }
        console.log(error);
        throw error;
      }
    }
  );
  
  export const removeVideoFromPlaylist = createAsyncThunk(
    "playlist/removeVideoFromPlaylist",
    async ({ playlistId, videoId }) => {
      try {
        const response = await axiosInstance.patch(`/playlist/remove/${playlistId}/${videoId}`);
        toast.success(response.data.message);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during removing video from Playlist. Please try again later.");
        }
        console.log(error);
        throw error;
      }
    }
  );
  
  export const updatePlaylist = createAsyncThunk(
    "playlist/updatePlaylist",
    async ({ playlistId, data }) => {
      try {
        const response = await axiosInstance.patch(`/playlist/${playlistId}`, data);
        toast.success(response.data.message);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during updating Playlist. Please try again later.");
        }
        console.log(error);
        throw error;
      }
    }
  );
  
  export const deletePlaylist = createAsyncThunk("playlist/deletePlaylist", async (playlistId) => {
    try {
      const response = await axiosInstance.delete(`/playlist/${playlistId}`);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during deleting Playlist. Please try again later.");
        }
        console.log(error);
        throw error;
    }
  });

  const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    extraReducers: (builder) => {
      // get Playlist By Id
      builder.addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.status = false;
      });
      builder.addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(getPlaylistById.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // get User Playlists
      builder.addCase(getUserPlaylists.pending, (state) => {
        state.loading = true;
        state.data = null;
      });
      builder.addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(getUserPlaylists.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // get Current Playlists
      builder.addCase(getCurrentPlaylists.pending, (state) => {
        state.loading = true;
        state.data = null;
      });
      builder.addCase(getCurrentPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(getCurrentPlaylists.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // create Playlist
      builder.addCase(createPlaylist.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(createPlaylist.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // add Video To Playlist, code for this slice action was commented out
      builder.addCase(addVideoToPlaylist.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(addVideoToPlaylist.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
    //   remove Video From Playlist, code for this slice action was commented out
      builder.addCase(removeVideoFromPlaylist.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(removeVideoFromPlaylist.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // update Playlist
      builder.addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data.name = action.payload.name;
        state.data.description = action.payload.description;
        state.status = true;
      });
      builder.addCase(updatePlaylist.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // delete Playlist
      builder.addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.status = true;
      });
      builder.addCase(deletePlaylist.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
    },
  });
  
  export default playlistSlice.reducer;