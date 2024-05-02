import style from './../../assistents/css/core_style.module.css'
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import AudioMessage from "./MessageType/AudioMessage";
import VideoMessage from "./MessageType/VideoMessage";
import FileMessage from "./MessageType/FileMessage";
import StoryMessageLeft from "./MessageType/StoryMessageLeft";
import TextAndImage from "./MessageType/TextAndImage";
import ForwardPostMessage from "./MessageType/ForwardPostMessage";
import ChatUserInfo from "./ChatUserInfo";
import SendMessage from "./SendMessage";
import {useNavigate,useParams} from "react-router-dom";
import {Modal,Button} from "antd";
import {DeleteOutlined, EditOutlined, ShareAltOutlined} from "@ant-design/icons";
import MentionedUser from "../../../NeedCompanents/Mentioned";
import EditMessage from "./EditedMessage/EditMEssage";
import ForwardMessage from "./MessageType/ForwardMessage";
export default function MainChat(props){
    const{showExtraRight,sidebar}=props;
    const[ismessages,setMessages]=useState([]);
    const[deleteMessage,setDeleteMessage]=useState(false);
    const [editMessage,setEditMessage]=useState(false);
    const [shareMessage,setShareMessage]=useState(false);
    const[shareUser,setShareUser]=useState([]);
    const[actionMessage,setActionMessage]=useState({});
    const[editedMessage,setEditedMessage]=useState('');
    let history=useNavigate();
    const[leftOrRight,setLeftOrRight]=useState('right');
    const[is_message_detail,SetMessageDetail]=useState(false);
    let {id}=useParams();
    const chatbox = useRef(null)

    function send_forward_message(){
        axios.put(`http://127.0.0.1:8000/api/chat/room/chat/message/action/${actionMessage.message_id}`,{
                "message_type":actionMessage.message_type,
                "forward_message":editedMessage
            }
            ,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }).then((response)=>{
            setEditMessage(false);
            setMessages((prev)=>{
                    return prev.map((item)=>{
                        if(item.message_id===actionMessage.message_id){
                            item.message=editedMessage;
                        }
                        return item;
                    })
                }
            )
            setActionMessage(prevState => {})

        }).catch((error)=>{
            console.log(error)
        })
    }
    function send_update_message(){
        console.log(actionMessage.message_id,actionMessage.message_type,actionMessage.message)
        axios.put(`http://127.0.0.1:8000/api/chat/room/${sidebar}/message/action/${actionMessage.message_id}`,{
            "message_type":actionMessage?.message_type,
            "message_text":actionMessage?.message
        }
        ,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }).then((response)=>{
            console.log(response)
            setEditMessage(false);
            setMessages((prev)=>{
                return prev.map((item)=>{
                    if(item.message_id===actionMessage.message_id){
                        item.message=actionMessage?.message;
                    }
                    return item;
                })
            }
            )
            setActionMessage(prevState => {})

        }).catch((error)=>{

        })

    }
    function send_delete_message(){
        axios.delete(`http://127.0.0.1:8000/api/chat/room/${sidebar}/message/action/${actionMessage.message_id}`,
            {
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
                })
            .then((response)=>{
                setDeleteMessage(false);
                setMessages((prev)=>{
                    return prev.filter((item)=>{
                        return item.message_id!==actionMessage.message_id;
                    })
                })
                setActionMessage(prevState => {})
            }).catch((error)=>{
                console.log(error)
            })
            }
    const get_value = (e) => {
        let users_id = [];
        e.map((item)=>{
            users_id.push(item.value);
        })
        setShareUser(users_id);
    }
    function openMessageDetail(left_or_right){
        SetMessageDetail(true);
        setLeftOrRight(left_or_right);
    }
    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/chat/${sidebar}/message/all/${id}?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                setMessages(prev=>[...data.data]);
                console.log(data.data,'alldata')

            }
            else {
                history('/telegram/0')
            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');

        };

        return () => {
            socket.close();
        };
    }, [id]);
    // function scrolldown(chat) {
    //     let fn = someolist(chat);
    //     if (fn[0]) {
    //         setTimeout(() => {
    //             fn[0].scrollIntoView();
    //         }, 0);
    //     } else {
    //         setTimeout(() => {
    //             chatbox.current.scrollTop
    //         }, 0);
    //         // chatBox.scrollBottom = chatBox.scrollHeight;
    //     }
    // }
    // function someolist(data) {
    //     let arr = [];
    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i].getAttribute("read") === "false") {
    //             arr.push(data[i]);
    //             break;
    //         }
    //     }
    //     return arr;
    // }
    function share_message(){
        axios.post(`http://127.0.0.1:8000/api/chat/room/${sidebar}/message/create/${id}`,{
            "message_type":'forward_message',
            "forward_message_id":actionMessage.message_id,
            "chat_room_list":shareUser
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then((response)=>{
            setShareMessage(false);
        }).catch((error)=>{
            console.log(error)
        })
        }

    function ChangeActionMessage(message,message_type,message_id){
        setActionMessage(prevState => {
            return {
                message:message,
                message_type:message_type,
                message_id:message_id
                }
            }
            )

    }

    return(
        <div className={style.chat_message_box}>
            <ChatUserInfo showExtraRight={showExtraRight} sidebar={sidebar} chat_room_id={id}/>
            <div className={style.chat_area}>
                <div ref={chatbox} className={style.chat_area__message}>
                    {ismessages.map((item,index)=>{
                        if(item.message_type==='voice'){
                            return <AudioMessage key={index}
                                                 created_at={item.created_at}
                                                 left_or_right={item.left_or_right}
                                                 message={item.message}
                                                 message_id={item.message_id}
                                                 message_type={item.message_type}
                                                 read={item.read}
                                                 openMessageDetail={openMessageDetail}
                                                 ChangeActionMessage={ChangeActionMessage}
                                                 from_user={item.from_user}
                                                 send_update_message={send_update_message}
                                                 editMessage={editMessage}
                                                 SetMessageDetail={setEditedMessage}

                            />
                        }
                        if(item.message_type==='video'){
                            return <VideoMessage key={index}
                                                 created_at={item.created_at}
                                                 left_or_right={item.left_or_right}
                                                 message={item.message}
                                                 message_id={item.message_id}
                                                 message_type={item.message_type}
                                                 read={item.read}
                                                 from_user={item.from_user}
                                                 openMessageDetail={openMessageDetail}
                                                 ChangeActionMessage={ChangeActionMessage}
                                                 send_update_message={send_update_message}
                                                 editMessage={editMessage}
                                                 SetMessageDetail={setEditedMessage}
                            />
                        }
                        if(['word','pdf','excel','ppt'].includes(item.message_type)){
                            return <FileMessage key={index}
                                                created_at={item.created_at}
                                                left_or_right={item.left_or_right}
                                                message={item.message}
                                                message_id={item.message_id}
                                                message_type={item.message_type}
                                                read={item.read}
                                                from_user={item.from_user}
                                                openMessageDetail={openMessageDetail}
                                                ChangeActionMessage={ChangeActionMessage}
                                                send_update_message={send_update_message}
                                                editMessage={editMessage}
                                                SetMessageDetail={setEditedMessage}
                            />
                        }
                        if(item.message_type==='story'){
                            return <StoryMessageLeft key={index}
                                                     created_at={item.created_at}
                                                     left_or_right={item.left_or_right}
                                                     message={item.message}
                                                     message_id={item.message_id}
                                                     message_type={item.message_type}
                                                     read={item.read}
                                                     from_user={item.from_user}
                            />
                        }
                        if(item.message_type==='text' || item.message_type==='image'){
                            return <TextAndImage key={index}
                                                 created_at={item.created_at}
                                                 left_or_right={item.left_or_right}
                                                 message={item.message}
                                                 message_id={item.message_id}
                                                 message_type={item.message_type}
                                                 read={item.read}
                                                 openMessageDetail={openMessageDetail}
                                                 ChangeActionMessage={ChangeActionMessage}
                                                 from_user={item.from_user}
                                                 send_update_message={send_update_message}
                                                 editMessage={editMessage}
                                                 SetMessageDetail={setEditedMessage}

                            />
                        }
                        if(item.message_type==='forward_post'){
                            return <ForwardPostMessage key={index}
                                                 created_at={item.created_at}
                                                 left_or_right={item.left_or_right}
                                                 message={item.message}
                                                 message_id={item.message_id}
                                                 message_type={item.message_type}
                                                 read={item.read}
                                                 from_user={item.from_user}
                            />
                        }
                        if(item.message_type==='forward_message'){
                            return <ForwardMessage key={index}
                                                 created_at={item.created_at}
                                                 left_or_right={item.left_or_right}
                                                 message={item.message}
                                                 message_id={item.message_id}
                                                 message_type={item.message_type}
                                                 read={item.read}
                                                 from_user={item.from_user}
                            />
                        }
                    })
                    }


                </div>
            </div>
            <SendMessage sidebar={sidebar} chat_room_id={id} />
            <Modal

                title="What do you want to do with this message?"
                centered
                open={is_message_detail}
                cancelText={"Cancel"}
                onCancel={()=>SetMessageDetail(false)}
                okButtonProps={{ style: { display: 'none' } }}
                // cancelButtonProps={{ style: { display: 'none' } }}
            >
                {leftOrRight==='right'?
                <>
                    <Button
                        style={{marginRight:"10px"}}
                        onClick={()=> {
                            SetMessageDetail(false);
                            setDeleteMessage(true);
                        }}>
                        <DeleteOutlined />
                    </Button>
                    {actionMessage?.message_type==='text' || actionMessage?.message_type==='image'?
                        <Button
                            style={{marginRight:"10px"}}
                            onClick={()=> {
                                SetMessageDetail(false);
                                setEditMessage(true);
                            }}>
                            <EditOutlined style={{ fontSize: '26px', color: 'green' }} />
                        </Button>:''}
                </>
                    :''
                }


                <Button
                    style={{marginRight:"10px"}}
                    onClick={()=> {
                        SetMessageDetail(false);
                        setShareMessage(true);
                    }}>
                    <ShareAltOutlined style={{fontSize:"26px",color:"blue"}} />
                </Button>

            </Modal>
            <Modal
                title="do you want to delete this message?"
                centered
                open={deleteMessage}
                okText={"Yes"}
                cancelText={"No"}
                onOk={()=>send_delete_message()}
                onCancel={()=>setDeleteMessage(false)}
                okButtonProps={{ style: { backgroundColor: 'red' ,color:"white"} }}
            >

        </Modal>

            <Modal
                title="do you want to share this message?"
                centered
                open={shareMessage}
                okText={"Yes"}
                cancelText={"No"}
                onOk={()=>share_message()}
                onCancel={()=>setShareMessage(false)}
                okButtonProps={{ style: { backgroundColor: 'blue' ,color:"white"} }}>
                <MentionedUser get_value={get_value}/>
            </Modal>

            <EditMessage
                open={editMessage}
                editedMessage={editedMessage}
                setEditMessage={setEditMessage}
                send_update_message={send_update_message}
                actionMessage={actionMessage}
                setEditedMessage={setEditedMessage}
                setActionMessage={setActionMessage}/>
        </div>



    )
}