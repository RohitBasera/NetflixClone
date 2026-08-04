import React from 'react'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import{Route,Routes} from 'react-router-dom'
import Login from './pages/Login/Login'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />  
      </Routes>
      
    </div>
  )
}

export default App
