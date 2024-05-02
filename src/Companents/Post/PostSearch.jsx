
import { useState,useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import './postsearch.css'
import ImageSearch from "../ImageSearch";

export default function PostSearch(){
    const[IsPost,SetPost] = useState([]);
    const[is_search,SetSearch] = useState('');

    useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/api/posts/search?search=${is_search}`,{
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(data=>{

          SetPost(data.data)
      })
      .catch(error=>{
          console.log(error)
      })

    },[is_search])


    const filter_user = (e)=>{
        SetSearch(e.target.value);
    }

    return(
        <>
            <div>

                <div className="containersearch">

                    <header className="headersearch"> <Link to={`/feed/`}  ><i style={{color:'white'}} className="fas fa-arrow-left">Exit</i></Link>
                        <h4 className="titlesearch" style={{color:"white"}}>Search by Post title</h4>
                        <input onChange={filter_user} className="headersearchinput" type="text" id="filter" placeholder="Search" />
                    </header>

                </div>
                { IsPost.length ? <ImageSearch data ={IsPost} /> :''}
            </div>

        </>
    )
}