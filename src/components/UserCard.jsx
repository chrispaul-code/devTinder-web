import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName , photoUrl,age,gender , about}=user
  return (
    <div className='mb-20'>
      <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={user.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender && <p>{age + ", "+ gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4 ">
        <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Intrested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
