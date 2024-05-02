import Likeimage from "../LikeImage";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link , } from "react-router-dom";
import VideoPlayer from "../../vides";
import ForwardPost from "../NeedCompanents/Forward";
import {useState} from "react";
export default function Feed(props){
    const[open,setOpen] = useState(false);
    function openModal(){
        setOpen(prev=>!prev);
    }
    const {
        id,
        comment_count,
        username,
        saved,
        liked,
        userid,
        user_image,
        post_image,
        post_title,
        create_by,
        like,
        comment,
        delete_post,
        favorite_post,
        comment_author
    } = props;
    const[is_like,setIsLike] = useState(liked)
    const user_id = localStorage.getItem('id')
    console.log('users',user_id)
    function likeshow(element,id) {
        const like = document.getElementById(`${id}`);
        const like_count = parseInt(like.innerHTML)
        axios.get(`http://127.0.0.1:8000/api/posts/like/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(data=>{
        setIsLike(true)
      })
      .catch(error=>{
        setIsLike(false)

      })
      }



    function add_favorite_post(id){
        axios.get(`http://127.0.0.1:8000/api/posts/saved/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
        )
        .then(data=>{
            toast.success('This post had saved successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
        .catch(error=>{
            toast.info('This post already had saved!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
    
        })
    }
    function delete_favorite_post(id){
        axios.delete(`http://127.0.0.1:8000/api/posts/saved/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
        )
        .then(data=>{
           
        })
        .catch(error=>{
            toast.error('This post had deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                
        })
    }

    return(
        
        <div className="feed" key={id}>
            <ForwardPost post_id={id} open={open} setModal={setOpen} />
            <ToastContainer />
                    <div className="head">
                        <div className="user">
                            <div className="profile-photo">
                                <img src={`http://127.0.0.1:8000${user_image}`} alt="ssadsad" />
                            </div>
                            <div className="ingo">
                                <h3><Link to={`/profile/${userid}`}>{username}</Link></h3>
                                <small>{create_by}</small>
                                <h3 style={{textAlign: 'center',}}>{post_title}</h3>
                            </div>
                        </div>
                        <span className="edit">
                            <i className="uil uil-ellipsis-h"></i>
                        </span>
                    </div>

                    <div className="photo">
                        <img src={`http://127.0.0.1:8000${post_image}`} alt="sdds" />
                        {/*<VideoPlayer image={`http://127.0.0.1:8000${post_image}`}/>*/}
                    </div>

                    <div className="action-buttons">
                        <div className="interaction-button">
                            <span onClick={(e)=>{likeshow(e.target,id)}} className="like">
                                {is_like ?
                                  <i style={{color:'red',fontSize:"25px",marginRight:"5px"}} className="bi bi-heart-fill"></i>:
                                  <i  className="bi bi-heart"></i>}</span>
                            <span><Link to={`/comments/${id}`}><i style={{fontSize:"27px",marginRight:"5px"}} className="uil uil-comment-dots"></i></Link> </span>
                            <span>
                                <i className="uil uil-share-alt"
                                   style={{fontSize:"27px",marginRight:"5px"}}
                                   onClick={()=>setOpen(true)}
                                ></i>
                            </span>
                        </div>
                        <div className="bookmark">
                            <span onClick={()=>{ if( favorite_post ){delete_favorite_post(id);delete_post(id)}else{add_favorite_post(id);}}}>{favorite_post ?
                                <i style={{color: "red", fontSize: "18px"}}
                                   className="uil uil-trash-alt"></i> : saved ? "" :
                                    <i className="uil uil-bookmark-full"></i>}</span>
                        </div>
                    </div>
                    <div className="liked-by">
                        {like.length ? like.map(item=>(
                            <>
                            <Likeimage likeimage={item} />
                            </>
                            
                        )) :''}
                       
                        <p>Liked by <b>{like.length ? like[0].username :'Not found'}</b> and <b id={id}>{like.length} other</b></p>
                    </div>
                    <div className="comment text-muted">View all {comment_count} comments</div>
                     <div className="caption">
                        <p><b>{comment_author}</b> {comment}</p>
                    </div>

                  {/*  <div className="comments text-muted">View all 277 comments</div> */}
                </div>
    )
}