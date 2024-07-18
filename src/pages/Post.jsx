import React, { useState, useEffect } from "react";
import postService from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import files from "../appwrite/upload_files"

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  //===============>>>>>>>>>>>>>  console Messages <<<<<<<<<<<==============//

  // console.log(slug)
  // console.log(userData)
  
  //==========================|| continue navigation ||=======================//
  
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  
  
  //======================== useEffect for images =========================//
  
  const [imageUrl, setImageUrl] = useState("");
  
  
  /******************************||<<<<< doubt >>>||**********************/
  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((post) => {
        if (post) {
          
          setPost(post)
         
          const fetchImageUrl = async()=>{ 
                try {
                  const url =  await postService.getFilePreview(post.featuredImage)
                  setImageUrl(url)
                  console.log("this is image for edit page", post.featuredImage );
                  
                  
                } catch (error) {
                  console.log("erroe is",error);
                }
              }
              fetchImageUrl()
              
              
            } else {
              navigate("/");
              
            }
          });
        } else {
          navigate("/");
    }
  }, [slug, navigate]);
  
  const deletePost = () => {
    postService.deletePost(post.$id).then((status) => {
      if (status) postService.deleteFile(post.featuredImage);
      navigate("/");
    });
  };
  
  
  return post ? (
    <Container>
      <div className="w-full flex flex-wrap justify-center items-center  ">
      <div className=" flex flex-wrap justify-center items-center  w-3/4 m-4 relative border rounded-xl lg:px-32 px-6 py-20 bg-slate-200 shadow-lg">
        <img
          className="w-[100px]"
          alt={post.title}
          src={imageUrl}
        />

        {isAuthor && (
          <div className="flex w-full justify-between">
            <Link to={`/edit-post/${post.$id}`}>
              <Button text="Edit"/>
            </Link>
            <div className="w-[5rem]">
              
            <Button text="Delete" onClick={deletePost}/>
            </div>
          </div>
        )}

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </div></div>
    </Container>
  ) : null;
}

export default Post;
