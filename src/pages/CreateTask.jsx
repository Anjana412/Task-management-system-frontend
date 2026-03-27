import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTask } from '../api/api'
import Navbar from './Navbar'
import { BsArrowLeft } from 'react-icons/bs'

const CreateTask = () => {
  const [taskData,setTaskData] =  useState({
    title:'',
    description:'',
    dueDate:'',
    status:'Pending'
  })

  const [error,setError]=useState('')

  const navigate = useNavigate();

  const handleChange =(e)=>{
    setTaskData({...taskData,[e.target.name]:e.target.value});

  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError('');

    try{
      await createTask(taskData);

      alert("Task created sucessfully!");
      
      navigate('/dashboard');
    }
    catch(err){
      setError(err.message||"Failed to create task");
    }
  }

  return (
    <>
    <Navbar />
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
        <button className='text-2xl' onClick={()=>navigate('/dashboard')}><BsArrowLeft/></button>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Create New Task</h2>

        {error && (
          <div className='bg-red-50 text-red-500 p-4 rounded-lg mb-4 text-sm border border-red-200'>{error}</div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Task Title</label>
            <input type='text' name='title' placeholder='What needs to be done?' value={taskData.title} onChange={handleChange} required 
            className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition'/>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea name='description' placeholder='Add details....' value={taskData.description} onChange={handleChange} required 
            className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition'/>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Due Date</label>
            <input type='date' name='dueDate' value={taskData.dueDate} onChange={handleChange} required 
            className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition'/>
          </div>

          <div className='flex gap-4 pt-4'>
            <button type='button' onClick={()=>navigate('/dashboard')}
              className='flex-1 py-3 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 tarnsition'>Cancel</button>
            <button type='submit' 
              className='flex-1 py-3 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition shadow-lg shadow-purple-200'>Create Task</button>
          </div>

        </form>



      </div>

    </div>
    
    </>
  )
}

export default CreateTask