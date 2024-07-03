


const getUserData = ()=>{
    const userData =localStorage.getItem('userData');
    if(userData){
        const data = JSON.parse(userData);
        console.log(data);
        return {userData:data.user,token:data.token};

    
    }else{
        return null;
    }
}

export default getUserData;