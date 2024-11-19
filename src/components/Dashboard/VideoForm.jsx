import React, {useEffect, useState} from 'react'
import { useImperativeHandle, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createPortal } from 'react-dom'
import {publishVideo,updateVideo} from "../../app/Slices/videoSlice"
import {UploadSuccess, UploadingVideo} from "../index"

function VideoForm({video=false}, ref) {
  const dialog = useRef()
  const uploadingDialog = useRef()
  const successDialog = useRef()
  const dispatch = useDispatch()

  const [promise, setPromise] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors}
  } = useForm({
    defaultValues:{
      title: video?.title || "",
      description: video?.description || ""
    }
  })

  useImperativeHandle(ref, ()=> {
    return {
      open(){
        setShowPopup(true)
        dialog.current?.showModal()
      },
      clsoe(){
        dialog.current?.close()
      }
    }
  })

  useEffect(()=> {
    if(showPopup){
      dialog.current?.showModal()
    }
  }),[showPopup]


  async function handleVideo(data) {
    console.log("data: ", data);
    let uploadPromise;
    if(video){
      uploadPromise = dispatch(dispatch(updateVideo({videoId: video._id, data})))
    } else{
      uploadPromise = dispatch(publishVideo({data}))
    }

    uploadPromise.then((res)=> {
      if(res.meta.requestStatus === "fulfilled"){
        uploadingDialog.current.close()
        successDialog.current.open()
      }else if(res.meta.requestStatus === "rejected"){
        uploadingDialog.current.close()
      }
    })

    setPromise(uploadPromise);
    dialog.current?.close();
    uploadingDialog.current?.open();
  }


  const handleAbort = ()=> promise.abort()

  return ()
}

export default VideoForm