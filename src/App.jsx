import React, { useState,useEffect } from 'react'
import  authService  from './appwrite/auth_service'
import {useDispatch} from "react-redux"
import { login, logout } from './features/authSlice'
import { Header, Footer } from './components/index'
import { Outlet } from 'react-router-dom'

import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
      

    useEffect(() => {
            authService.getCurrentAccount()
            .then((userData) => {
              if(userData) {
                dispatch(login({userData}))
            }else{
              dispatch(logout())
            }}
        )
        .finally(() =>  setLoading(false) )
            
    }, [])
   
    return !loading ?
    
     (
       <>
       
       <Header />
        <main className='mt-24 '>
        <Outlet/>
        </main>
      <Footer />
       
       </>

    
    )
    :  (<div>Loading...</div>)


}

export default App
