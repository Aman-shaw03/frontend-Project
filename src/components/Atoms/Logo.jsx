import React from 'react'
import {Link} from "react-router-dom"
import some from "../../assets/some.png"
function Logo({
  width = "w-12 sm:w-16 ", 
  className = "" 
}) {
  return (
    <Link to={"/"}>
      <div className={`mr-4 ${width} shrink-0 ${className}`}>
        <img src={some} alt="" className="w-12 rounded  h-18" />
      </div>
    </Link>
  );
}

export default Logo