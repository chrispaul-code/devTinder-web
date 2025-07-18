import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from "./NavBar"
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const Body = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate()
  const userData=useSelector((store)=>store.user)
 
  const fetchData=async()=>{
    try {
      const res=await axios.get(BASE_URL+"/profile/view",{
        withCredentials: true,
      })
    
      dispatch(addUser(res?.data))
    } catch (error) {
      if(error.status==401){
        navigate("/login")
      }
      
      console.error(error)
    }
  }

  useEffect(()=>{
    if(!userData){
       fetchData();
    }
  },[])
  


  return (
    <div>
      <NavBar/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Body
