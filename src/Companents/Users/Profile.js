import rsa from "../assistents/images/profile-14.jpg"
import '../style.css'
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"
export default function Profile(){
    const [is_profile,setProfile] = useState({});
    const [isload,setload] = useState(false)
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/users/detail`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(data=>{
            setProfile(data.data)
            setload((prev)=>!prev)
        })
        .catch(error=>{
            console.log(error)
        })

    },[])
    return(
        <>
        {!isload ? '' : 
        <><Link to={`/profile/${localStorage.getItem('id')}`} className="profile">
            <div className="profile-photo">
                <img src={`http://127.0.0.1:8000${is_profile.user_image}`} alt="no imae"/>
            </div>
            <div className="handle">
                <h4>{is_profile.username}</h4>
                <p className="text-muted">
                    @user
                </p>
            </div>
        </Link>
        </> }</>
        
    )
}