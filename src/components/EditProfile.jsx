import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {

    const [firstName, setFirstName]=useState(user.firstName);
    const [lastName, setLastName]=useState(user.lastName)
    const [age,setAge]=useState(user.age)
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
    const [about,setAbout]=useState(user.about)
    const [gender,setGender]=useState(user.gender)
    const [error,setError]=useState("")
    const[showTost,setShowTost]=useState(false)


    const dispatch=useDispatch();

    const saveProfile=async()=>{
        try {
            const res=await axios.patch(BASE_URL+"/profile/edit",
                {
                    firstName,
                    lastName,
                    age,gender,
                    photoUrl,
                    about
                },
                {withCredentials:true}
            )

            dispatch(addUser(res?.data?.data))
            setShowTost(true);

           setTimeout(()=>{
                setShowTost(false)
            },3000);



        } catch (error) {
            setError(error.response.data)
        }
    }

  return (
<div className="min-h-screen bg-base-100 flex items-center justify-center px-6 py-12">
  <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full">
    
    {/* Edit Profile Card */}
    <div className="flex-1">
      <div className="card shadow-2xl bg-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>

          <div className="space-y-4 mt-4">
            {/* First Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* About */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                placeholder="Tell us about yourself"
                className="textarea textarea-bordered w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {/* Age */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                placeholder="Age"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <input
                type="text"
                placeholder="Gender"
                className="input input-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
          </div>

          <p className='pt-2  text-red-600'>{error} </p>

          <div className="card-actions mt-6">
            <button className="btn btn-primary w-full" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>

    {/* User Card */}
    <div className="flex-1 flex justify-center">
      <UserCard user={{firstName,lastName,age,gender,photoUrl,about}} />
    </div>
    
  </div>
{ showTost && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profiled Saved successfully.</span>
  </div>
  </div>}
</div>



  )
}

export default EditProfile
