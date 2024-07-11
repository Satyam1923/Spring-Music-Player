import React from "react";
import { useState,useEffect } from "react";
import {auth,db} from './Auth/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Link } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserIconSection() {
  const [userDetails, setUserDetails] = useState(null)
  const fetchUserData = async () => {
    auth.onAuthStateChanged((async (user) => {
      console.log(user);
      localStorage.setItem("user", JSON.stringify
        (user))
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          // console.log(docSnap.data())
        } else {
          console.log("User is not logged in")
        }
      }
    }))
  }
  useEffect(() => {
    fetchUserData();
  }, [])

const logout = async () => {
  try {
      await auth.signOut();
      console.log("Logged out");
      setUserDetails(null);
      toast.info("Logged Out!")
  } catch (err) {
      console.log(err.message);
  }
};
  return (
    <>
<ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme='dark'
                
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    <div className="w-full min-h-12 relative hover:cursor-pointer">
      <div className="h-full flex gap-10 justify-end mr-12">
        <div className="flex h-full bg-[#18181D] rounded-md">
          
          <div className="bg-[#18181D] h-full p-5 flex rounded-lg items-center justify-center">
            <h2 className="text-white flex gap-3 items-center">
            {userDetails?
                <>
                  {userDetails.photo ?
                  <div >
                  
                  <img
                    src={userDetails.photo}
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  </div>:
                  <div><FaUser fontSize="15px" color="white" /></div>
                  }
                  <div>{userDetails.name}</div>
                  
                </> :
                <Link to='/login' className="flex gap-2  items-center ">
                  <IoIosLogIn fontSize="18px" color="white" />
                    Login
                </Link>}
            </h2>
          </div>
        </div>
            {userDetails &&
        <div className="flex h-full bg-[#18181D] rounded-md">
          
          <div className="bg-[#18181D] h-full p-5 flex rounded-lg items-center justify-center">
            <h2 className="text-white flex gap-3 items-center">
              <button onClick={logout} className="flex gap-1">

            <span><IoIosLogIn fontSize={"25px"} color={"white"} /></span>
            <span>Logout</span>
          </button> 
            </h2>
          </div>
        </div>
          }
      </div>
    </div>
    </>
  );
}

export default UserIconSection;
