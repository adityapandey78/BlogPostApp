import React from 'react'
import  appwriteServices from '../appwrite/config' //appwrite se call kr li uski saari  services
import {Link} from 'react-router-dom' 

function Postcard({id,title,featuredImage}) { //ye iske saare props appwrite ke hi acc set kra hai
  return (
    <Link to={`/post/${id}`}> {/** Humne har chij ki id setkr rskhi hai appwrite me, uske nake se link me render krwa denge*/}
        <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteServices.getFilePreview(featuredImage)/*Image appwrite se hi le rhe hain */} alt={title} className='rounded-xl'/>
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default Postcard