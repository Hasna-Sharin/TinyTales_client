import React, { useEffect, useState } from 'react'
import {ChevronDown, Edit, LoaderIcon, ThumbsDown, ThumbsUp, Trash } from 'lucide-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const Profile = () => {

    const [collapsedPost,setCollapsedPost]=useState(null)

    // const filterdBlogs = blogs.filter((b) => b.userId === "1")
    // const data = getUserData()

    const {user} = useAuth()

    const [blogs,setBlogs]=useState([]);
    const [loading,setLoading]=useState(true)
    console.log(blogs);
    const fetchBlogs = async()=>{
      try{
         const res = await axios.get("https://tinytales-server.onrender.com/user/logedUser-posts/"+user.user._id,{
            headers:{
              Authorization:`Bearer ${user.token}`
           }
    
           })
         console.log(res.data);
         setBlogs(res.data.posts.reverse())
         setLoading(false)
      }catch(err){
         console.log(err);
      }
    }
    useEffect(()=>{
      fetchBlogs()
    },[])

    
    const deletePost = async(id)=>{
       
        try{
            const res = await axios.delete(`https://tinytales-server.onrender.com/user/delete-post/${id}`,{
                headers:{
                  Authorization:`Bearer ${user.token}`
               }
        
               })
            const value = res.data;
            console.log(value);
            const deletedValue = blogs.filter(item=>item._id !==id)
                setBlogs(deletedValue)
                
            // const deletedValue = blogs.filter()
        }catch(err){
            console.log(err);

        }
    }
    return (
        
        <div className='w-full  min-h-scree p-4 md:px-12 pt-20 '>
            {loading&&<div className="absolute w-full h-screen md:h-screen flex justify-center items-center top-0 left-0 bg-[#00000050]">
          <LoaderIcon className="h-28 w-28 animate-spin" />
        </div>}
            <div className='w-full bg-[#FDF9F6] my-5 h-28 flex flex-col items-center justify-evenly text-black/65 '>
                <h1 className='text-3xl font-bold'>{user.user.username}</h1>
                <p className='text-lg'><span className='text-xl font-bold mr-2'>{blogs.length}</span>Posts</p>
            </div>
            {blogs.length===0 ? (
            <div className='flex justify-center text-xl md:text-4xl mt-20 text-black/65 rounded'>
            <button className='bg-[#FDF9F6] px-4 py-2 md:px-8 md:py-5 font-bold '>No Posts yet <br />Create One</button>

            </div>) : (
            <div className='w-full flex flex-col gap-5 items-center '>
                {blogs?.map((blog, i) =>  (
                    
                    <div key={i} className={`relative w-full flex flex-col md:flex-row justify-between items-center border-2 bg-[#FDF9F6] gap-8 shadow-md p-4 md:p-10 ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                        <img src={blog.image} alt="" className='h-auto w-full md:w-1/3' />
                        
                        <div className='w-full  md:w-2/3 flex flex-col gap-5 md:p-10 '>
                            <ChevronDown onClick={()=>setCollapsedPost(collapsedPost ===i ? null : i)} className={`cursor-pointer md:h-10 md:w-10 h-6 w-6 absolute right-2 md:top-5 ${i % 2 === 0 ? " md:right-5" : " md:left-5"} ${collapsedPost ===i && "rotate-180"}`}/>
                            <h1 className='text-lg md:text-2xl  font-bold uppercase text-orange-500' >{blog.title}</h1>
                            <p hidden={collapsedPost !==i} className='text-lg md:text-xl font-thin text-black'>{blog.desc}</p>
                            {/* <p hidden={collapsedPost !==i}>{blog.content}</p> */}
                            <p className='italic text-black'>posted by : <span className='font-bold capitalize'>{user.user.username}</span></p>
                            <p className='italic text-black'>Baby : <span className='font-bold capitalize'>{blog.baby}</span></p>
                            <div className='flex gap-5'>
                                <div className='flex items-center gap-2'>
                                    <ThumbsUp />
                                    <p className='text-sm'>{blog.likes.length}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <ThumbsDown className='mt-2' />
                                    <p className='text-sm'>{blog.dislikes.length}</p>
                                </div>
                            </div>
                            <div className='flex gap-3 p-1 '>
                                <Link to={`/edit-post/${blog._id}`}>
                                <button type="submit" className="w-28 md:w-fit px-3  md:px-10 flex  items-center justify-center gap-1 text-white cursor-pointer hover:bg-orange-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-xs md:text-sm py-1.5 md:py-2.5 text-center bg-orange-600 "><Edit/> Edit Post</button>

                                </Link>
                                <button onClick={()=>deletePost(blog._id)} type="submit" className="w-32 md:w-fit px-3 md:px-10 flex  items-center justify-center gap-1 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs md:text-sm  md:py-2.5 text-center "><Trash/> Delete Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)}

        </div>
    )
}

export default Profile