import axios from 'axios'


const API_URL = "https://task-management-system-vnp0.onrender.com"



export const userRegister = async(data)=>{
  try{
    const response= await axios.post(`${API_URL}/user/register`,data);

    if( response.data && response.data.token){
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user',JSON.stringify(response.data.user))

    }
    return response;
  }
  catch(error){
    throw error.response?.data ||error.message;
  }
};

export const userLogin = async(data)=>{
    try{
        const response= await axios.post(`${API_URL}/user/login`,data);
        

        if(response.data && response.data.token){
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userId',response.data.user._id);
            localStorage.setItem('user',JSON.stringify(response.data.user));
        }

        console.log('Login sucessful' );
        
        return response.data
    }
    catch(error){
        throw error.response?.data ||error.message;
    }
};

export const createTask = async(data)=>{
    const token =localStorage.getItem("token");

    try{
        return await axios.post(`${API_URL}/tasks/addtask`,data,{
            headers:{Authorization:`Bearer ${token}`}}
        )
    }
    catch(error){
        throw error.response?.data ||error.message;
    }
};

export const getTasks = async()=>{
    const token = localStorage.getItem("token");
    
    try{
        return await axios.get(`${API_URL}/tasks/viewalltasks`,{
            headers:{Authorization:`Bearer ${token}`}
        })
    }
    catch(error){
        throw error.response?.data || error.message;
    }
};

export const getTask = async(id)=>{
    const token = localStorage.getItem("token");

    try{
        return await axios.get(`${API_URL}/tasks/viewtask/${id}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
    }
    catch(error){
        throw error.response?.data ||error.message;
    }
};

export const updateTask =async(id,data)=>{
    const token= localStorage.getItem("token");

    try{
        return await axios.put(`${API_URL}/tasks/updatetask/${id}`,data,{
            headers:{Authorization:`Bearer ${token}`}
        })
    }
    catch(error){
        throw error.response?.data|| error.message;
    }
};

export const deleteTask=async(id)=>{
    const token = localStorage.getItem("token");

    try{
        return await axios.delete(`${API_URL}/tasks/deletetask/${id}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
    }
    catch(error){
        throw error.response?.data||error.message;
    }
};

