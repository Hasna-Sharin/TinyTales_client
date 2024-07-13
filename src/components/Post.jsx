import React, { useEffect, useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import getUserData from '../utils/getUserData';
import axios from 'axios';
import { useAuth } from '../context/Authcontext';

const Post = ({blog,i}) => {
    console.log(blog);
    const[likes,setLikes]=useState(blog.likes)
    const[dislike,setDislikes]=useState(blog.dislikes)

    // const user=getUserData()
    // console.log(user);
    const {user} = useAuth()
    const handleLikePost = async()=>{
        const body = {
            postId:blog._id,
    
        }
        try{
            const res = await axios.post("https://tinytales-server.onrender.com/user/like-post",body,{
                headers:{
                    Authorization:`Bearer ${user?.token}`
                 }
          

            })
            if(res.data){
                setLikes(res.data.likes)
                setDislikes(res.data.dislikes)
                
            }

            console.log(res);
            console.log(res.data);
            console.log(likes);
        }catch{

        }
        
    }
   
    const handleDislikePost = async()=>{
        const body = {
            postId:blog._id,

        }
        try{
            const res = await axios.post("https://tinytales-server.onrender.com/user/dislike-post",body,{
                headers:{
                    Authorization:`Bearer ${user?.token}`
                 }
            })
            if(res.data){
                setLikes(res.data.likes)
                setDislikes(res.data.dislikes)
            }

        }catch(err){
          console.log(err);
        }
    }
    return (
        <div className={`w-full flex flex-col gap-6 md:flex-row justify-between items-center border-2 bg-white shadow-md p-10 ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
            <img src={blog.image} alt="" className=' h-auto w-full md:w-1/3' />
            <div className='w-full md:w-2/3 flex flex-col text-justify gap-5 p-0 md:p-10'>
                <h1 className='text-xl md:text-2xl font-bold uppercase text-orange-500' >{blog.title}</h1>
                <p className='text-lg md:text-xl font-thin'>{blog.desc}</p>
                <p className='text-sm md:text-lg font-medium'>{blog.backgroundStory}</p>
                <p className='italic text-black'>posted by : <span className='font-bold capitalize'>{blog.userId?.username}</span></p>
                <p className='italic text-black'>baby : <span className='font-bold capitalize'>{blog.baby}</span></p>
                <div className='flex gap-5'>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <ThumbsUp className={likes.includes(user.user._id)?"text-red-500":""} onClick={handleLikePost}/>
                        <p className='text-sm'>{likes.length}</p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <ThumbsDown className={dislike.includes(user.user._id)?"text-red-500":""} onClick={handleDislikePost} />
                        <p className='text-sm'>{dislike.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post