import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoImages } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { BsImages } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
const Sidebar = () => {
  return (
    <aside>

      <div className="searchbar">
        <CiSearch className="cursor-pointer transition-all h-8 hover:scale-110 duration-300 ease-in-out"/>
        <input type="search" placeholder='Search Song' className='placeholder:text-white' />
      </div>

      <div className="option1">
        <div className='py-2 font-bold'>MENU</div>



        <a href="javascript:void(0) px-52">
          <IoHomeOutline fontSize={"20px"} />
          {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
          <p>My drive</p>

        </a>


        <a href="javascript:void(0) px-52">
          <IoImages fontSize={"20px"} />
          <p>Albums</p>

        </a>
        <a href="javascript:void(0) px-52">
          <MdLibraryMusic fontSize={"20px"} />
          {/* <i className="fa fa-clone" aria-hidden="true"></i> */}
          <p>Music</p>

        </a>
        <a href="javascript:void(0) px-52">
          <GrUserManager fontSize={"20px"} />
          {/* <i className="fa fa-star-o" aria-hidden="true"></i> */}
          <p>Artist</p>

        </a>

      </div>

      <div className="option1">
        <div className='font-bold py-2'>PlayList</div>


        <a href="javascript:void(0)">
          <BsImages fontSize={"20px"} />
          {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
          <p> playlist1</p>


          <RiDeleteBin6Line className='delete' />
        </a>
        <a href="javascript:void(0)">
          <BsImages fontSize={"20px"} />
          {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
          <p> playlist1</p>


          <RiDeleteBin6Line className='delete' />
        </a>




      </div>


    </aside>
  )
}

export default Sidebar