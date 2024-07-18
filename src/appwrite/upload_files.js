// import { Client, ID, Storage } from "appwrite";
// import conf from "../conf/conf";

// export class Files{
//     client = new Client();
//     bucket;

//     constructor() {
//         this.client
//         .setEndpoint(conf.appwriteURL)
//         .setProject(conf.appwriteProjectId);
//         this.bucket = new Storage(this.client); 
//     }

   

//     // file upload service
  
// async uploadFile(file){
//     try{
//         return await this.bucket.createFile(
//             conf.appwriteBucketId,
//             ID.unique(),
//             file,
//         )
//     }catch(error){
//         console.log("appwrite :: uploadFile",error)
//         return false;
//     }
// }

// async deleteFile(fileID){
//    try {
//      await this.bucket.deleteFile(
//         conf.appwriteBucketId,
//         fileID
//      )
//      return true;
//    } catch (error) {
//     console.log("appwrite :: deleteFile",error);
//    }
// }

// async getFilePreview(fileID){
//      try {
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileID
//         )
//      } catch (error) {
//         console.log("appwrite :: getFilePreview",error);
//      }

// }
// }

// const files = new Files();

// export default files;