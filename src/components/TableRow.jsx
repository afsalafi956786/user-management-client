import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TableRow({data,index,refresh,setRefresh}) {

const [open,setOpen]=useState(false)

const navigate=useNavigate()

async function deleteUser(userId){
    try{
       
        const {data}=await axios.delete('/deleteuser',{
            data:{id:userId},
        });

       if(data.status =='success'){
        setRefresh(!refresh)
        toast.success( `${data?.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
       }


    }catch(error){
        console.log(error.message)
    }

}


  return (
    <>
    <ToastContainer />
    <tr onClick={()=>setOpen(false)} className="border-b border-gray-300 ">
    <td className="px-4 text-lg py-3">{index+1}</td>
    <td className="px-4 text-lg py-3">{data.firstName} {data.lastName}</td>
    <td className="px-4 text-lg py-3">{data.email}</td>
    <td className="px-4 text-lg py-3">{data.gender}</td>
    {/* <td className="px-4 text-lg py-3">{data.status}</td> */}
     <td>
     <select className='border p-1 n bg-red-700 text-white rounded-lg' name="pets" id="pet-select">
    <option value="">{data.status}</option>
    <option className='text-black bg-white'  value="dog">Inactive</option>
     </select>
     </td>
    <td className="px-4 text-lg py-3">
    <img className='md:h-16 md:w-16 xs:h-10 xs:w-12 rounded-full object-cover' src={`https://usermanagement-c8h7.onrender.com/${data.profile}`}/></td>
    <td className="px-4 text-lg py-3 flex items-center  ">
   

    {open && (
        <div className="bg-white border mt-40 text-lg shadow-lg absolute">
          <ul className=" ">
            <li onClick={()=>navigate(`/view/${data._id}`)} className="hover:bg-gray-200 p-2 cursor-pointer flex gap-1">
              <span className="text-green-600  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              View{" "}
            </li>
            <li onClick={()=>navigate(`/editform/${data._id}`)} className="hover:bg-gray-200 p-2 cursor-pointer flex gap-1">
              <span  className="text-blue-700">
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </span>
              Edit{" "}
            </li>
            <li onClick={()=>deleteUser(data._id)}  className="hover:bg-gray-200 p-2 cursor-pointer flex gap-1">
              <span  className="text-red-700 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Delete{" "}
            </li>
          </ul>
        </div>
      )}
      <div className=" p-4 text-md font-medium text-center  rounded-lg  ">
        <svg
        
         onClick={(e) =>{
          e.stopPropagation()
           setOpen(!open)
        } }
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>

    </td>
  </tr>
</>
  )
}

export default TableRow