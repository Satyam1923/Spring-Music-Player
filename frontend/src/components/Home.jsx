import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'

function Home() {
  return (
    <div className='flex w-screen h-screen'>
        <NavBar />
        <HomeContent />
        <SideBar />
    </div>
  )
}

function HomeContent() {
  return (
    <div className='bg-slate-400 h-full text-center flex-1'>
        HomeContent
    </div>
  )
}

export default Home