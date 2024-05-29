import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoImages } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { BsImages } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHome } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import './sidebar.css';
const Sidebar = () => {
  return (
    <aside>

      <div className="home">
        <FaHome className="searchlogo"/>
        <p>      Home</p>
      </div>
      <div className="home">
        <FaSearch className="searchlogo" />
        <p>      Search</p>
      </div>

      <div className="option1">
        <b>MENU</b>



        <a style={{ cursor: 'pointer' }}>
          <IoHomeOutline fontSize={"20px"} />
          {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
          <p>My drive</p>

        </a>


        <a style={{ cursor: 'pointer' }}>
          <IoImages fontSize={"20px"} />
          <p>Albums</p>

        </a>
        <a style={{ cursor: 'pointer' }}>
          <MdLibraryMusic fontSize={"20px"} />
          {/* <i className="fa fa-clone" aria-hidden="true"></i> */}
          <p>Music</p>

        </a>
        <a style={{ cursor: 'pointer' }}>
          <GrUserManager fontSize={"20px"} />
          {/* <i className="fa fa-star-o" aria-hidden="true"></i> */}
          <p>Artist</p>

        </a>

      </div>

      <div className="option1">
        <b>PlayList</b>


        <a style={{ cursor: 'pointer' }}>
          <BsImages fontSize={"20px"} />
          {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
          <p> playlist1</p>


          <RiDeleteBin6Line className='delete' />
        </a>
        <a style={{ cursor: 'pointer' }}>
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