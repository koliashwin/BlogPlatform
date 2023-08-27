import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Signup from './page/Auth/Signup'
import Login from './page/Auth/Login'
import Todo from './components/TestComponents/Todo'
import Reset from './page/Auth/Reset'
import Home from './page/MainDisplay/Home'

const AllRoutes = () => {
  return (
    <Router>
        <div>
            <section>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/reset' element={<Reset/>} />
                    <Route path='/' element={<Todo />} />
                </Routes>
            </section>
        </div>
    </Router>
  )
}

export default AllRoutes
