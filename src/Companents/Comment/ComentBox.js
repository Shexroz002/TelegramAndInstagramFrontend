import { useState } from "react";
import CommiteUpdate from "./CommiteUpdate";;
export default function CommentBox(props){
    const[isType,setType] = useState('default');
    const[isshow,setshow] = useState(false);
    const[iscomment_id,setcomment_id] = useState();
    const[iscomment,setcomment] = useState('');
    const[iskey,setkey] = useState();
    const {comments,update_comments,delete_comment} = props;
    function showmodal(){
        setshow(prev=>!prev)
    }
    console.log(comments)
    function  showType(type,id){
        setType(type);
        setcomment_id(id);
       
    }

    return(
        <>
        {isshow ? <CommiteUpdate delete_comment={delete_comment} istype={isType} iscomment_id ={iscomment_id} showmodal={showmodal} comment={iscomment} update_comments={update_comments} index = {iskey}/>:''}
        {comments ? 
        <>
       <div className="chat-box">
          {comments.map((item,index)=>(
            +item.user.id === +localStorage.getItem('id') ?
                <>
                <div className="chat outgoing">
                <div className="details">
                    <p>{item.comment}   <i onClick={()=>{showmodal();showType('edit',item.id);setcomment(prev=>prev=item.comment);setkey(prev=>prev=index)}}  className="bi bi-pen"  style={{fontSize:'12px',color:'green'}}></i>
                        <i onClick={()=>{showmodal();showType('delete',item.id);setcomment(prev=>prev=item.comment);}}
                           className="bi bi-trash" style={{fontSize:'12px',color:'red'}}></i><br/><span style={{fontSize: "0.7rem",color: "aqua"}}>
                            {new Date(item.date_commented).getHours()} : {new Date(item.date_commented).getMinutes()>10 ? new Date(item.date_commented).getMinutes()
                            : `0${new Date(item.date_commented).getMinutes()}`} </span></p>
                </div>
            </div></>
            :
                 <>
            <div className="chat incoming">
              <img src={`http://127.0.0.1:8000${item.user.user_image}`} alt="" />
              <div className="details">
                  <p>{item.comment}<br/><span style={{fontSize: "0.7rem",color:"blue"}}>{new Date(item.date_commented).getHours()} : {new Date(item.date_commented).getMinutes()>10 ? new Date(item.date_commented).getMinutes() : `0${new Date(item.date_commented).getMinutes()}`}</span></p>
              </div>
              </div></>
            
           
        
    ))}
        </div>
        
        </> :
        ''}
        
        </>
    )
    
}