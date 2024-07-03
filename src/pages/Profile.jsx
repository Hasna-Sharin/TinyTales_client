import React, { useEffect, useState } from 'react'
import {ChevronDown, Edit, ThumbsDown, ThumbsUp, Trash } from 'lucide-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const Profile = () => {

    const [collapsedPost,setCollapsedPost]=useState(null)

    // const filterdBlogs = blogs.filter((b) => b.userId === "1")
    // const data = getUserData()

    const {user} = useAuth()

    const [blogs,setBlogs]=useState([]);
    console.log(blogs);
    const fetchBlogs = async()=>{
      try{
         const res = await axios.get("http://localhost:5000/user/logedUser-posts/"+user.user._id,{
            headers:{
              Authorization:`Bearer ${user.token}`
           }
    
           })
         console.log(res.data);
         setBlogs(res.data.posts.reverse())
      }catch(err){
         console.log(err);
      }
    }
    useEffect(()=>{
      fetchBlogs()
    },[])

    
    const deletePost = async(id)=>{
       
        try{
            const res = await axios.delete(`http://localhost:5000/user/delete-post/${id}`,{
                headers:{
                  Authorization:`Bearer ${user.token}`
               }
        
               })
            console.log(res.data);
        }catch(err){
            console.log(err);

        }
    }
    return (
        <div className='w-full min-h-screen dark:bg-white px-12 pt-20 '>
            <div className='w-full bg-[#FDF9F6] my-5 h-28 flex flex-col items-center justify-evenly text-black/65 '>
                <h1 className='text-3xl font-bold'>{user.user.username}</h1>
                <p className='text-lg'><span className='text-xl font-bold mr-2'>{blogs.length}</span>Posts</p>
            </div>
            <div className='w-full flex flex-col gap-5 items-center '>
                {blogs.map((blog, i) =>  (
                    
                    <div key={i} className={`relative w-full flex justify-between items-center border-2 bg-[#FDF9F6]  shadow-md p-10 ${i % 2 !== 0 ? "flex-row-reverse" : "flex-row"}`}>
                        <img src={blog.image} alt="" className='h-auto w-1/3' />
                        
                        <div className=' w-2/3 flex flex-col gap-5 p-10'>
                            <ChevronDown onClick={()=>setCollapsedPost(collapsedPost ===i ? null : i)} className={`ml-auto cursor-pointer h-10 w-10 absolute top-5 ${i % 2 === 0 ? "right-5" : "left-5"} ${collapsedPost ===i && "rotate-180"}`}/>
                            <h1 className='text-2xl font-bold uppercase text-orange-500' >{blog.title}</h1>
                            <p hidden={collapsedPost !==i} className='text-xl font-thin text-black'>{blog.desc}</p>
                            <p hidden={collapsedPost !==i}>{blog.content}</p>
                            <p className='italic text-black'>posted by : <span className='font-bold capitalize'>{blog.postedBy}</span></p>
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
                            <div className='flex gap-5 '>
                                <Link to={`/edit-post/${blog._id}`}>
                                <button type="submit" className="w-fit px-10 flex items-center justify-center gap-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-orange-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"><Edit/> Edit Post</button>

                                </Link>
                                <button onClick={()=>deletePost(blog._id)} type="submit" className="w-fit px-10 flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><Trash/> Delete Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Profile