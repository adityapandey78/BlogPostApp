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

> # Steps to set-up the database
> - Started a project and got the proj0ect Id in this way
> - created a db(blog in this case)
>- in blog-> created a collection and named it as `article` enabled it from settings
>- Set the attributes of the collection and set if it is required or not i stored thes ein strong format
>- set the indexes as well
>- went into storage and created bucket and set its permissions from it setting like if users can create,read,update and delete  


# Lecture 19  
We will be Building the authentication services with appwrite
1. Made a folder of the appwrite in the src folder 
2. Added the auth file for the authentication of the user and login ID password thing  
3. Made the class of the authentication and defined the function in that and made an object of the user so that we can access the methods of that .
4. We have done this thing this way coz we don't want to use the excat the same thing as the appwrite for the scalablity and migrations issue coming in the furture while we migrate form the appwrite.

```javascript
import conf from '../conf/conf';
import {Client,Account,ID} from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectID);
            this.account= new Account(this.client); 
    }
async createAccount({email, password, name}){
        try {
              const userAccount=await 
              this.account.create(ID.unique(),email,password,name) 
              if(userAccount){
              //call login method
              return this.login(email,password);
              }
              else{
                  return userAccount;
              }
            } catch (error) {
                throw error;
            }
    }
    //after account creation login 
    async login({email,password}){
        try {
            return await 
            this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    //getting the statust of the currewnt user if he's logged in or not
    async getCurrentUser(){
        try {
            return await 
            this.account.get(); //Get the currently logged in user.
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }
    
    //logiut session
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}
const authService = new AuthService();

export default authService
```  
# Lecture 20

### We'll make a storage service and bucket services combined  
- We handled all the post creation and upload and file view and delete  
- [Database DOCs](https://appwrite.io/docs/references/cloud/client-web/databases)  

- [Storage DOCs](https://appwrite.io/docs/products/storage/quick-start) 
- [File Upload Services](https://appwrite.io/docs/products/storage/upload-download)

  
  Learnt the usage of queries  
```javascript 
  import conf from '../conf/conf';
  import {Client,ID,Databases,Storage,Query, Flag} from "appwrite";
  export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.setProject);
            this.databases =new Databases(this.client);
            this.bucket= new  Storage(this.client);
    }

    //*Post Upload service
    //Create post method
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,  // DB ID
                conf.appwriteColletionID, // Collection ID
                slug, //document Id slug ko le rha hu chahe ho ID.unique() bhi le skte hain
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Create Post:: error", error);
        }
    }

    //Update post Method
    //update doc me Document ID bhi dena hai so for the ease mene slug ko alag rakha hai
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug, //doc ID Slug hai mera
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Update Post:: error", error);
            
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug, 
            )
            return true; //delete ho gya hai bhai
        } catch (error) {
            console.log("Appwrite services :: Delete Post :: error", error);
            return false
        }
    }

    async getPost(slug){
        //get post me bs ek ID chaiye
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug
            )
        } catch (error) {
          console.log("Appwrite Serivce :: getPost:: error",error);
            return false; //in case kuchh ni mila toh
        }
    }
    //to get all the posts
    async listPosts(queries=[Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                queries,//queries mene upr define kr rkha hai // wese idr bhi kr skte the
            )
        } catch (error) {
            console.log("Appwrite Services :: listPost() :: error", error );
            return false;
            
        }
    }

    //*file upload service

    //https://appwrite.io/docs/products/storage/upload-download

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Services :: uploadFile():: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Services :: deletFile()::  error",error);
            return false;
        }
    }

    async getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )//last me ye url de dega 
    }
}
 const service = new Service()
 export default service
```