import React, { useState } from 'react'
import img1 from '../images/edited.png'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../api/api'


const Login = () => {

    const [formData,setFormData]=useState({
        email:'',
        password:''
    })


    const [error,setError]=useState('')
    
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setError('')
        

        try{
            await userLogin(formData)
                
            navigate('/dashboard')
        }
        catch(err){
            console.log(err);
            
            setError(err.message||"Invalid email or password")
        }
    }


  return (
    <>
   <div className='min-h-screen relative bg-white font-sans flex flex-col md:flex-row'>
        {/* leftside */}
        <div className='flex w-full md:w-1/2 md:h-auto bg-gradient-to-br from-[#7c3AED] to-[#A78BFA] justify-center items-center relative overflow-hidden'>
            <img src={img1} alt='img for task' className='max-w-[150px] md:max-w-full max-h-full object-contain opacity-95 transition-transform duration-700 hover:scale-105'/>
        </div>
        

        {/* rightside */}
        <div className='w-full md:w-1/2 flex flex-col justify-center p-8 items-center bg-white'>
        
        <div className=' w-full max-w-md'>
            
        <h2 className='text-2xl font-bold text-gray-800 mb-1'>Welcome Back!</h2>
        <p className='text-sm text-gray-500 mb-6'>You don't have an account?{' '}
            <Link to="/register" className='text-purple-600 font-medium hover:underline'>Create account</Link>
        </p>

        
        {error&&(
            <div className='bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-5 border border-red-200'>
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input type="email" name='email' placeholder='Youremail@gmail.com' value={formData.email} onChange={handleChange} required 
                className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500' />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <input type="password" name='password'  placeholder='••••••••••' value={formData.password} onChange={handleChange} required 
                className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500' />
            </div>

            <button type='submit' className='w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 '>
               Log in
            </button>

        </form>

        
       

        </div>
        </div>
        

   </div>
   



   </>
  )
}

export default Login