import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoImages } from "react-icons/io5";
import { MdLibraryMusic} from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { BsImages } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
const Sidebar = () => {
  return (
    <aside>
  
      <div className="searchbar">
      <CiSearch fontSize={"25px"}/> <input type="search" placeholder='Search Song' /> 
      </div>
 
 <div className="option1">
 <b>MENU</b>

 
    
  <a href="javascript:void(0)">
  <IoHomeOutline fontSize={"20px"} />
    {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
    <p>My drive</p>
    
  </a>


  <a href="javascript:void(0)">
  <IoImages fontSize={"20px"}/>
  <p>Albums</p>
   
  </a>
  <a href="javascript:void(0)">
  <MdLibraryMusic fontSize={"20px"}/>
    {/* <i className="fa fa-clone" aria-hidden="true"></i> */}
    <p>Music</p>
    
  </a>
  <a href="javascript:void(0)">
    <GrUserManager fontSize={"20px"}/>
    {/* <i className="fa fa-star-o" aria-hidden="true"></i> */}
    <p>Artist</p>
    
  </a>

 </div>

 <div className="option1">
 <b>PlayList</b>


  <a href="javascript:void(0)">
    <BsImages fontSize={"20px"}/>
    {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
    <p> playlist1</p>
   

    <RiDeleteBin6Line className='delete' />
  </a>
  <a href="javascript:void(0)">
    <BsImages fontSize={"20px"}/>
    {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
    <p> playlist1</p>
   

    <RiDeleteBin6Line className='delete'/>
  </a>


 

 </div>

 
</aside>
  )
}

export default Sidebar