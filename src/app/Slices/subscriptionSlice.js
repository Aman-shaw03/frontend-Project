import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"
import {parseErrorMessage} from "../../helpers/parseErrMsg.helper"

const initialState = {
    loading: false,
    status: false,
    data: null
}

export const toggleSubscription = createAsyncThunk(
    "subscription/toggleSubscription",
    async (channelId) => {
      try {
        const response = await axiosInstance.patch(`/subscription/${channelId}`);
        toast.success(response.data.message);
        console.log(response.data);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during toggle subscription. Please try again later.");
        }
        console.log(error);
        throw error;
      }
    }
  );
  
  export const getChannelSubscribers = createAsyncThunk(
    "subscription/getChannelSubscribers",
    async (channelId) => {
      try {
        const response = await axiosInstance.get(`/subscription/${channelId}`);
        //toast.success(response.data.message);
        console.log(response.data);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting channel subscribers. Please try again later.");
        }
        console.log(error);
        throw error;
      }
    }
  );
  
  export const getSubscribedChannels = createAsyncThunk(
    "subscription/getSubscribedChannels",
    async (subscriberId) => {
      try {
        const response = await axiosInstance.get(`/subscription/users/${subscriberId}`);
        //toast.success(response.data.message);
        console.log(response.data);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Getting Subscribed channels. Please try again later.");
        }
        console.log(error);
        throw error;
      }
    }
  );
  export const checkSubscriber = createAsyncThunk(
    "subscription/checkSubscriber",
    async (channelId) => {
      try {
        const response = await axiosInstance.get(`/subscription/${channelId}`);
        //toast.success(response.data.message);
        console.log(response.data);
        return response.data.data;
      } catch (error) {
        if (error.response) {
            toast.error(parseErrorMessage(error.response.data));
        } else {
            toast.error("An error occurred during Checking if the user is subscriber or not. Please try again later.");
        }
        console.log(error);
        throw error;
      }
    }
  );
  
  const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    extraReducers: (builder) => {
      // toggle subscription
      builder.addCase(toggleSubscription.pending, (state) => {
        // state.loading = true;
      });
      builder.addCase(toggleSubscription.fulfilled, (state, action) => {
        // state.loading = false;
        // state.data = action.payload;
        // state.status = true;
      });
      builder.addCase(toggleSubscription.rejected, (state) => {
        // state.loading = false;
        // state.status = false;
      });
  
      // get Channel Subscribers
      builder.addCase(getChannelSubscribers.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getChannelSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(getChannelSubscribers.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  
      // get Subscribed Channels
      builder.addCase(getSubscribedChannels.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(getSubscribedChannels.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
      // checkSubscriber
      builder.addCase(checkSubscriber.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(checkSubscriber.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      });
      builder.addCase(checkSubscriber.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
    },
  });
  
  export default subscriptionSlice.reducer;