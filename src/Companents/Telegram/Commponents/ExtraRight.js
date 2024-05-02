import image from "../assistents/images/image.jpg";
import style from "../assistents/css/core_style.module.css";
import {useState,useEffect} from "react";
import ImageCategory from "./Chat/MessageCategory/ImageCategory.jsx";
import LinkCategory from "./Chat/MessageCategory/LinkCategory";
import DocumentCategory from "./Chat/MessageCategory/DocumentCategory";
import axios  from "axios";
import VideoCategory from "./Chat/MessageCategory/VideoCategory";
import VoiceCategory from "./Chat/MessageCategory/VoiceCategory";
import {useParams} from "react-router-dom";
export default function ExtraRight(props){
    const {show,showExtraRight,sidebar}=props;
    const[is_message_by_type,setMessageByType]=useState([])
    const [is_message_type,setMessageType] = useState('document');
    let {id} = useParams();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/chat/${sidebar}/message/type/${id}?message_type=${is_message_type}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response=>{
            setMessageByType(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[is_message_type,sidebar,id])
    return(
        <div style={{display:show ? "block":"none"}} className={style.extra_middle} >
            <div onClick={()=>{showExtraRight()}} className={style.close_window}>
                <i className="bi bi-x-circle"></i> <h2 style={{marginLeft:"5px"}}>Message By Category</h2>
            </div>
            <div className={style.message_type_list}>
                <h5 onClick={()=>{setMessageType('video')}}
                    className={is_message_type === 'video' ? style.active : ''}
                    style={{cursor:"pointer"}}>Video</h5>
                <h5 onClick={()=>{setMessageType('voice')}}
                    className={is_message_type === 'voice' ? style.active : ''}
                    style={{cursor:"pointer"}}>Voice</h5>
                <h5 onClick={()=>{setMessageType('image')}}
                    className={is_message_type === 'image' ? style.active : ''}
                    style={{cursor:"pointer"}}>Image</h5>
                <h5 onClick={()=>{setMessageType('document')}}
                    className={is_message_type === 'document' ? style.active : ''}
                    style={{cursor:"pointer"}}>Docs</h5>
                {/*<h5 onClick={()=>{setMessageType('link')}}*/}
                {/*    className={is_message_type === 'link' ? style.active : ''}*/}
                {/*    style={{cursor:"pointer"}}>Link</h5>*/}
                {/*<h5>File</h5>*/}
            </div>
            <div className={style.message_type_body}>
                <ImageCategory is_message_by_type={is_message_by_type} is_message_type={is_message_type}/>
                <LinkCategory is_message_type={is_message_type}/>
                <DocumentCategory is_message_by_type={is_message_by_type} is_message_type={is_message_type}/>
                <VideoCategory is_message_by_type={is_message_by_type} is_message_type={is_message_type}/>
                <VoiceCategory is_message_by_type={is_message_by_type} is_message_type={is_message_type}/>
            </div>
        </div>
    );
}