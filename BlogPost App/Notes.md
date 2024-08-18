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