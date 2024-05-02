import rsa from './assistents/images/profile-14.jpg';
import './assistents/css/searchimage.css'
import {Link} from "react-router-dom";
export default function ImageSearch(props){
 const {data} = props
    return(
        <>
        <div className="containersh">
        <div className="image-containersh">
{data.map(item=>(
   <>
   <div class="image" data-title="cute">
         <img src={`http://127.0.0.1:8000${item.post_image}`} alt=""/>
       <Link to={`/comments/${item.id}`}><p>{item.title}</p></Link>
      </div></>
))}
      

      
   </div></div>


        </>
    )


}