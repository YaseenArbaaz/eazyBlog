// import React, { useCallback, useEffect } from "react";
// import { Input, Button, RTE , Select} from "../index";

// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import postService from "../../appwrite/config";
// // import files from "../../appwrite/upload_files";
// import { useNavigate } from "react-router-dom";

// export default function PostForm({ post }) {
//   const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.$id || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);

//   const slugTransform = useCallback((value) => {
//     if(value && typeof value === "string") {
//        return value.trim().toLowerCase()
//        .replace(/[^a-zA-Z\d\s]+/g, "-")
//        .replace(/\s/g, "-");}
//        return"";
//     }, []
//    )

//    useEffect(() =>{
//    const subscription =   watch("title", ({name}) => {
//        if(name === "title"){

//          setValue("slug", slugTransform(value),{ shouldValidate :true} ) 

//        }
//      } );
//      return () => subscription.unsubscribe() /* this is useEffect optimize method  */
//    }, [watch, slugTransform, setValue])

//   const onSubmit = async (data) => {
//     if (post) {
//       const file = data.image[0] ? await postService.uploadFile(data.image[0]) : null;
          
//       if (file) {
//        await postService.deleteFile(post.featuredImage);
//       }
//       const dbPost = await postService.editPost(post.$id, {
//         ...data,
//         featuredImage: file ? file.$id : undefined,
//       });

//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     } else {
//       const file = await postService.uploadFile(data.image[0]);
//       if (file) {
//         const dbPost = await postService.createPost({
//           ...data,
//           userId: userData.$id,
//           featuredImage: file.$id,
//         });
//         if (dbPost) {
//           navigate(`/post/${dbPost.$id}`);
//         }
//       }
//     }

  

//     return(
     
//     <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//        <Input
//             label = "Title :"
//               type = "text"
//               className = 'mb-4'
//             placeholder = "type title for blog "
//             {...register("title", {required: true})}
//        />
//        <Input
//          label = "Slug :"
//          type = "text"
//          placeholder="slug"
//          {...register("slug",{required: true} )}
//          onInput={(e)=>{
//           setValue("slug",slugTransform(e.currentTarget.value), { shouldValidate: true }) }}
//        />
//        <RTE
//        name="content"
//        label="Content :"
//        control={control}
//        defaultValue={getValues("content")}

//        />
     
//       </div>
//       <div className="w-1/3 px-2">
//       <Input
//          label = "Featured Image :"
//          type = "file"
//          name = "image"
//          accept="image/png, image/jpg, image/jpeg, image/gif"
//          {...register("image", {required: !post})}/>
//          {post &&(
//            <div className="w-full mb-4">
//            <img
//                src={postService.getFilePreview(post.featuredImage)}
//                alt={post.title}
//                className="rounded-lg"
//            />
//        </div>
//          ) }
//          <Select
//           options= {["active", "inactive"]}
//           label="Status :"
//           {...register("status", {required: true})}
//          />
//            <Button
//             text={post ? "Update" : "Submit"}
//             type="submit"
//             className="mb-2"
//             color={post ? "bg-green-500" : undefined}
//            />
//       </div>
//       </form>
      
      
//     )

//   } ;


// }
// chatgpt
// PostForm.jsx

import React, { useCallback, useEffect , useState} from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import postService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { Input, Button, RTE , Select} from "../index";

const PostForm = ({ post }) => {
  const { register, handleSubmit, control, setValue, watch, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  
  const slugTransform = useCallback((value) => {
    if(value && typeof value === "string") {
       return value.trim().toLowerCase()
       .replace(/[^a-zA-Z\d\s]+/g, "-")
       .replace(/\s/g, "-");}
       return"";
    }, []
   )

   useEffect(() =>{
   const subscription =   watch((value, {name}) => {
       if(name === "title"){

         setValue("slug", slugTransform(value.title),{ shouldValidate :true} ) 

       }
     } );
     return () => subscription.unsubscribe() /* this is useEffect optimize method  */
   }, [watch, slugTransform, setValue])

  const onSubmit = async (data) => {
    try {
      if (post) {
        const file = data.image[0] ? await postService.uploadFile(data.image[0]) : null;
        
        if (file) {
          await postService.deleteFile(post.featuredImage);
        }

        const updatedPost = await postService.editPost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        const file = await postService.uploadFile(data.image[0]);
        
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await postService.createPost({ ...data, userId: userData.$id, fileId});

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
   

    <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-row flex-col w-[90%] mx-auto gap-2">
       <div className=" flex justify-items-start flex-col px-2 md:w-1/4 ring-1 rounded ring-slate-300" >
       
<div>

</div>
      <Input
          label="Title :"
          type="text"
          className=""
          placeholder="Type title for blog"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          type="text"
          placeholder="slug"
          className=""
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
    

        <Input
          label="Featured Image :"
          className=""
          placeholder="your image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
          {
          
          post && 
          
          (
            
            <div className="mb-2 px-4 w-1/3">
              <img
                src={
                  postService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
        <Select
          options={["active", "inactive"]}
          label="Status :"
          {...register("status", { required: true })}
          />
     
      <Button 
          text={post ? "Update" : "Submit"}
          type="submit"
          className="w-2/3 mt-3"
          color={post ? "bg-green-500" : undefined}
        />
      </div>
      <div className="editor justify-center md:w-3/4">
        <RTE
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
     
      </div>
    </form>


  );
};

export default PostForm;
