import React, {useRef, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {VideoGrid} from "../components/index"
import {emptyPagingVideosData, getAllVideosByOption} from "../app/Slices/paginationSlice"

function FeedVideos({gridClassName, itemClassName}) {
    const dispatch = useDispatch()
    const {loading} = useSelector(({pagingVideos})=> pagingVideos )
    const {videos} = useSelector(({pagingVideos})=> pagingVideos.data )
    const {pagingInfo} = useSelector(({pagingVideos})=> pagingVideos.data )

    /*const initialState = {
    loading: false,
    status: false,
    data: {videos:[], pagingInfo:{}}
    } */

    const sectionRef = useRef()
    const fetchedPageRef = useRef()
    const pagingInfoRef = useRef(pagingInfo)
    // we are initialising this ref with pagingInfo data 

    pagingInfoRef.current = pagingInfo
    /* refer Frontend notes */

    useEffect(()=> {
        fetchedPageRef.current = new Set()
        // mutable object with unique values

        sectionRef.current = document.getElementById("scrollable_results_screen");
        //it  holds the DOM element now
        sectionRef.current?.scrollTo({top: 0, behavior: "smooth"})
        // if the elements is there , then scroll it to the top smoothly

        let fetchAllVideosPromise = dispatch(getAllVideosByOption({page: 1, limit: 15}))
        // fetching a promise with query

        fetchAllVideosPromise.then(()=>{
            fetchedPageRef.current.add(1)
        })
        

        sectionRef.current?.addEventListener("scroll", handleScroll)
        return(()=>{
            sectionRef.removeEventListener("scroll", handleScroll)
            fetchedPageRef.current.clear()
            fetchAllVideosPromise.abort()
            dispatch(emptyPagingVideosData)
            sectionRef.current?.scrollTo({top: 0, behavior: "smooth"})
            //cleanup
        })
    },[])

    const handleScroll = ()=> {
        const section = sectionRef.current
        const scrollHeight = section.scrollHeight // total height of scrollable content
        const scrolledValue = section.clientHeight + section.scrollTop // how much the user/client has scroll down

        if(scrolledValue +5 > scrollHeight){
            const currentPagingInfo = pagingInfoRef.current
            if(
                currentPagingInfo.hasNextPage && !fetchedPageRef.current?.has(currentPagingInfo.hasNextPage)
            ){
                fetchedPageRef.current.add(currentPagingInfo.nextPage)
                dispatch(getAllVideosByOption({page: `${currentPagingInfo.nextPage}`, limit: 15 }))
            }
            // if the currentPagingInfo has this next page but the fetchedPageRef doesnt, dispatch the info
        }


    }

    return (
        <VideoGrid
         videos={videos}
         loading={loading && !fetchedPageRef.current.has(1)} 
         fetching={loading && videos?.length > 0}
         gridClassName={gridClassName}
         itemClassName={itemClassName} 
        />
    )
}

export default FeedVideos