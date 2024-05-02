import UserPosts from '../Companents/Post/UserPosts';
import UsProfile from '../Companents/Users/UsProfile';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function UserProfile(){
    const value = useParams()
    const[isdata,setdata] = useState([]);
    const [isUserInfo,setUserInfo] = useState([])
    const [isload,setload] = useState(false)
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/users/update/${value.id}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(data=>{
            setUserInfo(data.data)
            setload((prev)=>!prev)
        })
        .catch(error=>{
            console.log(error)
        })
        axios.get(`http://127.0.0.1:8000/api/users/followers/and/following/count/${value.id}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(data=>{
            console.log(data.data)
            setdata(data.data)
            
        })
        .catch(error=>{
            console.log(error)
        })

    },[value.id])
    console.log('shex',isUserInfo)
    return(
        <div className="wrapperprofile">
    <div className="card">
        {!isload ? <h1>Sa</h1> :  
        <><UsProfile follow={isdata} user={isUserInfo.user} post_count = {isdata?.post} /> <UserPosts posts={isUserInfo.posts} />
        </>}
        </div>
        </div>
    )
}