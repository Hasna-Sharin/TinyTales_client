import React, { useEffect, useState } from "react";
import { CameraOffIcon, LoaderIcon } from "lucide-react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom'
import getUserData from "../utils/getUserData";
import {useForm} from 'react-hook-form'
import Post from "../components/Post";
import { useAuth } from "../context/Authcontext";

const  EditPost= () => {
  
  const [image, setImage] = useState(null);


  const navigate = useNavigate()
  const form = useForm()

  // destructure the objects include in the useForm
  const {register,handleSubmit,formState,setValue} = form

  // console.log(formState.isSubmitting);


  // getUserData() from utils
  // the return value of getUserData function is stored in userData 
  // const userData = getUserData()
  const {user} = useAuth()
  const {postId} = useParams()
//   console.log(postId);
   
  const fetchPost =async ()=>{
    try{
        const res = await axios.get(`https://tinytales-server.onrender.com/user/get-post/${postId}`,{
            headers:{
              Authorization:`Bearer ${user.token}`
              
           }
           
    
           })
          //  console.log(userData);
          //  console.log(res.data);
           const post = res.data.post
           setValue("baby",post.baby)
           setValue("title",post.title)
           setValue("desc",post.desc)
           setValue("content",post.content)
           setImage(post.image)

    }catch{

    }

  }
  useEffect(()=>{
    fetchPost()
  },[])
  



  const onSubmit = async (data) => {
    // console.log(data);
    // The formData is used to send image and preset code to cloudinary .if u are using postman to send this data ,there is a field formdata
    let res;

    if(typeof image !== "string") {
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", "y7bn6ioi");
      
  
   
    
    try {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbgkqhmbb/image/upload/",
        formdata
      );
    //   console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
      data.image= res? res.data.secure_url:image
      data.postId=postId
    
      try{
        const response = await axios.patch("https://tinytales-server.onrender.com/user/edit-post",data,{
          headers:{
            Authorization:`Bearer ${user.token}`
         }
  
         })
        console.log(response.data);
        navigate('/');


      }catch(err){
        console.log(err);
      }
    
  };
 
    return (
      <div className="w-full min-h-screen px-10 flex bg-gray-800 pt-24 text-white">
        
        {
            formState.isSubmitting &&
            <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 bg-[#00000050]">
        <LoaderIcon className="h-28 w-28 animate-spin" />
      </div>
        }
        <div className="w-1/2 flex justify-center items-center pr-10">
          {!image ? (
            <CameraOffIcon className="h-36 w-36 opacity-25 " />
          ) : (
            <div>
              {" "}
              <img
                className="max-h-screen"
                src={typeof image === 'string'? image : URL.createObjectURL(image)}
                alt=""
              />{" "}
            </div>
          )}
        </div>
        <form
          className="space-y-4 md:space-y-6 w-1/2"
          onSubmit={handleSubmit(onSubmit)}
          action="#"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Baby's Name
            </label>
            <input
            
             {...register("baby",{required:{
              value:true,
              message:"Enter baby name"

          },maxLength:{
              value:60,
              message:"Baby name must not exceed 60 letters"
          }})
          }

             
              type="text"
              
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Movie"
              required=""
            />
          <p className="text-red-500 text-sm mt-2">{formState.errors.baby?.message}</p>

          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
            
              {...register("title",{required:{
                value:true,
                message:"Enter your title"
  
            },maxLength:{
                value:100,
                message:"title must not exceed 100 letters"
            }})
            }
              type="text"
              
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title of your post"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.title?.message}</p>

          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
            
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              accept=".jpg, .png, .jpeg"
              
              id="password"
              placeholder="image-file"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />

          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
            
            {...register("desc",{required:{
              value:true,
              message:"Enter description"

          },maxLength:{
              value:300,
              message:"Description must not exceed 300 letters"
          }})
          }

              type="text"
              id="description"
              placeholder="blog description"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
             <p className="text-red-500 text-sm mt-2">{formState.errors.desc?.message}</p>

          </div>
          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Background Story
            </label>
            <textarea
            
            {...register("backgroundStory",{required:{
              value:true,
              message:"Please add background story"

          },maxLength:{
              value:1000,
              message:"Content must not exceed 1000 letters"
          }})
          }
              type="text"
              id="content"
              placeholder="Background Story"
              className="bg-gray-50 border border-gray-300 h-28 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.backgroundStory?.message}</p>

          </div>

          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update Post
          </button>
        </form>
      </div>
    );
  
};

export default EditPost;
