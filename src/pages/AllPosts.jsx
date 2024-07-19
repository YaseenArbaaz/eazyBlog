import React , {useState, useEffect}from 'react'
import {Container, PostCard} from "../components/index"
import postService from '../appwrite/config'

function AllPost() {
   const [posts, setPosts] = useState([])
   useEffect(() => {
        postService.getPosts([])
        .then((posts) => 
      {   if(posts){
            setPosts(posts.documents);
         }}
        
        )
   }, [])

  return (
    <div className='w-full  min-h-screen '>
        <Container>
          <div className="flex flex-col md:flex-row md:px-20 ">

            {posts.map((post) => 
             <div key={post.$id} className='p-2 w-[20rem]'>
             <PostCard {...post} />
         </div>
            )}
          </div>
            
        </Container>
    </div>
  )
}

export default AllPost
