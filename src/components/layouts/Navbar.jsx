import React from 'react'
import SideMenu from './SideMenu'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useState } from 'react'

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
 <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-50 shadow-sm justify-between items-center lg:justify-start lg:gap-10 lg:py-4 lg:px-10'>
    <button 
    className='block lg:hidden text-black'
    onClick={() => {
        setOpenSideMenu(!openSideMenu)
    }}
    >
        {openSideMenu ? (
            <HiOutlineX className='text-2xl' />
        ) : (
            <HiOutlineMenu className='text-2xl' />
        )}
    </button>

    <h2 className='text-lg font-medium text-black'>Task Flex</h2>
    {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu activeMenu={activeMenu} />
        </div>
    )}  
 </div>
  )
}

export default Navbar
