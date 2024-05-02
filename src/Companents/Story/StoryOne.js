import {useState} from "react";
import axios from "axios";

export default function StoryOne(props){
    const {image, title, liked, index,story_id} = props;
    const [like, setLike] = useState(false)
    if(liked === true){
        setLike(true)
    }else{
        setLike(false)

    }
   function likeStory(story_id){

          axios.get(`http://127.0.0.1:8000/api/users/story/like/${story_id}`, {
               headers: {
                   'Authorization': `Bearer ${localStorage.getItem('token')}`
               }
           }).then(response => {
              setLike(true)
           }).catch(error => {
              setLike(false)
           })

       }
    return (
        <div key={index}>
            <img src={`http://127.0.0.1:8000${image}`} alt="no_image" className="modal__img"/>
            {/*<h1 className="modal__title"></h1>*/}
            <p className="modal__description">{title}</p>
            <span className="like">
                                Like this story
                {like === true ?
                    <i onClick={()=>{likeStory(story_id)}} style={{color: 'red', fontSize: "25px", marginRight: "5px"}}
                       className="bi bi-heart-fill"></i> :
                    <i onClick={()=>{likeStory(story_id)}} style={{color: 'red', fontSize: "25px", marginRight: "5px"}}
                       className="bi bi-heart"></i>
                }
            </span>
        </div>
    )
}