import style from "../../../assistents/css/core_style.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal} from "antd";
import {useState} from "react";
import axios from "axios";

export default function StoryMessageLeft(props) {
    const {message,created_at,from_user} = props;
    const[open,setOpen] = useState(false)
    const[story_image,setStoryImage] = useState('')
    function handleOpen(){
        setOpen(prevState => !prevState)
    }
    function add_story(story_id){
        axios.get(`http://127.0.0.1:8000/api/users/story/mentioned/add/${story_id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }})
            .then(response => {
                handleOpen()
                toast.success('You created new story!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <div className={message.user_id === +localStorage.getItem('id') ? style.right_message : style.left_message}>
                <div className={style.message_detail}>


                    <div className={style.add_story}>

                        <img src={`http://127.0.0.1:8000${message?.image}`} alt=""/> <br/>
                        {message.user_id === +localStorage.getItem('id') ?
                            <p style={{color: "rgb(12, 12, 12)"}}>You mentioned your story</p> :
                            <>
                                <button type="button" onClick={()=>{handleOpen();setStoryImage({
                                    "image":`http://127.0.0.1:8000${message?.image}`,
                                    "story_id":message.story_id
                                }) }}>Add Story</button>
                                <p style={{color: "rgb(12, 12, 12)"}}>Mentioned you in their story</p>
                            </>
                        }

                    </div>
                    <br/>
                    <span>{created_at}</span>

                </div>

                {message.user_id !== +localStorage.getItem('id') ?
                    <div className={style.user_icon}>
                        <img className={style.user_icon_img} src={`http://127.0.0.1:8000${from_user?.user_image}`}
                             alt=""/>
                    </div> : ''}


            </div>
            <Modal title="Add Story"
                open={open}
                cancelText={'Close'}
                okText={'Add to Story'}
               onCancel={handleOpen}
                onOk={()=>{add_story(story_image.story_id)}}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}>
                    <img src={story_image.image} alt="stroy" style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }} />
                </div>
            </Modal>
            <ToastContainer />
        </>


    )
}