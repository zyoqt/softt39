import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './Signup'
import Home from './Home'

function App() {
  return (
     <BrowserRouter>
     <Routes>
        <Route path='/' element={ <Login />}></Route>
        <Route path='/Signup' element={ <SignUp />}></Route>
        <Route path='/home' element={ <Home />}></Route>
      </Routes>
     </BrowserRouter>
    
  )
}

export default App