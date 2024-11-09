import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux"
import {useForm} from "react-hook-form"
import { login } from "../../app/Slices/authSlice.js";
import {Logo,Input, Button} from "../index.js"
import {Link, useNavigate} from "react-router-dom"
import { useImperativeHandle } from "react";
import {createPortal} from "react-dom"
import { Icons } from "../../assets/icons.jsx";
import { toast } from "react-toastify";

function LoginPopup({route, message = "Login to Continue..."}, ref){
    const dialog = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPopup, setShowPopup] = useState(false)
    const {loading} = useSelector( ( {auth} ) => auth) // took reducers from authSlice

    const {
        register, // to get the register values
        handleSubmit, // which we will used to submit the actual handle submit
        formState: {errors}, // actually errors was nested , so we destructure the nested property like this 
    } = useForm()

    useImperativeHandle(ref, ()=>{
        return { 
            open(){
                setShowPopup(true)
            },
            close(){
                handleClose()
            }
        }
    })
    // expose these methods (open, close) to the parent component

    const handleClose = ()=>{
        dialog.current.close() 
        // in the dialog (where we set to store the ref) , access the current property close() in that 
        setShowPopup(false)
        if(route) navigate(route)
        // if in the loginpopup, we pass the route , then naviagate the user after closing the login popup 
    }
    // we are accesing the function of child component here (dialog.open and dialog.close())

    useEffect(()=>{
        if(showPopup){
            dialog.current.showModal() //showmodal creates a popup banner over the render page 
        }
    },[showPopup])

    const handleLogin = (data)=>{
        const isEmail = !data.username.startsWith("@")
        // we are keeping the username with "@" at start, for email, its normal

        if(isEmail){
            let isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.username);
            // checking the email with a regex, and then test it against data username input value

            if(!isValidEmail){
                toast.error("Please enter valid Email")
                return
            }
        }

        const loginData = isEmail 
        ? {email: data.username, password: data.pssword}
        : {email: data.username.substr(1), password: data.password}

        // if its isEmail , so store it . if its not email but a username, store it also but from index[1], so we use substr[1] = start from index[1]

        dispatch(login(loginData))
        .then((res)=> {
            if(res.meta.requestStatus === "fulfilled"){
                if(route) navigate(route)
            }
            dialog.current.close()
        })
    }
    /*CreatePortal - its render child into a different part of a DOM, we will use it for rendering popup at a different DOM node . 
    it take a children , and a dom node (where we want to place it) */
}