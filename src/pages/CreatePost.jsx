import React, { useState } from "react";
import { CameraOffIcon, LoaderIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getUserData from "../utils/getUserData";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authcontext";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const form = useForm();
  // destructure the objects include in the useForm
  const { register, handleSubmit, formState } = form;
  // console.log(formState.isSubmitting);

  // const userData = getUserData();
  const {user} = useAuth()

  const onSubmit = async (data) => {
    console.log(data);
    // The formData is used to send image and preset code to cloudinary .if u are using postman to send this data ,there has a field formdata
    if (!image) {
      setErrMsg("Please add an image");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", "y7bn6ioi");
    let res;
    try {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbgkqhmbb/image/upload/",
        formdata
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    if (res.data) {
      console.log(res.data);
      data.image = res.data.secure_url;

      try {
        const response = await axios.post("https://tinytales-server.onrender.com/user/create-post",data,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full min-h-screen px-10 flex bg-white pt-24 text-white">
      {formState.isSubmitting && (
        <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 bg-[#00000050]">
          <LoaderIcon className="h-28 w-28 animate-spin" />
        </div>
      )}
      <div className="w-1/2 flex justify-center items-center pr-10">
        {!image ? (
          <CameraOffIcon className="h-36 w-36 opacity-25 text-black " />
        ) : (
          <div>
            {" "}
            <img
              className="max-h-screen"
              src={URL.createObjectURL(image)}
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
            htmlFor=""
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Baby's Name
          </label>
          <input
            {...register("baby", {
              required: {
                value: true,
                message: "Enter baby name",
              },
              maxLength: {
                value: 60,
                message: "Baby name must not exceed 60 letters",
              },
            })}
            type="text"
            id=""
            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-[#FDF9F6] dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Baby's Name"
            required=""
          />
          <p className="text-red-500 text-sm mt-2">
            {formState.errors.baby?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            {...register("title", {
              required: {
                value: true,
                message: "Enter your title",
              },
              maxLength: {
                value: 100,
                message: "title must not exceed 100 letters",
              },
            })}
            type="text"
            id="email"
            className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-[#FDF9F6] dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title of your pic"
            required=""
          />
          <p className="text-red-500 text-sm mt-2">
            {formState.errors.title?.message}
          </p>
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
            className="bg-[#FDF9F6] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
          {!image && errMsg && (
            <p className="text-red-500 text-sm mt-2">{errMsg}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <textarea
            {...register("desc", {
              required: {
                value: true,
                message: "Enter description",
              },
              maxLength: {
                value: 300,
                message: "Description must not exceed 300 letters",
              },
            })}
            type="text"
            id="description"
            placeholder="photoshoot description"
            className="bg-[#FDF9F6] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
          <p className="text-red-500 text-sm mt-2">
            {formState.errors.desc?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Background Story
          </label>
          <textarea
            {...register("backgroundStory", {
              required: {
                value: true,
                message: "Please add background story "
              },
              maxLength: {
                value: 1000,
                message: "Story must not exceed 100 letters",
              },
            })}
            type="text"
            id=""
            placeholder="Background Story"
            className="bg-[#FDF9F6] border border-gray-300 h-28 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
          <p className="text-red-500 text-sm mt-2">
            {formState.errors.backgroundStory?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-black/75 hover:bg-black/95 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-primary-800"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
