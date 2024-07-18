import React, { useState } from 'react'
import {Container, PostForm} from '../components/index'



function AddPost() {

  return (
    <Container>
         <div className="flex flex-wrap justify-center items-center w-full min-h-screen my-10 mx-auto">

         <PostForm/>
         {/* <h1>this</h1> */}
         </div>

    </Container>
  )
  
}

export default AddPost