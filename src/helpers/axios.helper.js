import axios from "axios"


const baseURL = "http://localhost:8000/api/v1";

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
})

// made a general instance of axios , so it can be used in different times with get post and endpoint
// i have set the base URL port as 8000 as its in BE , No risk

// console.log(Date.now())
