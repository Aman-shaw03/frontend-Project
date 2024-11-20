import React, {useRef} from 'react'
import {Logo, LogoutBtn} from '../index'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import { icons } from '../../assets/icons';
import some from "../../assets/some.png"
import {DarkModeToggleForSmall} from "../Atoms/Darkmode"

function Header() {
  const navigate = useNavigate()
  let {userData, status: authStatus} = useSelector(({auth})=> auth)
  const searchInputRef = useRef()
  const smallSearchInputRef = useRef()


  function handleSearchQuery(input){
    let searchQuery = input.trim()
    if(!searchQuery){
      searchInputRef.current.focus()
      return
    }
    navigate(`/results?search_query=${searchQuery}`)
  }

  const username = userData?.username;

  const HamnburgerMenu =[
    {
      name: "Home",
      route: "",
      icon: icons.Home,
    },
    {
      name: "Liked Videos",
      route: "feed/liked",
      icon: icons.Like,
    },
    {
      name: "History",
      route: "feed/history",
      icon: icons.history,
    },
    {
      name: "Playlists",
      route: `/channel/${username}/playlists`,
      className: `${username ? "" : "hidden"}`,
      icon: icons.folder,
    },
    {
      name: "Admin",
      route: "/admin/dashboard",
      className: `${username ? "" : "hidden"}`,
      icon: icons.Admin,
    },
    {
      name: "Subscribers",
      route: "feed/subscribers",
      icon: icons.Subscribers,
    },
    {
      name: "Support",
      route: "support",
      icon: icons.support,
    },
    {
      name: "Settings",
      route: "settings",
      className: `${username ? "" : "hidden"}`,
      icon: icons.Settings,
    },
  ]

  return (
      <header className="sticky inset-x-0 top-0 z-50 w-full border-b dark:border-white border-red-300  dark:bg-[#121212] bg-white  px-4">
        <nav className="mx-auto flex items-center py-2 w-full">
          <logo/>
          <form 
           onSubmit={(event)=> {
            event.preventDefault()
            handleSearchQuery(searchInputRef.current.value)
            className="hidden items-start w-full max-w-lg mx-auto sm:inline-flex"
          }}
          >
            <div className="relative w-full max-w-lg overflow-hidden">
              <input
               ref={searchInputRef}
               className="w-full border rounded-l-full dark:focus:border-[#ae7aff] bg-transparent py-1 pl-8 pr-3 border-zinc-300  focus:border-red-500 text-black dark:placeholder-white outline-none sm:py-2"
               placeholder="Search" 
              />
              <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className=" h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
              </span>
            </div>
            <button 
            type="submit"
            className=" border-r border-b border-t rounded-r-full px-3 py-1 bg-transparent hover:text-red-500 text-zinc-500 border-zinc-300 dark:hover:text-[#ae7aff] dark:hover:bg-gray-500/10"
             >
              <div className=" size-6 sm:size-8 flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="size-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </div>
              
            </button>

          </form>
          {/* for small devices */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSearchQuery(smallSearchInputRef.current.value);
            }}
            className="sm:hidden items-start w-full"
          >
            <div className="relative w-full max-w-lg overflow-hidden">
              <input
                ref={smallSearchInputRef}
                className="w-full border rounded-full  border-zinc-300  focus:border-red-500 text-black dark:focus:border-[#ae7aff] bg-transparent py-1 pl-2 pr-3 dark:placeholder-white outline-none"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-2 dark:hover:text-[#ae7aff]  hover:text-red-500 text-zinc-500 top-1/2 inline-block -translate-y-1/2"
              >
                {icons.search}
              </button>
            </div>
          </form>
        </nav>
      </header>
  )
}

export default Header