import '../assistents/css/profile.css'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useState} from "react";

export default function UsProfile(porps){

  const {user,post_count,follow} = porps;
  const value = useParams();
  const user_id = localStorage.getItem('id');
  const [follows,setFollows] = useState(user.follow_status);
  let navigate = useNavigate();

  function chat_room_redirect(){
    axios.get(`http://127.0.0.1:8000/api/chat/room/chat/id/${user.id}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
    .then(data=>{
      if(data.status === 200){
       
        navigate(`/telegram/${data.data.chat_room_id}`)
      }
    })
    .catch(error=>{
      console.log(error)
    })
    }
  function following(element) {
    axios.get(`http://127.0.0.1:8000/api/users/following/add/or/delete/${user_id}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  .then(data=>{
    if(data.status === 200){
      setFollows(true)
      
    }
  })
  .catch(error=>{
    if(error.response.status === 400){
      setFollows(false)
    }
  })
  }
    return(
        <>
        <Link to={`/feed`}  ><i className="fas fa-arrow-left"></i>Exit</Link>
        <Link to={`/profile/image/${user.id}/`}><div className="img">
        <img src={`http://127.0.0.1:8000${user.last_image}`} alt="wd" width="100%" />
      </div></Link>

      <div className="cnt">
        <div className="name">{user.username}</div>
        <div className="txt">{user.first_name},{user.last_name}<br/>
          {/* <strong>Email:{user.email}</strong> */}
        </div>
        <i className="fas fa-thumbtack"></i>
        <strong>Samarkand, Uzbekistan</strong>

        <div className="card-inf">
         <Link to={`/followers/${user.id}/`}> <div className="item">
            <div className="title">{follow.followers}</div>
            <div className="txt">Folowers</div>
          </div></Link>

          <Link to={`/following/${user.id}/`}><div className="item">
            <div className="title">{follow.following}</div>
            <div className="txt">Folowing</div>
          </div></Link>

          <div className="item">
            <div className="title">{post_count}</div>
            <div className="txt">Post</div>
          </div>

        <div className="card-social">
          <a href="https://www.facebook.com/codingplayfb/" className="facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="sad" className="twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/codingplay.insta/" className="instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/jamshidelmi" className="github">
            <i className="fab fa-github"></i>
          </a> {user_id === value.id ?
         <div className="card-button">
         <Link to={`/createpost`} id='link' > <button className='select-image' >Create Post</button></Link>
         <Link to={`/updateprofile`} id='link' > <button className='select-image' >Update Profile</button></Link>
        </div>
        : 
        <div className="card-button">
          <button className='select-image' onClick={()=>{chat_room_redirect()}}  style={{background:'green'}}>Message</button><br/>
          <button className='select-image' onClick={(e)=>{following()}}
          style={{background:follows ? 'red': 'blue'}}>{follows ? 'Following': 'Follow'}</button>
        </div>}
        </div>
        <div><h1>.</h1></div>
       
        

      </div>
    </div>
        
        </>
    )
}