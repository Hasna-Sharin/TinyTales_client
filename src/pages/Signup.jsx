import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import {GoogleLogin} from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../context/Authcontext'
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from 'react-router-dom'


const SignUp = () => {
    // const[username,setUsername]=useState('')
    // const[email,setEmail]=useState('')
    // const[password,setPassword]=useState('')
    const form = useForm()
    const {register,handleSubmit,formState,getValues} = form
    const {login} = useAuth()
    const navigate = useNavigate()
    const onSubmit = async(data)=>{
        console.log(data);
       
        try{
            const res = await axios.post("https://tinytales-server.onrender.com/auth/register",data)
            console.log(res.data);
            navigate("/")
            
            
        }catch(err){
            console.log(err);
            toast("Signup Failed")

        }
    }

    const handleGoogleLogin = async (data)=>{
        try{

            const response = await axios.post("https://tinytales-server.onrender.com/auth/google-auth",{credential:data.credential})
            login(response.data)

        }catch(err){
            toast("Could not authenticate with google")
        }
    //    console.log(response);
    //    console.log(response.data);

       
    }
     return (
        <section className="bg-gray-50 dark:bg-white">
            <ToastContainer/>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#FDF9F6] ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black/65">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black/55 ">Username</label>
                                <input {...register("username",{required:{
                                    value:true,
                                    message:"please enter your username"

                                },minLength:{
                                    value:3,
                                    message:"Atleast 3 characters required"
                                },maxLength:{
                                    value:30,
                                    message:"Username must not exceed 30 letters"
                                }})
                                }type='text' id="user" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                                <p className="text-red-500 text-sm mt-2">{formState.errors.username?.message}</p>

                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black/55">Your email</label>
                                <input {...register("email",{required:{
                                    value:true,
                                    message:"please enter your email"
                                },pattern:{
                                    value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:"enter a valid email"
                                },maxLength:{
                                    value:30,
                                    message:"Username must not exceed 30 letters"
                                }})} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                <p className="text-red-500 text-sm mt-2">{formState.errors.email?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black/55">Password</label>
                                <input {...register("password",{required:{
                                    value:true,
                                    message:"Please enter your password"
                                },
                                validate: {
                                    hasDigit: value => /\d/.test(value) || "Password must contain at least one digit",
                                    hasUppercase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                    hasLowercase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                                    
                                  },minLength:{
                                        value:6,
                                        message: "Password must be at least 6 characters"
                                  }})} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <p className="text-red-500 text-sm mt-2">{formState.errors.password?.message}</p>

                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-black/55">Confirm password</label>
                                <input  {...register("confirmPassword",{
                                   required:{
                                    value:true,
                                    message:"Please enter your password"
                                 },validate: value => value === getValues('password') || "Passwords do not match"
                                })} type='password' id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                <p className="text-red-500 text-sm mt-2">{formState.errors.confirmPassword?.message}</p>

                            </div>
                            {formState.isSubmitting && <p className="text-red-700 text-sm md:text-lg">Please wait some time.The data is fetching</p>}

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-white dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-500 ">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-primary-800">Create an account</button>
                            <div className='flex justify-center'>

                            <GoogleLogin   onSuccess={handleGoogleLogin} onError={() => {console.log('Login Failed');}}/>;
                            </div>
                            
                            <Link to={"/"}>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-600 mt-2">
                                    Already have an account? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</span>
                                </p>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp