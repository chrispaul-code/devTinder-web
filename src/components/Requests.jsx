import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const Requests = () => {

    const [requests,setRequests]=useState("")


const reviewRequest = async (status, _id) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/request/review/${status}/${_id}`,
      {},
      { withCredentials: true }
    );
    console.log(res.data);

    // Remove the accepted/rejected request from UI
    setRequests((prev) => prev.filter((req) => req._id !== _id));
  } catch (err) {
    console.error("Error in reviewRequest:", err);
  }
};

  const fetchRequest=async()=>{
    const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
    console.log(res.data.data)
    setRequests(res.data.data)
  }

  useEffect(()=>{
    fetchRequest()
  },[])

    if(!requests) return;

    if(requests.length==0) return(
  <div className="flex justify-center mt-10">
    <h1 className="text-2xl font-bold">No Requests Fround</h1>
  </div>
    ) 

  return (
<>
  <div className="flex justify-center mt-10">
    <h1 className="text-2xl font-bold">Requests</h1>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {requests.map((request, index) => {
      const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

      return (
 <div
  key={index}
  className="card card-side bg-base-300 shadow-md border border-blue-200 p-4 rounded-xl hover:shadow-xl transition-all duration-200 items-center"
>
  {/* Profile Photo */}
  <figure className="w-24 h-24 rounded-full overflow-hidden mr-4">
    <img
      src={photoUrl}
      alt={`${firstName} ${lastName}`}
      className="rounded-full object-cover w-full h-full"
    />
  </figure>

  {/* User Info */}
  <div className="flex flex-col justify-center mx-5 flex-1">
    <h2 className="font-semibold text-lg">{firstName} {lastName}</h2>
    <p className="text-sm text-gray-600">{about}</p>
    <p className="text-xs mt-1 text-gray-400">{gender} · Age: {age}</p>
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-2 ">
    <button className="btn btn-primary btn-sm" onClick={()=>reviewRequest("accepted",request._id)}>Accepted</button>
    <button className="btn btn-secondary btn-sm"onClick={()=>reviewRequest("rejected",request._id)}>Rejected</button>
  </div>
</div>

      );
    })}
  </div>
</>
  )
}


export default Requests
