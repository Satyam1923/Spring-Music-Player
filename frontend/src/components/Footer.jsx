import React from 'react'
import { IoIosCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { TiLocation } from "react-icons/ti";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className='h-[500px] w-full flex flex-col bgfooter md:h-full'>
           {/* //for logo and social links */}
         <div className='sec1 md:text-[40px] xs:text-[36px]'>
            
            <div>
                SPRING
            </div>
            
         </div>
         <div class="divider md:h-[1.5px] sm:h-[1px]"></div>
         {/* //for links */}
         <div className='sec2 '>
            <div className=' grid grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-20 sm:gap-10 sm:p-6 md:p-10'>
            <ul className='topsong'>
                <h2 className='head'>Top Songs</h2>
                <li>Dekhha Tenu</li>
                <li>Satranga</li>
                <li>Pehle bhi main</li>
                <li>Sajjni</li>
                <li>Chal tere ishq main</li>
                <li>Din Chadheya</li>
                <li>Dekha Jabse</li>
                <li>Husn</li>
                <li>Vida karo</li>
            </ul>
            <ul className='topartist'>
            <h2 className='head'>Top Artist</h2>
                <li>Arijit Singh</li>
                <li>Shreya Ghoshal</li>
                <li>Anuv Jain</li>
                <li>B Praak</li>
                <li>Zaeden</li>
                <li>Atif Aslam</li>
                <li>Vishal Shekhar</li>
                <li>Aditya Gadhvi</li>
            </ul>
            <ul className='topplaylist'>
            <h2 className='head'>Top Playlist</h2>
                <li>Dekhha Tenu</li>
                <li>Satranga</li>
                <li>Pehle bhi main</li>
                <li>Sajjni</li>
                <li>Chal tere ishq main</li>
                <li>Chal tere ishq main</li>
            </ul>
            <ul className='company'>
            <h2 className='head'>Top Albums</h2>
                <li>Dekhha Tenu</li>
                <li>Satranga</li>
                <li>Pehle bhi main</li>
                <li>Pehle bhi main</li>
                <li>Pehle bhi main</li>
                <li>Pehle bhi main</li>
                <li>Sajjni</li>
                <li>Chal tere ishq main</li>
            </ul>
            <ul className='company'>
            <h2 className='xs:text-[5px]'>Company</h2>
                <li>About Us</li>
                <li>Culture</li>
                <li>Blog</li>
                <li>Terms and Policy</li>
                <li>Help and Support</li>
                
            </ul>
           
            
            </div>
         </div>
         <div class="divider md:h-[1.5px] sm:h-[1px]"></div>
         <div className='sec3 md:p-3'>
        <span>FOLLOW US AT:</span>
        <div className='  flex flex-wrap  justify-center items-center gap-5 md:gap-2'>
        <span className='icons'>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                > <AiOutlineInstagram
                color="white"
                fontSize={25}
                className="ico "
              /></a></span>
                <span  className='icons'><a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter color="white" fontSize={27} className="ico" />

                </a></span>
                <span  className='icons'><a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsYoutube color="white" size={26} className="ico " />
                </a></span>
                <span  className='icons'> <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn color="white" size={26} className="ico " />
                </a></span>
                <span  className='icons'><a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF color="white" size={26} className="ico " />
                </a></span> 
        </div>
</div>
<div class="divider md:h-[1.5px] sm:h-[1px] "></div>
<div className='sec4 md:p-3 sm:text-[10px]'>
© Entertainment Network India Ltd. 2024, All Rights Reserved
</div>
        </div>
  )
}

export default Footer