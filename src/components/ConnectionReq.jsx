import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const ConnectionReq = () => {

    const [connections,setConnections]=useState([])

    const fetchConnections=async()=>{
        const res= await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
       
        setConnections(res?.data)
    }

    useEffect(()=>{
       fetchConnections();
    },[])

    if(!connections) return;

    if(connections.length==0) return <h1>No Connections Found</h1>

  return (
<>
  <div className="flex justify-center mt-10">
    <h1 className="text-2xl font-bold">Connections</h1>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {connections.map((connection, index) => {
      const { firstName, lastName, photoUrl, age, gender, about } = connection;

      return (
        <div
          key={index}
            className="card card-side bg-base-300 shadow-md border border-blue-200 p-4 rounded-xl hover:shadow-xl transition-all duration-200 items-center"
        >
  <figure className="w-24 h-24 rounded-full overflow-hidden mr-4">
    <img
      src={photoUrl}
      alt={`${firstName} ${lastName}`}
      className="rounded-full object-cover w-full h-full"
    />
  </figure>

          <div className="flex flex-col justify-center mx-5">
            <h2 className="font-semibold text-lg">{firstName} {lastName}</h2>
            <p className="text-sm text-gray-600">{about}</p>
            <p className="text-xs mt-1 text-gray-400">{gender} Age: {age}</p>
          </div>
        </div>
      );
    })}
  </div>
</>
  )
}

export default ConnectionReq
