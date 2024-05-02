
import { useState,useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import './usersearch.css';
import ImageSearch from "../Companents/ImageSearch";
export default function SearchUser(){
  const [IsUserList,SetUserList]  = useState([]);
  const [IsLoading,setLoading]  = useState(false);
  const[is_search,SetSearch] = useState('');
  useEffect(()=>{
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`http://127.0.0.1:8000/api/users/search?search=${is_search}`,config)
    .then(data=>{
        if(data.status === 200){
            SetUserList(data.data)
            setLoading(true)
        }
    })
},[is_search])

// useEffect(()=>{
//   axios.get(`http://127.0.0.1:8000/api/posts/search?search=${is_search}`,{
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//   })
//   .then(data=>{
//
//       SetPost(data.data)
//   })
//   .catch(error=>{
//       console.log(error)
//   })
//
// },[is_search])


const filter_user = (e)=>{
  SetSearch(e.target.value);
}

    return(
        <>
        <div>
       
         <div className="containersearch"> 
        
              <header className="headersearch"> <Link to={`/feed/`}  ><i style={{color:'white'}} className="fas fa-arrow-left">Exit</i></Link>
                <h4 className="titlesearch">Search by username</h4>
                <input onChange={filter_user} className="headersearchinput" type="text" id="filter" placeholder="Search" />
              </header>
            {IsUserList.length ?
                  <ul id="result" className="user-listsearch">
                    {IsLoading ? IsUserList.map(item=>(
                      <li>
                    <img src={`http://127.0.0.1:8000${item.user_image[item.user_image.length-1].photo}`} alt="asd" className="user-listimg" />
                    <div className="user-info">
                        <Link to={`/profile/${item.id}`}><h4 className="searchh4">{item.username}</h4></Link>
                        <p className="searchp">{item.last_name}  {item.first_name} </p>
                    </div></li>
                    )) :
                    <li>
                      <h3>Loading...</h3>
                    </li>
                    }
       
        
      </ul>: ''}
    </div> 
    {/*{ !IsinputValue.length ? <ImageSearch data ={IsPost} /> :''}*/}
        </div>
        
        </>
    )
}