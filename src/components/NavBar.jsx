import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
 
  const user=useSelector((store)=>store.user)
  const dispatch =useDispatch()
  const navigate=useNavigate()

  const handleLogout=async()=>{
    try {
      const user=await axios.post(BASE_URL+"/logout",{
      },{withCredentials:true})

       dispatch(removeUser());

       return navigate("/login")

    } catch (error) {
      res.send("ERROR")
    }
  }

  return (
    <div>
  <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
  </div>
  <div className="flex-none gap-2">

    {user && <div className="dropdown dropdown-end mx-5 flex ">
      <h2 className='p-2 mt-1 font-semibold'>Welcome, {user.firstName +" "+ user.lastName}</h2>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow mt-12 ">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to={"/connections"}>Connections</Link></li>
        <li><Link to={"/requests"}>Request</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
      </div>
    </div>
  )
}

export default NavBar
