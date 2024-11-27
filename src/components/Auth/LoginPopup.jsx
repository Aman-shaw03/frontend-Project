import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux"
import {useForm} from "react-hook-form"
import { login } from "../../app/Slices/authSlice.js";
import {Logo,Input, Button} from "../index.js"
import {Link, useNavigate} from "react-router-dom"
import { useImperativeHandle } from "react";
import {createPortal} from "react-dom"
import { icons } from "../../assets/icons.jsx";
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
        dialog.current?.close?.()
        // we are using <dialog> in return which is a html element for creating a popup , and close() is built in it to close the popup, {dont confuse it with close in useimperative handle}
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

    return (
        <div className="absolute">
            {showPopup && createPortal(
                <dialog
                 ref={dialog}
                 onClose={handleClose}
                 className=" mx-auto w-[90%] backdrop:backdrop-blur-sm sm:w-[60%] lg:w-[40%] xl:w-[30%] overflow-y-auto border border-red-300 bg-white dark:bg-gray-900/80 dark:text-white text-black rounded "
                >
                    <div className="mx-8 my-6 mb-8 flex flex-col relative ">
                        <button
                         autoFocus
                         type="button"
                         onClick={handleClose}
                         className="absolute right-0 top-1 h-7 w-7 focus:border focus:border-dotted hover:border-dotted hover:border">
                            {icons.cross}
                        </button>
                        <Logo width="w-12" className="absolute  top-0 left-[45%] sm:w-12 "  />
                        <h6 className="mx-auto mt-14 mb-2 text-2xl font-semibold">{message}</h6>
                        <h6 className="mx-auto text-md mb-3">
                            Don't have a account yet? {" "}
                            <Link 
                             to={"/signup"} 
                             className="font-semibold text-blue-600 hover:text-blue-400">
                                Sign up now
                            </Link>
                        </h6>
                        <form
                         onSubmit={handleSubmit(handleLogin)}
                         className="mx-auto flex w-full flex-col px-4 gap-y-2">
                            <Input
                             label="Username or Email Address"
                             required
                             placeholder = "use @ for userName"
                             {...register("username",{
                                required: true
                             })}
                            />
                                {errors.username?.type === "required" && (
                                    <span className="text-red-500 mt-1">*Username or Email is required</span>
                                )}
                            <Input
                             label="Password"
                             required
                             labelClassName = "mt-4"
                             placeholder = "Enter the password"
                             {...register("password",{
                                required: true
                             })} 
                            />
                            {...errors.password?.type === "required" && (
                                <span className="text-red-500 mt-1">*password is required</span>
                            )}
                            <div className="flex flex-1 gap-x-4 mt-5">
                                <Button
                                 type="button"
                                 onClick={handleClose}
                                 className="grow dark:bg-black/10 dark:hover:bg-black/20 hover:border-dotted border dark:border-white dark:text-white bg-zinc-400 hover:bg-zinc-500 rounded-full text-black ">
                                    Cancel
                                </Button>
                                <Button>
                                    {loading? <span>{icons.loading}</span> : "Sign in"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </dialog>,
                document.getElementById("popup-models")
            )}
        </div>
    )
}

export default React.forwardRef(LoginPopup)