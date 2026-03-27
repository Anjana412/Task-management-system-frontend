import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FaPlus } from 'react-icons/fa6'
import {BsClipboardCheck , BsClockHistory,BsListTask} from 'react-icons/bs'
import { MdDelete,MdEdit , MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { deleteTask, getTasks, updateTask } from '../api/api'

const Dashboard = () => {

  const [tasks,setTasks]=useState([])
  const [stats,setStats]=useState({total :0,Completed:0,pending:0})
  const [error,setError]=useState('')
  const [expandableTaskid , setExpandingTaskid] = useState(null);

  const navigate =useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    fetchTasks();
  }, [])

  const fetchTasks =async()=>{
    try{
      const res =await getTasks();
      setTasks(res.data.tasks);
      setStats(res.data.stats);
    }
    catch(err){
      setError(err.message ||'Failed to fetch tasks')
    }
  }

  const handleDelete= async(id)=>{
    if(!window.confirm('Are you sure deleting this task?')){
      return
    }

    try{
      await deleteTask(id);
      fetchTasks()
    }
    catch(err){
      setError(err.message||'Failed to delete task');
    }
  }


  const handleTogglestatus=async(task)=>{
    const newstatus= task.status === 'Pending' ?'Completed' :'Pending'

    try{
      await updateTask(task._id,{...task,status:newstatus})
      fetchTasks();

    }
    catch(err){
      setError(err.message ||'Failed to update task');
    }
  }


   const formdate = (date)=>{
      return new Date(date).toLocaleDateString('en-US',{year:'numeric',month:'2-digit', day:'numeric'});
    }

  const ExpandCard = (id)=>{
    setExpandingTaskid(expandableTaskid ===id ? null: id);
  }


  return (
      <div className='min-h-screen bg-gray-50'>
        <Navbar/>
        
          <div className='max-w-7xl mx-auto px-6 py-8'>

            <div className='mb-8'>
              <h1 className='text-2xl font-bold text-gray-800'>Welcome back, {user?.name}!</h1>
              <p className='text-gray-600 text-sm mt-2'>Plan & accomplish your tasks with ease....</p>
            </div>


          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>

            <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-400 flex items-center gap-4'>
              <div className='w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center'>
                <BsListTask className='text-purple-700 text-2xl'/>
              </div>
              <div>
                <p className='text-sm text-gray-500 font-medium'>Total Tasks</p>
                <p className='text-3xl text-gray-800 font-bold'>{stats.total}</p>

              </div>
            </div>

            
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-400 flex items-center gap-4'>
              <div className='w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center'>
                <BsClipboardCheck className='text-green-600 text-2xl'/>
              </div>
              <div>
                <p className='text-sm text-gray-500 font-medium'>Completed</p>
                <p className='text-3xl text-green-600 font-bold'>{stats.Completed}</p>

              </div>
            </div>


             <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-400 flex items-center gap-4'>
              <div className='w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center'>
                <BsClockHistory className='text-orange-500 text-2xl'/>
              </div>
              <div>
                <p className='text-sm text-gray-500 font-medium'>Pending</p>
                <p className='text-3xl text-orange-500 font-bold'>{stats.pending}</p>

              </div>
            </div>
       
          </div>

          

          <div className='flex items-center justify-between  mb-6'>
            <h2 className='text-lg font-bold text-gray-800 my-5'>My Tasks</h2>
            <button onClick={()=>navigate('/create-task')} 
              className='flex items-center gap-2 bg-purple-600 hover:bg-purple-800 text-white text-sm font-semibold px-4 py-3 my-5 rounded-xl transition duration-200 shadow-purple-200'>
                <FaPlus className='text-xs' />New Task
              </button>
          </div>


          {error&&(
            <div className='bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-5 border border-red-200'>
                {error}
            </div>
        )}


        {tasks.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100'>
            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4'>
              <BsListTask className='text-purple-600 text-2xl' />

            </div>

            <h3 className='text-gray-800 font-semibold text-lg mb-1'>No tasks yet!</h3>
            <p className='text-gray-400 text-sm mb-4'>Create your first task to get started</p>
            <button onClick={()=>navigate('/create-task')}
              className='flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-3 rounded-xl transition duration-200'>
                <FaPlus className='text-xs' />Create Task
              </button>
          </div>
        ) : (

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {tasks.map(task =>(
              <div key={task._id} className='bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition duration-200 flex flex-col gap-3'>
                <div className='flex items-start justify-between gap-2'>
                  <h3 className={`text-base font-semibold text-gray-800 ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${task.status ==='Completed' ? 'bg-green-100 text-green-600' :'bg-orange-100 text-orange-500'}`}>{task.status}</span>
                </div>


              {task.description &&(
                <div className='cursor-pointer w-full overflow-hidden' onClick={()=> ExpandCard(task._id)}>
                <p className={`text-sm text-gray-700 transition-all duration-300  ${expandableTaskid ===task._id ? '' : 'line-clamp-2'}`}>{task.description}</p>
                
                {task.description.length >60 && (
                  <button className='text-[10px] text-purple-600 font-bold mt-1 uppercase tracking-wider hover:underline'>
                    {expandableTaskid === task._id ? 'Show Less' : 'Read More'}
                  </button>
                )}
                </div>
              )}


              <div className='flex flex-col gap-1'>
                <p className='text-sm text-gray-600 font-semibold'>Due: <span className='font-medium text-gray-600'>{formdate(task.dueDate)}</span></p>
                <p className='text-sm text-gray-600 font-semibold'>Created: <span className='font-medium text-gray-600'>{formdate(task.createdAt)}</span></p>

              </div>


              <div className='flex items-center gap-2 mt-auto pt-3 border-t border-gray-100'>
                <button onClick={()=>handleTogglestatus(task)}
                  className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg transition duration-200 flex-1 justify-center ${ task.status === 'Completed' ? 'text-orange-500 hover:bg-orange-100': 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                    {task.status ==='Completed' ? <><MdRadioButtonUnchecked />Mark Pending</> : <><MdCheckCircle />Mark Done</>}
                  </button>

                  <button onClick={()=> navigate(`/edit/${task._id}`)} className='flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg bg-white  text-purple-600 hover:bg-purple-100 transition duration-200'><MdEdit />Edit</button>

                  <button onClick={()=> handleDelete(task._id)} className='flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg bg-white  text-red-500 hover:bg-red-100 transition duration-200'><MdDelete />Delete</button>

              </div>


              </div>
            ))}
          </div>
          )}
          </div>
          </div>
          
        );
        
      };

export default Dashboard