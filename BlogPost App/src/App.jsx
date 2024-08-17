

import './App.css'

function App() {
  
  // console.log(process.env.REACT_APP_APPWRITE_URL);
  //ese acces create vite app se jb bnate han tb krte hain
  console.log(import.meta.env.VITE_APPWRITE_URL);
  console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  
  return (
    <>
     <h1>A Blog Post App with Appwrite and react</h1>
      
    </>
  )
}

export default App
