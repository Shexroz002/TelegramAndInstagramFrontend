import style from "../../assistents/css/core_style.module.css";
import user_1 from "../../assistents/images/user-1.jpg";
import MagnifyingGlassGreay from "../../assistents/images/icons/MagnifyingGlassGreay.svg";
import CaretDown2 from "../../assistents/images/icons/CaretDown2.svg";
import {useEffect, useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import GroupDetail from "../../../../GroupDetail";

export default function ChatUserInfo(props){
    const{chat_room_id,showExtraRight,sidebar}=props;
    const[isuser_info,setUserInfo]=useState({});
    let history = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    let {id}=useParams();
    function openModal(){
        setIsModalOpen(prevState => !prevState);
    }
    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/chat/room/${sidebar}/${chat_room_id}?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                setUserInfo(data.data);


            }
            else {
                history('/telegram/0')
            }

        };

        socket.onclose = () => {
            history('/telegram/0')
            console.log('WebSocket Client Closed');

        };

        return () => {
            socket.close();
        };
    }, [chat_room_id,sidebar]);
    return (
        <>
            {sidebar === "chat" ?
                <div className={style.chat_profile__info}>
                    <div className={style.chat_profile__detail}>
                        <div className={style.chat_message__image}>
                            <img src={`http://127.0.0.1:8000${isuser_info.image}`} alt="user1"/>
                            {isuser_info.online_status === "writing..." || isuser_info.online_status === true ?
                                <div className={style.circle__online}></div> : ""
                            }
                        </div>

                        <div className={style.chat_message_info}>
                            <p>{isuser_info.username}</p>
                            <span>{isuser_info.online_status === "writing..." ?
                                "writing..." : isuser_info.online_status === true ? "online"
                                    : isuser_info.online_status}</span>
                        </div>
                    </div>
                    <div className={style.chat_profile__icon}>
                        <img src={MagnifyingGlassGreay} alt="lupa"/>
                        <div className={style.line}></div>
                        <img onClick={() => {
                            showExtraRight()
                        }} src={CaretDown2} alt="lupa"/>
                    </div>

                </div>

                :
                <div className={style.chat_profile__info}>
                    <div className={style.chat_profile__detail}>
                        <div className={style.chat_message__image}>
                            <img src={`http://127.0.0.1:8000${isuser_info?.group_image}`} alt="user1"/>
                        </div>

                        <div className={style.chat_message_info}>
                            <p style={{cursor:"pointer"}} onClick={()=>{setIsModalOpen(true)}}>{isuser_info.group_name}</p>
                            <span>{isuser_info.online_status}</span>
                        </div>
                    </div>
                    <div className={style.chat_profile__icon}>
                        <img src={MagnifyingGlassGreay} alt="lupa"/>
                        <div className={style.line}></div>
                        <img onClick={() => {
                            showExtraRight()
                        }} src={CaretDown2} alt="lupa"/>
                    </div>

                </div>}
    <GroupDetail status={isModalOpen} chat_room_id={chat_room_id} openModal={openModal} sidebar={sidebar} />
        </>
    )
}