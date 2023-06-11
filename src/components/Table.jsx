import React, { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";
function Table() {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [refresh,setRefresh]=useState(false);
  const [search,setSearch]=useState('');
  

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/user?page=${page}&limit=5`);
      setUser(data);
    })();
  }, [page,refresh]);

  async function handleSearch(e){
    e.preventDefault();
   const {data}= await axios.get(`/search?name=${search}`);
    setUser(data);

  }

  async function handleExport(){
    try{
    const response=await axios.get('/export/csv');
    const blob=new Blob([response.data],{type:'text/csv'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a')
    link.href=url;
    link.setAttribute('download','table_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }catch(error){
      console.error('Error exporting data:', error);
      console.log('Error response:', error.response);
    }

  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12 ">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 ">
        <form className="flex items-center py-2 gap-4" onSubmit={handleSearch}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex  items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input onChange={(e)=>setSearch(e.target.value)}
              type="text" 
              value={search}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded block w-full pl-10 p-2 outline-none sm:w-[200px]  "
              placeholder="Search"
              required=""
            />
          </div>
          <button className="bg-red-700 text-white rounded px-3 py-2 hover:bg-red-800">
            Search
          </button>
        </form>

        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Link
              to={"/addform"}
              className="bg-red-700  w-full md:w-auto flex items-center justify-center py-2 px-3 font-large text-white rounded hover:bg-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add User
            </Link>

            <button
              type="button" onClick={handleExport}
              className="bg-red-700  w-full md:w-auto flex items-center justify-center py-2 px-3 font-large text-white rounded hover:bg-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Export to Csv
            </button>
          </div>
        </div>
      </div>
      {/* <!-- table start--> */}
      <div className="bg-white border shadow-xl  sm:rounded-lg overflow-hidden">
        <div className="overflow-x-auto ">
          <table className="w-full text-sm text-left relative ">
            <thead className="text-xs text-white bg-black">
              <tr className="">
                <th scope="col" className="px-4 py-3">
                  ID
                </th>
                <th scope="col" className="px-4 py-3">
                  FullName
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Gender
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Profile
                </th>
                <th scope="col" className=" py-3">
                  Action
                </th>
              </tr>
            </thead>
            {user?.length !==0 ? (
              <tbody>
                {user.map((data, index) => (
                  <TableRow key={data._id} data={data} index={index} refresh={refresh} setRefresh={setRefresh} />
                ))}
              </tbody>
            ) : (
                     
                <tr className="text-red-600 text-2xl text-center font-bold ">No data available</tr>
           
            )}
          </table>
        </div>

        <div className="flex border border-gray-300 py-5 px-6 justify-end  ">
          <div className="border text-red-700 hover:bg-gray-300 cursor-pointer">
            <svg
              onClick={() => {
                if (page >1) setPage((prev) => prev - 1);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-4 mt-3 tex-red"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="px-4 py-2 bg-red-700 text-white">
            <p>{page}</p>
          </div>
          <div className="border text-red-700 hover:bg-gray-300 cursor-pointer">
            <svg
              onClick={() => setPage((prev) => prev + 1)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-4 mt-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
