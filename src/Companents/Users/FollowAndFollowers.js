import axios from "axios";
import {useState} from "react";
export default function FollowAndFollowers(props){
    const {username,user_image,id,follow_status}= props;
    const [followStatus,setFollowStatus] = useState(follow_status)
    function followers() {
        axios.get(`http://127.0.0.1:8000/api/users/following/add/or/delete/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(data=>{
        if(data.status === 200){
         setFollowStatus(true)
        }
      })
      .catch(error=>{
        if(error.response.status === 400){
            setFollowStatus(false)
        }
      })
      }
    return(
        <>
        <div className="profile-card">
                <div className="profile-content">
                    <div className="profile-image">
                        <img className='profile-imagess' src={user_image ? `http://127.0.0.1:8000${user_image}` :''} alt="first user"/>
                    </div>
                    <div className="desc">
                        <h2>{username}</h2>
          
                    </div>
                    <div className="btn-div">
                        <button onClick={(e)=>{followers()}} className="buttons" style={
                            {background:followStatus ? 'red': 'blue'}}>
                            {followStatus ? 'Following' : 'Follow'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}