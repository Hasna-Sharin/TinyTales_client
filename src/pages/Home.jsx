import React, { useEffect, useState,useContext } from 'react'
import Post from '../components/Post';
import axios from 'axios';
import getUserData  from '../utils/getUserData';
import { AuthContext, useAuth } from '../context/Authcontext';
import { Key } from 'lucide-react';

const Home = () => {
  const [blogs,setBlogs]=useState([]);
  // const data=getUserData()

  const {user} = useAuth()

  const fetchBlogs = async()=>{
    try{
       const res = await axios.get("https://tinytales-server.onrender.com/user/get-posts",{
        headers:{
          Authorization:`Bearer ${user.token}`
       }

       })
       
      
        
       
      //  console.log(res.data);
       setBlogs(res.data.Posts.reverse())
    }catch(err){
       console.log(err);
    }
  }
  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
    <div className='w-full min-h-screen bg-white/45 px-4 md:px-12 pt-20 text-black'>
      <div className='w-full flex flex-col gap-5 items-center '>
        {blogs.map((blog, i) => (
          <Post key={i} blog={blog} i={i}/>
          // {post(Key={i} blog={blog} i={i}) }
        ))}
      </div>

    </div>
  )
}

export default Home