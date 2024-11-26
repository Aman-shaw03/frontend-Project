import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {healthCheck} from "./app/Slices/healthcheck"
import {getCurrentUser} from "./app/Slices/authSlice"
import { Outlet } from 'react-router-dom'
import lodder from "./assets/lodder.gif"
import lightLoader from "./assets/lightLoader.gif"
import "./App.css"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  
}

export default App