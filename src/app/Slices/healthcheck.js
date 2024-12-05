import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {axiosInstance} from "../../helpers/axios.helper"

const initialState = {
    loading: false,
    status: false,
}


export const healthCheck = createAsyncThunk("health/healthCheck", async () => {
    try {
      const response = await axiosInstance.get(`/healthcheck`);
      // toast.success("⚙️ Server is Healthy... ❤️", { icon: "🚀" });
      // console.log(response);
      return response.data.data;
    } catch (error) {
      toast.error("Oops! Our Server is Sick... 🤒");
      console.log(error);
    }
  });
  
const healthSlice = createSlice({
    name: "health",
    initialState,
    extraReducers: (builder) => {
      //Check Health
      builder.addCase(healthCheck.pending, (state) => {
        state.loading = true;
        state.status = false;
      });
      builder.addCase(healthCheck.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
      });
      builder.addCase(healthCheck.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
    },
});
  
export default healthSlice.reducer;