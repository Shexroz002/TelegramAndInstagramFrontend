import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeletePost from "./DeletePost";
import axios from "axios";
export default function UserPosts(props){
    const value = useParams()
    const user_id = localStorage.getItem('id');
    const {posts} = props;
    const [isId,setId] = useState();
    const [ishow,setshow] = useState(false);
    const [is_post,setpost] = useState(posts);
    function likeshow(element,id) {

      axios.get(`http://127.0.0.1:8000/api/posts/like/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            .then(data=>{
              if(data.status === 200) {
                  setpost(posts.map(item=>{
                      if(item.id === id){
                      item.liked = true;
                      item.like_count = +item.like_count+1;
                      }
                      return item;
                  }))
              }


                    })
            .catch(error=>{
                if(error.response.status === 401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    window.location.href = '/login';
                }
                else{
                    setpost(posts.map(item=>{
                        if(item.id === id){
                            item.liked = false;
                            item.like_count = +item.like_count-1;
                        }
                        return item;
                    }))
                }
            })
            }
    function deletepost(post_id){
      const post = document.querySelector(`#`+ post_id);
      post.remove()
    }
    function postdelete(id){
      setshow(prev=>!prev);
      setId(id);
      console.log(id,'is')
    }
    function showdelete(){
      setshow(prev=>!prev);
    }
    return(
      <>
        <div className="contenerprofile">

      <h3 className="title"> My Posts</h3>
      <div className="products-contenerprofile">
        {is_post.map(item=>(
    <div key={item.id} id={`${item.id}`} className="product" data-name="p-1">
            <img src={`http://127.0.0.1:8000${item.post_image}`} alt="" />
            <h3>{item.post_name}</h3>
            {user_id === value.id ?
            <div className="card-button">
            <Link to={`/post/update/${item.id}`} id='link' > <button className='select-image'><i className="bi bi-pen-fill"></i> Update </button> </Link><br/>
          <button onClick={()=>{postdelete(item.id);}} className='select-image'><i className="bi bi-trash3-fill"></i> Delete</button>
        </div>
         : 
         <div className="card-button">
             <Link to={`/comments/${item.id}`}><button className='select-image'><i className="bi bi-trash3-fill"></i> Comment ({item.comment_count})</button></Link> <br/>
          <button onClick={(e)=>{likeshow(e.target,item.id)}}  className='select-image'><i className="bi bi-heart-fill" style={{color:item.liked ? 'red':'white'}}></i> <p style={{display:'inline'}} className='like'>{item?.like_count}</p> Like</button>
        </div>
         }
        { ishow ? <DeletePost id={isId} showdelete={showdelete} deletepost={deletepost}  /> : '' }
         </div>
        ))}
         
   
        
   
      </div>
   
   </div></>
    )
}