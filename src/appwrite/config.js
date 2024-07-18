import { Client, Databases, Query, ID, Storage } from "appwrite";
import conf from "../conf/conf";

export class PostService{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.images = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                 conf.appwriteCollectionId, 
                 slug,
                 {
                      title, 
                      content, 
                      featuredImage,
                      status,
                      userId,
            })
        } catch (error) {
            console.log("Appwrite :: createPost", error)
            return false;
        }
    }

    async editPost(slug , {title, content, featuredImage, status}){
        try {
           return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                 conf.appwriteCollectionId, 
                 slug,
                 {
                      title, 
                      content, 
                      featuredImage,
                      status,
            }
            )
        } catch (error) {
            console.log("appwrite :: editPost", error)
            return false;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                 conf.appwriteCollectionId, 
                 slug
            ) 
            return true
        } catch (error) {
            console.log("appwrite :: deletePost", error)
            return false;
            ;
        }
    }
   
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                slug
                
            )
            
            ;
        } catch (error) {
            console.log("appwrite :: getPost meanuiig n in ",error);
        }

}

   async getPosts(queries = [Query.equal("status", "active")]){
       try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            
            )
            
       } catch (error) {
        console.log("appwrite :: getPosts",error)
        return false;
       }
   }
  // file upload service
  
  async uploadFile(file){
    try{
        return await this.images.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
        )
    }catch(error){
        console.log("appwrite :: uploadFile",error)
        return false;
    }
}

async deleteFile(fileId){
   try {
     await this.images.deleteFile(
        conf.appwriteBucketId,
        fileId
     )
     return true;
   } catch (error) {
    console.log("appwrite :: deleteFile",error);
   }
}

 getFilePreview(fileId){
    try {
         
        return this.images.getFilePreview(
                   conf.appwriteBucketId,
                   fileId )
                    console.log("fileid", fileId);
        
    } catch (error) {
        console.log("appwrite :: getFilePreview :", error);
    }

    }
    

}


 
const postService = new PostService();

export default postService;