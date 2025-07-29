import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const dispatch =useDispatch();
  const feed=useSelector((store)=>store.feed)

  const getFeed=async()=>{
    // if(feed) return;
    const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
    dispatch(addFeed(res?.data?.data))
    
  }

useEffect(()=>{
   getFeed();
},[])

if(!feed) return;

if(feed.length<=0) return (
    <div className="flex justify-center mt-10">
    <h1 className="text-2xl font-bold">No new users found!!</h1>
  </div>
)
  return (
   feed&&(
    <div className='flex justify-center my-10 mb-20 '>
       <UserCard user={feed[0]}/>
    </div>
    )
  )
}

export default Feed
