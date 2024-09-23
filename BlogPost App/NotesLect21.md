# Steps to configure the redux toolkit  
1. Make a `store` folder (There we can store all the data to navigate through the redux toolkit)  
2. Now we made two features in the folder, we can store there. 
   - `authSlice` -> for the authentication data  
    - `store.js`-> to store overall data
>`createSlice`  
A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.  

3. `store.js ` file is more like a primary file which tracks all the values with the help of `slice(Functions)` and slice containes the `reducers`
>`createReducer`:  
 reducers are pure functions that specify how the application's state changes in response to an action. The main role of a reducer is to take the current state and an action as input and return a new state based on the action type. 
`Pure Function:`A reducer must be a pure function, meaning: 
💡 It does not modify the original state.
 💡 It does not perform any side effects (like API calls or dispatching other actions).
 💡It returns the same output given the same input.
## authSlice.js till now
```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
        state.status=false;
        state.userData=null;
        }
    }
})
export const{login,logout}=authSlice.actions;
//createSlice se jo reducers bnti hain bnti hain unke name ko action bolte hain e.g. login logout
//so we have to export the indiviidual actions as well
export default authSlice.reducer;
```
4. Made the components folder and made `Header` and `Footer` file & set these
5. Go to App.jsx and set configure redux with the help of appwrite functionalities and and redux reducer actions and `useDispatch()` and payload updates the redux store 
```javascript
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login,logout } from './store/authSlice'
import { Header,Footer } from "./components/index";
import { Outlet } from 'react-router-dom'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch= useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser() //pehle mene authService call kari(appwrite wali) and currentuser liya
                .then((userData)=>{  //fir usse ko mene authslice me pass kra login logout check krne ke liye
                  if(userData){
                    dispatch(login({userData})) //agar userdata hai to login kro else logout kr diya
                    //ye wala `login and logout`hmne authslice se liya
                  }else{
                    dispatch(logout()) //logout isliye kiya taaki atleast state hmesha updated rahe, coz logout krne se userdata toh null ho jaayega na
                  }
                })
                .finally(()=>setLoading(false))
  
    
  }, [])
  //yhn pe conditional rendering kri hai
  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App


``` 
6. Configure the provider in the `main.jsx` file and wrap the main with provider