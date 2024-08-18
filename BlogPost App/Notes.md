# Lecture 18  
  - We set all the ID in .env file  
  - made another folder conf conataining all the conf ID and made it in js for the better way to export them.  
  - getting the console or fetching the values of these ENVs is different of all tech stack  in the VIte we make initialise it like `VITE_`.
  
  ```javascript 
  const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteColletionID:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf
  ```
# Lecture 19  
We will be Building the authentication services with appwrite
1. Made a folder of the appwrite in the src folder 
