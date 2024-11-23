import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { icons } from '../assets/icons'
import DarkModeToggle from './Atoms/Darkmode'

function Aside() {
    const username = useSelector((state)=> state.auth.userData?.username)

    const navElements = [
        {
            name: "Home",
            route: "",
            icon: <span className='h-full w-full'>{icons.Home}</span>
        },
        {
            name: "Tweets",
            route: "tweets",
            icon: icons.Tweets,
        },
        {
            name: "Liked Videos",
            route: "feed/liked",
            icon: icons.Like,
            className: "hidden sm:block"
        },
        {
            name: "History",
            route: "feed/history",
            icon: icons.history,
            className:  `${username ? "hidden sm:block" : ""}`
        },
        {
            name: "Subscription",
            route: `/channel/${username}/subscribed`,
            className:  `${username ? "hidden sm:block" : ""}`,
            icon: icons.Subscription
        },
        {
            name: "My Content",
            route: `/channel/${username}`,
            icon: <span className='h-full w-full'>{icons.MyContent}</span>
        },
        {
            name: "Playlists",
            route: `/channel/${username}/playlists`,
            icon: icons.folder,
            className: `${username ? "hidden sm:block" : "hidden"}`
        },
        {
            name: "Admin",
            route: `/admin/dashboard`,
            className: `${username ? "" : "hidden"}`,
            icon: icons.Admin
        },
        {
            name: "Subscribers",
            route: `feed/subscribers`,
            className: `${username ? "" : "hidden"}`,
            icon: icons.Subscribers
        },
        {
            name: "Support",
            route: "support",
            icon: icons.support,
            className: "hidden sm:block mt-auto"
        },
        {
            name: "Settings",
            route: "settings",
            icon: icons.Settings,
            className: `${username ? "" : "hidden"}`
        },
        
    ]

    return (
        <aside className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-red-500 dark:border-white dark:bg-[#121212] bg-white  px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">

            <ul className="flex justify-evenly gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">

                <DarkModeToggle />
                {navElements.map((item)=> (
                    <li key={item.route} className={item.className + " /20"}>
                        <NavLink 
                         to={item.route}
                         key={item.route}
                         end
                         className={({ isActive }) =>
                            `${
                              isActive && "rounded-full dark:text-[#8f51f2]  text-red-400 dark:sm:bg-[#ae7aff] sm:bg-red-500 dark:sm:text-black sm:text-white "
                            } rounded-full flex flex-col items-center dark:text-white text-black justify-center dark:border-white border-red-400  py-1 dark:focus:text-[#333] focus:text-red-300  sm:w-full sm:flex-row sm:border sm:p-1.5 dark:sm:hover:bg-[#ae7aff] sm:hover:bg-red-400 dark:sm:hover:text-white sm:hover:text-black sm:focus:border-[#ae7aff] dark:sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`
                          } >
                            <span className="inline-block w-8 h-8 sm:h-5 sm:w-5  justify-center items-center shrink-0 sm:group-hover:mr-4 lg:mr-4">
                                {item.icon}
                            </span>
                            <span className="block mt-[2px] sm:hidden sm:group-hover:inline lg:inline">
                                {item.name}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Aside