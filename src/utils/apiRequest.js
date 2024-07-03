import axios from "axios";

const BACKEND_URL = 'http://localhost:5000/';

const API = axios.create({
    baseURL:BACKEND_URL,
    responseType:"json",
});
export const apiRequest=async({url,method,body,token})=>{
    try{
        const result = await API(url,{
            data:body || {},
            method:method || "GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:token ? `Bearer $(token)` : "",
            }
        });
        return result.data;

    }catch(error){
        const err = error.response.data;
        console.log(err);
        return {status:err.success,message:err.message}
    }
}