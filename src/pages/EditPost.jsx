import React, {useState, useEffect} from 'react'
import postService from '../appwrite/config'
import { PostForm} from "../components/index"
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [post , setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            postService.getPost(slug)
            .then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }

    },[slug, navigate])
  return post ? (
    <div className='w-full'>
        <PostForm post={post}/>
        
    </div>
  ) : null
}

export default EditPost