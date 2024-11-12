import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Logo, Input, Button} from "../index.js"
import { useNavigate, Link, matchPath } from "react-router-dom";
import { icons } from "../../assets/icons";
import { useForm } from "react-hook-form";
import {register as createAccount} from "../../app/Slices/userSlice.js"

function Signup(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const {loading , userData} = useSelector(({user}) => user)
    const authStatus = useSelector(({auth}) => auth.status)
    // to check if user is already logged in 
    const [showPassword, setShowPassword] = useState(false)
    if(authStatus) navigate("/")
    if(!authStatus && userData) navigate("/login")
    // if user is not logged in but we have its data in user , send him to login 
    const handleSignUp = (data)=>{
        dispatch(createAccount(data))
    }

    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword)
    }

    return (
        <div className="h-screen w-full overflow-y-auto dark:bg-[#121212] dark:text-white bg-white text-black">
          <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4 border-2 border-red-300 dark:border-none  p-2 rounded-xl  ">
            <div className="mx-auto inline-block w-16">
              <Logo />
            </div>
            <div className="mb-2 w-full text-center text-2xl font-semibold uppercase">
              Create an Account
            </div>
            <h6 className="mx-auto text-md mb-1">
              Already have an Account?{" "}
              <Link to={"/login"} className="font-semibold text-blue-600 hover:text-blue-400">
                Sign in now
              </Link>
            </h6>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="mx-auto mt-2 flex w-full max-w-sm flex-col px-4"
            >
                <Input
                 label = "Username"
                 required
                 placeholder = "Choose Your Username"
                 {...register("username", {required: "please Enter your Username"})}
                />
                {errors.username?.type === "required" && (
                    <span className="text-red-500 mt-1">*Username is Rrequired </span>
                )}
             
                <Input
                 label = "Email"
                 required
                 placeholder="Please enter your Email"
                 type="email"
                 className="mt-4"
                 {...register("email", {
                    required: true,
                    validate:{
                        matchPattern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid Address"
                    }
                 })}
                />
                {errors.email?.type === "required" && (
                    <span className="text-red-500 mt-1">*email is required</span>
                )}
                {
                    errors.email?.type === "matchPattern" && (
                        <span className="text-red-500 mt-1">*please enter valid email address</span>
                    )
                }
                <div className="relative">
                    <Input
                        label = "Password"
                        labelClassName = "mt-5"
                        type = {showPassword? "text" : "password"}
                        required
                        placeholder = "Enter password"
                        {...register("password",{required: true})}
                    />
                    <button
                     type="button"
                     onClick={togglePasswordVisibility}
                     className="absolute right-2 top-[80%] transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword? icons.eye : icons.eyeOff}
                    </button>
                </div>
                {errors.password.type === "required" && (
                    <span className="text-red-500 mt-1">*password is required</span>
                )}
                <Input
                 label="Full name"
                 placeholder = "Enter your full name"
                 required
                 labelClassName="mt-4"
                 {...register("fullName", {required: true})}
                />
                {errors.fullName.type === "required" && (
                    <span className="text-red-500 mt-1">*Full Name is required</span>
                )}
                <Input
                 type="file"
                 label="Avatar"
                 placeholder="Upload your Avatar"
                 required
                 labelClassName="mt-4"
                 {...register("avatar", {
                    required: true,
                    validate: (file) =>{
                        const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"]
                        const fileType = file[0]?.type
                        return allowedExtensions.includes(fileType) ? true : "Invalid file type! Only .png .jpg and .jpeg files are accepted";
                    }
                 })}
                />
                {errors.avatar.type === "required" && (
                    <span className="text-red-500 mt-1">*Avatar is required</span>
                )}
                {errors.avatar.type === "validate" && (
                    <span className="text-red-500 mt-1">Only .png & .jpg & .jpeg files are accepted</span>
                )}
                
                <Input
                 type="file"
                 label="Cover Image"
                 placeholder="Upload your Cover Image"
                 labelClassName="mt-4"
                 {...register("coverImage", {
                    required: true,
                    validate: (file) =>{
                        const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"]
                        const fileType = file[0]?.type
                        return allowedExtensions.includes(fileType) ? true : "Invalid file type! Only .png .jpg and .jpeg files are accepted";
                    }
                 })}
                />
                {errors.coverImage.type === "required" && (
                    <span className="text-red-500 mt-1">*coverImage is required</span>
                )}
                {errors.coverImage.type === "validate" && (
                    <span className="text-red-500 mt-1">Only .png & .jpg & .jpeg files are accepted</span>
                )}
             
              <Button type= "submit" diabled = {loading} className="mt-5 disabled:cursor-not-allowed bg-red-500 text-white rounded-full hover:bg-red-600 dark:hover:bg-[#ae7aff] dark:bg-[#883eff] ">
                {loading ? <span>{icons.loading}</span> : "Sign Up"}
              </Button>
            </form>
          </div>
        </div>
      );
}