import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/create-task" element={<CreateTask/>} />
      <Route path="/edit/:id" element={<EditTask/>} />



    </Routes>
    </BrowserRouter>


    <ToastContainer position='top-center' autoClose={300} theme='colored'/>
    </>
  
  )
}

export default App
