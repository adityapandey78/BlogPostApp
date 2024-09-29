import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm() {
    //all these are from the react form hooks and its functions
    //we can handle submit, watch, setvalue,control the form and getValues

    const {register,handleSubmit,watch,setValue,control,getValues} =useForm({
        //useform bhi ek object leta hai default values wali
        defaultValues:{
            title:post?.title||"",
            slug: post?.slug||"",
            content:post?.content||"",
            status:post?.status|| "",
        },
    })
    const navigate=useNavigate() //navigate krane ke liye
    const userData=useSelector(state=> state.user.userData) //ye redux ke liye

    //now making the submit 
    const submit =async(data)=>{
        if(post){
            data.image[0]?service.uploadFile(data.image[0]):null;
            // ye upr image uploadkrne ke liye hai
            if(file){
                service.deleteFile(post.featuredImage)
            }
            // ye delete krne ke liye appwrite ki services use kr rhe hain

            const dbPost= await service.updatePost(
                post.$id,{ //ese hi ID set ki jaati hai
                    ...data,
                    featuredImage:file?file.$id:undefined,   //ye feature image ki ID ke sath set ho ri hai
                })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else{
            const file= await service.uploadFile(data.image[0]);
            if(file){
                const fileId=file.$id
                data.featuredImage=fileId
                const dbPost=await service.createPost({
                    ...data,
                    userId:userData.$id, //ye humne useSelector() se uthaya
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value)=>{if (value && typeof value==='string') {
        return value
        .trim() //wo value pehle trim krega
        .toLowerCase()
        .replace(/^[a-z,A-Z\d\s]+/g,'-') //regex hain ye, jo bich ki spaces and all ko sahi kr de and kuchh inputkr de
        .replace(/\s/g,'-')

        return''
    }},[])
    React.useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })
        return()=>{
            subscription.unsubscirbe()
        }
        //this retrun is used for better optimised code 
    },[watch,slugTransform,setValue]) //in sbko humne ek useeffect me rkha hai
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })} //input ese hi leete hain register ko spread krke
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm