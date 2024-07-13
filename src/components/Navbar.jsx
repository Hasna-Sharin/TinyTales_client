import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { Menu } from 'lucide-react'

const Navbar = () => {
  const isLoggedIn = true
  const {user,logout} = useAuth()
  console.log(user);
  

  const [toggleBtn, setToggleBtn] = useState(false)
  const [drawer,setDrawer]=useState(false)

  return (
    <div className='w-full z-50 bg-gray-300 h-16 fixed top-0 left-0 flex text-white justify-between items-center px-10'>
      <h1 className='text-2xl font-extrabold text-black'>Tiny<span className='text-orange-600'>Tale</span></h1>
      {isLoggedIn &&
        <ul className='flex max-md:hidden gap-5 items-center text-orange-600'>
          <Link to={"/"}>All Blogs</Link>
          <Link to={"/create-post"}>Create Post</Link>
          <Link to={"/profile"}>My Posts</Link>

          <div className='relative'>
            <div id="dropdown" className="z-10 relative bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
              <button onClick={() => setToggleBtn(!toggleBtn)} className="text-orange-600 bg-white/75   focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-gray-400 " type="button">{user.user.username}</button>
              <ul hidden={toggleBtn} className="py-2  text-sm text-gray-700 dark:text-gray-200 absolute top-12" aria-labelledby="dropdownDefaultButton">
                <li onClick={logout} className='bg-gray-700 w-full cursor-pointer'>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </ul>
        
      }
      <div className='md:hidden flex relative ' onClick={()=>setDrawer(!drawer)}>
        <Menu className='text-black' />
          {drawer&&<div className='flex flex-col  relative -bottom-28 -right-7'>
              <ul className='text-black  text-sm flex flex-col bg-gray-300 rounded-md'>
              <Link className='p-2 border-b' to={"/"}>All Blogs</Link>
              <Link className='p-2 border-b' to={"/create-post"}>Create Post</Link>
              <Link className='p-2 border-b' to={"/profile"}>My Posts</Link>
                {/* <li className='p-2 border-b'>Sachin</li> */}
                <li onClick={logout} className='p-2 border-b'>Logout</li>
              </ul>
            </div>
          }
        </div>

    </div>
  )
}

export default Navbar