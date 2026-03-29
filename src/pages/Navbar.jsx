import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {MdClose, MdLogout, MdMenu} from 'react-icons/md'
import {FaClipboardList} from 'react-icons/fa6'
import { useState } from 'react'

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen ,setIsopen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout =()=>{
        localStorage.clear();
        setIsopen(false)
        navigate('/')
        
    }

    const toggleMenu =()=>{
        setIsopen(!isOpen);
    }

  return (
    <div className='sticky top-0 z-60 shadow-sm'>
    <nav className='bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm'>
        
        {/* logo and mynavbar*/}
    
        <div className='flex items-center gap-2'>
            <div className='w-9 h-9 bg-purple-600  rounded-xl flex items-center justify-center shadow-md shadow-purple-200'>
                <FaClipboardList className='text-white text-base'/>
            </div>

            <span className='text-lg font-bold bg-gradient-to-r from-black to-purple-700 bg-clip-text text-transparent'>TaskMS</span>
        </div>
        


        {/* navlinks */}
         <div className='hidden md:flex items-center bg-gray-100 border border-gray-300 rounded-4xl p-2 gap-1 ms-8'>
                <Link to='/dashboard' className='text-sm font-semibold text-black hover:text-purple-600 px-5 py-2 rounded-lg hover:bg-white hover:shadow-sm transition duration-200'>
                Dashboard </Link>

                <Link to='/create-task' className='text-sm font-semibold text-black hover:text-purple-600 px-5 py-2 rounded-lg hover:bg-white hover:shadow-sm transition duration-200'>
                Create Task </Link>

        </div>

        {/* right */}
        <div className='flex items-center gap-3 '>

            <div className='flex items-center gap-2'>
                <div className='w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center'>
                    <span className='text-purple-600 text-sm font-bold'>{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <div className='hidden md:block'>
                    <p className='text-sm font-semibold text-gray-800'>{user?.name}</p>
                    <p className='text-xs  text-gray-500'>{user?.email}</p>

                </div>
            </div>

           

            <button onClick={handleLogout} className='hidden md:flex items-center gap-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white hover:border-red-600 text-sm font-semibold ms-3 px-4 py-2 rounded-lg transition duration-200'>
                <MdLogout className='text-base'/>
                <span>Logout</span>
            </button>

            <button onClick={toggleMenu} className='md:hidden text-3xl text-gray-600 focus:outline-none'>{isOpen ? <MdClose />:<MdMenu />}</button>

        </div>

    </nav>


    {isOpen &&(
        <div className='md:hidden bg-white border-b border-gray-800 flex flex-col p-4 shadow-xl animate-in slide-in slide-in-from-top duration-200'>
             <Link to='/dashboard' onClick={toggleMenu} className='py-3 text-black font-medium border-b border-gray-50 flex items-center justify-center'>Dashboard</Link>
             <Link to='/create-task' onClick={toggleMenu} className='py-3 text-black font-medium border-b border-gray-50  flex items-center justify-center'>Create Task</Link>
             <button onClick={handleLogout} className='mt-4 flex items-center justify-center gap-3 bg-red-50 text-red-600 font-bold py-4 rounded-xl'><MdLogout />Logout</button>
        </div>
    )}
    </div>
  )
}

export default Navbar