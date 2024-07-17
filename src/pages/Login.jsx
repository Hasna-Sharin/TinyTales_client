import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext, useAuth } from "../context/Authcontext";
import { GoogleLogin } from "@react-oauth/google";
import { LoaderIcon } from "lucide-react";

const LogIn = () => {
  // const[email,setEmail]=useState('')
  // const[password,setPassword]=useState('')

  const form = useForm();
  const { register, handleSubmit, formState } = form;
  console.log(formState);
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = await axios.post(
        "https://tinytales-server.onrender.com/auth/login",
        data
      );

      console.log(res);
      if (res.data) {
        // localStorage.setItem('userData',JSON.stringify(res.data))
        login(res.data);
      }
    } catch (err) {
      console.log(err);
      toast(err.response.data.message);
    }
  };
  const handleGoogleLogin = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(
        "https://tinytales-server.onrender.com/auth/google-auth",
        { credential: data.credential }
      );
     
      login(response.data);
    } catch (err) {
      toast("Could not authenticate with google");
    }
  };
  {loading && (
    <div className="absolute z-10 w-full h-screen md:h-screen flex justify-center items-center top-0 left-0 bg-[#00000050]">
      <LoaderIcon className="h-28 w-28 animate-spin" />
    </div>
  )}
  return (
    <section className=" bg-white">
      <ToastContainer />
     

      <div className="flex flex-col items-center justify-center z-0 px-4 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#FDF9F6] dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black/55"
                >
                  Your email
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "please enter your email",
                    },
                  })}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white/75 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                {/* //formState.ullil.errors.ullil.email undenkil email.message */}
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.email?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-back/55"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "please enter your password",
                    },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white/75 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.password?.message}
                </p>
              </div>
              {formState.isSubmitting && (
                <p className="text-red-700 text-sm md:text-lg">
                  Please wait some time.The data is fetching
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-700 dark:text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white   focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-black hover:bg-black/75 focus:ring-black/75"
              >
                Sign in
              </button>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <Link to={"/signup"}>
                <p className="text-sm font-light text-gray-500  mt-1 md:mt-2">
                  Don’t have an account yet?
                  <span className="font-medium text-primary-600 hover:underline ">
                    Sign up
                  </span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
