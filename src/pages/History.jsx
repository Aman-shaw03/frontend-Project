import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { icons } from '../assets/icons'
import {clearWatchHistory, watchHistory} from "../app/Slices/authSlice"
import {GuestComponent, VideoList} from "../components"

function History() {
    const dispatch = useDispatch()
    const {loading , userData} = useSelector(({auth})=> auth)
    const videos = useSelector(({auth})=> auth.userData.watchHistory)

    useEffect(()=> {
        dispatch(watchHistory())
    },[])
    const deleteWatchHistory = ()=> {
        dispatch(clearWatchHistory())
    }

    const isHistoryEmpty = !loading && videos?.length < 1;

    return (
        <>
            <section className='w-full'>
                {!isHistoryEmpty && !loading && (
                    <div className="flex items-center justify-center py-2">
                        <button 
                         onClick={deleteWatchHistory}
                         className="mt-4 rounded inline-flex items-center gap-x-2  text-white  dark:bg-[#ae7aff] bg-red-500 dark:hover:bg-[#ae7aff]/95 hover:bg-red-300 border border-transparent hover:border-dotted hover:border-white px-3 py-2 font-semibold dark:text-black"
                         >
                            <span className='h-5'>{icons.delete}</span>
                            Clear History
                        </button>
                    </div>
                )}
                <ul className="w-full flex flex-col gap-4">
                    {!isHistoryEmpty && <VideoList videos={videos} loading={loading} />}
                    {isHistoryEmpty && (
                        <GuestComponent
                        title="Empty Video History"
                        subtitle="You have no previously saved history."
                        icon={icons.history}
                        guest={false}
                        />
                    )}
                </ul>
            </section>
        </>
    )


}

export default History