import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userRegister } from '../api/api'
import img1 from '../images/edited.png'


const Register = () => {

    const [formData,setFormData]= useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    })

    const[error,setError]=useState('')
    const navigate = useNavigate()

    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError('')

        if(formData.password !==formData.confirmpassword){
            setError("passwords do not match")
            return
        }
        if(formData.password.length < 6){
            setError("Password must be atleast 6 characters")
            return
        }

        try{
            await userRegister({
                name:formData.name,
                email:formData.email,
                password:formData.password
            })


            alert("Registration Sucessful!")
            navigate('/')
        }
        catch(err){
            setError(err.message||"Registration Failed")
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
            
        <h2 className='text-2xl font-bold text-gray-800 mb-1'>Create Account!</h2>
        <p className='text-sm text-gray-500 mb-6'>Already have an account?{' '}
            <Link to="/" className='text-purple-600 font-medium hover:underline'>Login</Link>
        </p>

        
        {error&&(
            <div className='bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-5 border border-red-200'>
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter your name' required 
                className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500' />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Youremail@gmail.com' required 
                className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500' />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='••••••••••' required 
                className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500' />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
                <input type="password" name='confirmpassword' value={formData.confirmpassword} onChange={handleChange} placeholder='••••••••••' required 
                className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500' />
            </div>

            <button type='submit' className='w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 '>
                Create Account
            </button>

        </form>

        
       

        </div>
        </div>
        

   </div>
   



   </>
  )
}

export default Register
