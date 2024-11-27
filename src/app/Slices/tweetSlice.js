import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import {parseErrorMessage} from "../../helpers/parseErrMsg.helper"

const initialState = {
    loading: false,
    status: false,
    data: null
}

export const createTweet = createAsyncThunk("tweet/createTweet", async ({ data }) => {
    try {
      const response = await axiosInstance.post(`/tweets`, data);
      //toast.success(response.data.message);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Creating Tweet. Please try again later.");
        }
        console.log(error);
        throw error;
    }
  });
  
  export const getTweet = createAsyncThunk("tweet/getTweet", async (userId) => {
    try {
      const response = await axiosInstance.get(`/tweets/users/${userId}`);
      //toast.success(response.data.message);
      //this one is getUserTweets
      console.log(response.data);
      return response.data.data;
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting Tweet. Please try again later.");
        }
        console.log(error);
        throw error;
    }
  });
  
  export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
    try {
      const response = await axiosInstance.get(`/tweets`);
      //toast.success(response.data.message);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting All Tweet. Please try again later.");
        }
        console.log(error);
        throw error;
    }
  });
  
export const updateTweet = createAsyncThunk("tweet/updateTweet", async ({ tweetId, data }) => {
    try {
        const response = await axiosInstance.patch(`/tweets/${tweetId}`, data);
        //toast.success(response.data.message);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Updating tweet. Please try again later.");
        }
        console.log(error);
        throw error;
    }
});
  
  export const deleteTweet = createAsyncThunk("tweet/deleteTweet", async ({ tweetId }) => {
    try {
      const response = await axiosInstance.delete(`/tweets/${tweetId}`);
      toast.success(response.data.message);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during deleting tweet. Please try again later.");
        }
        console.log(error);
        throw error;
    }
  });
  
  const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    extraReducers: (builder) => {
      // create tweet
      builder.addCase(createTweet.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload); // so the new tweet comes at first position
        state.status = true;
      });
      builder.addCase(createTweet.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // get User tweet
      builder.addCase(getTweet.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(getTweet.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // get All tweets
      builder.addCase(getAllTweets.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getAllTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(getAllTweets.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // Update tweet
      builder.addCase(updateTweet.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(updateTweet.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.status = true;
      });
      builder.addCase(updateTweet.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // delete tweet
      builder.addCase(deleteTweet.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
        let filteredTweets = state.data.filter((tweet) => tweet._id !== action.payload._id);
        state.data = filteredTweets;
        state.status = true;
      });
      // the callback in filter returns a boolean value , if its "True" it will include the individual element in the new array , if "false" it won add
      builder.addCase(deleteTweet.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
    },
  });
  
  export default tweetSlice.reducer;