import React  from 'react'
// import Files from '../appwrite/upload_files'
import {Button} from './index'
import { Link } from 'react-router-dom'
import postService from '../appwrite/config'
import  { useEffect, useState } from 'react';


function PostCard({$id, title, featuredImage}) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl =  () => {
      try {
        const url =  postService.getFilePreview(featuredImage);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImageUrl();
  }, [featuredImage]);
  return (

    <Link to={`/post/${$id}`}>
    <div className='m-3 flex  items-center justify-center'>
        <div className='flex w-full flex-col items-center justify-center rounded-xl gap-5 bg-gray-200 p-5 shadow-lg'>
        <div className="card-img flex w-full items-center justify-center">
            <img src={imageUrl} alt={title} width="100px"/>
        </div>
        <div className="card-title inline-block text-[1.5rem] font-bold capitalize">{title}</div>
         <Button 
          text="Read more"
         />
        </div>
         
    </div>
    
    </Link>
  )
}

export default PostCard