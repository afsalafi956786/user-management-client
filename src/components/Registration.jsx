import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function Registration({ api, edit }) {
  const [display, setDisplay] = useState(null);
  const [profile, setProfile] = useState(null);
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const [mobileErr, setMobileErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { userId } = useParams();
 

  useEffect(() => {
    (async () => {
      try {
        if (edit) {
          const { data } = await axios.get(`/getEdituser?id=${userId}`);
          setName(data.firstName);
          setLastName(data.lastName);
          setProfile(data.profile)
          setMobile(data.mobile);
          setEmail(data.email);
          setGender(data.gender);
          setStatus(data.status);
          setLocation(data.location);
        }
      } catch (error) {
        console.log(error.message)
      }
    })();
  }, []);

  function uploadImg(ev) {
    const files = ev.target.files[0];
    setDisplay(URL.createObjectURL(files));
    setProfile(files);
  }
  async function handleSubmit() {
    console.log(status, "---");
    if (
      firstName &&
      lastName &&
      mobile &&
      email &&
      gender &&
      status &&
      location &&
      profile
    ) {
      let regName = /^[a-zA-Z\s]+$/;
      let regMobile = /^[0-9]{10}$/;
      if (regName.test(firstName)) {
        console.log("keri");
        if (regMobile.test(mobile)) {
          console.log("mobile keri");
          const formData = new FormData();
          formData.append("firstName", firstName);
          formData.append("lastName", lastName);
          formData.append("email", email);
          formData.append("gender", gender);
          formData.append("profile", profile);
          formData.append("mobile", mobile);
          formData.append("status", status);
          formData.append("location", location);
          if(edit){
            const { data } = await axios.post(`${api}/${userId}`, formData, {
              headers: {
                "Content-type": "multipart/form-data",
              },
            }); 
            if (data.status == "success") {
              toast.success(` ${data?.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
  
              setTimeout(() => {
                setRedirect(true);
              }, 2000);
            } else {
              toast.error(`${data?.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
            
          }else{
             const { data } = await axios.post(`${api}`, formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }); 
          if (data.status == "success") {
            toast.success(` ${data?.message}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {
              setRedirect(true);
            }, 2000);
          } else {
            toast.error(`${data?.message}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          }
        

        } else {
          setMobileErr("Invalid Mobile Number!!");
        }
      } else {
        setNameErr("Invalid Name Character!!");
      }
    } else {
      toast.error(` All fileds are required!!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full  px-4 pb-12">
      <ToastContainer />
      <div className="text-center pb-6 pt-6">
        <h1 className="font-bold text-3xl">Register Your Details</h1>
      </div>

      <div className="max-w-[1240px] mx-auto border shadow-xl bg-gray-50 border-gray-200 p-4">
        <div className="flex justify-center py-4 -ml-6">
          {profile ? (
            <img
              src={display || `https://usermanagement-c8h7.onrender.com/${profile}`}
              alt="profile"
              className="h-24 w-24 object-cover border rounded-full cursor-pointer  border-gray-400"
            />
          ) : (
            <img
              src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
              alt=""
              className="h-20 w-20 object-cover border rounded-full cursor-pointer  border-gray-400"
            />
          )}
        </div>
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col pb-3 ">
            <label className="text-xl py-2">First name</label>
            {nameErr ? <p className="text-red-600">{nameErr}</p> : ""}
            <input
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              className="md:w-[90%] border-gray-300 outline-none px-2 py-2 rounded border"
              type="text"
              placeholder="Enter First name"
            />
          </div>

          <div className="flex flex-col pb-3 ">
            <label className="text-xl py-2">Last name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="md:w-[90%]  outline-none border-gray-300 px-2 py-2 rounded border"
              type="text"
              placeholder="Enter First Name"
            />
          </div>

          <div className="flex flex-col pb-3 ">
            <label className="text-xl py-2">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="md:w-[90%]  outline-none border-gray-300 px-2 py-2 rounded border"
              type="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="flex flex-col pb-3 ">
            <label className="text-xl py-2">Mobile</label>
            {mobileErr ? <p className="text-red-600">{mobileErr}</p> : ""}
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="md:w-[90%]  outline-none border-gray-300 px-2 py-2 rounded border"
              type="text"
              placeholder="Enter Mobile"
            />
          </div>
          <div className="">
            <p className="ml-1 text-xl">Select Your Gender</p>
            <div className="flex py-4">
              <input
                id="default-radio-1"
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                name="default-radio"
                className="w-6 h-6 cursor-pointer "
              />
              <label htmlFor="default-radio-1" className="ml-2 font-medium ">
                Male
              </label>
            </div>
            <div className="flex mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                name="default-radio"
                className="w-6 h-6 cursor-pointer"
              />
              <label htmlFor="default-radio-1" className="ml-2  font-medium ">
                Female
              </label>
            </div>
          </div>

          <div className="flex flex-col pb-3 ">
            <label className="text-xl py-2">Select your Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="py-2 border md:w-[90%] outline-none cursor-pointer text-gray-600"
            >
              <option value="" disabled>
                Select your Status
              </option>
              <option className="p-4 cursor-pointer text-black " value="Active">
                Active
              </option>
              <option
                className="p-4 cursor-pointer text-black"
                value="InActive"
              >
                InActive
              </option>
            </select>
          </div>

          <div className="flex flex-col pb-3">
            <label className="text-xl py-2">Select Your Profile</label>
            <input
              className="md:w-[90%] border-gray-300 px-2 py-2 rounded border cursor-pointer"
              type="file"
              placeholder="Enter First name"
              onChange={uploadImg}
            />
          </div>
          <div className="flex flex-col pb-3  ">
            <label className="text-xl py-2">Enter Your Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="md:w-[90%]  outline-none border-gray-300 px-2 py-2 rounded border"
              type="text"
              placeholder="Enter Your Location"
            />
          </div>
        </div>
        <div className="">
          <button
            onClick={handleSubmit}
            className="bg-red-800 hover:bg-red-900 w-full rounded text-white p-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
