import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ViewUser() {
    const { userId } = useParams();
    const [user,setUser]=useState({})

    useEffect(()=>{
        (async()=>{
          const {data}=await axios.get(`/getOneuser?id=${userId}`)
          setUser(data)
        })()
    },[])

  return (
    <div className="flex  h-screen w-full justify-center py-24">

    <div className="">
        <div className="bg-white shadow-2xl rounded-lg py-3 border p-16">
            <div className="photo-wrapper p-2">
                <img className="w-32 h-32 rounded-full mx-auto" src={`https://usermanagement-c8h7.onrender.com/${user?.profile}`} alt="profile"/>
            </div>
            <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user?.firstName} {user.lastName}</h3>
                <table className="text-xs my-3">
                    <tbody><tr>
                        <td className="px-2 text-lg py-2 text-gray-500 font-semibold">Email</td>
                        <td className="px-2 text-lg py-2">{user?.email}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2 text-lg text-gray-500 font-semibold">Phone</td>
                        <td className="px-2 py-2 text-lg">{user?.mobile}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2 text-lg text-gray-500 font-semibold">Location</td>
                        <td className="px-2 py-2 text-lg">{user?.location}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2 text-lg text-gray-500 font-semibold">Gender</td>
                        <td className="px-2 py-2 text-lg">{user?.gender}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2 text-lg text-gray-500 font-semibold">Staus</td>
                        <td className="px-2 py-2 text-lg">{user?.status}</td>
                    </tr>
                </tbody></table>
    
          
    
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default ViewUser