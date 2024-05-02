import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../assistents/css/followers.css';
import FollowAndFollowers from './FollowAndFollowers';
import { useEffect,useState } from 'react';
export default function Following(){

    const [isinfo,setinfo] = useState([])
    const value = useParams();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/users/following/${value.id}`,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(data=>{setinfo(data.data)})
        .catch(error=>{console.log(error)})
    },[value.id]);
       
    
    return(
        <>
        <div className="container">
        <div className="team_container">
            <div className="text">Following</div><Link to={`/profile/${localStorage.getItem('id')}`} className="back-icon" ><i className="fas fa-arrow-left"></i>Exit</Link>
        </div>
        <div className="row">
            {isinfo.length ? 
            isinfo.map(item=>(
                <FollowAndFollowers key={item.id} id={item.id} username={item.username} user_image={item.user_image} follow_status={item.follow_status} />
            ))
            
            :''}
           
           
        </div>
    </div>
        </>
    )

}