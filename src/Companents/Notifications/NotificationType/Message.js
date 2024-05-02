import style from "../css/notification.module.css";


export default function Message(props){
    const {notification_chat,date,is_seen,markAsRead,id} = props;
    return(

        <>
            <div onClick={()=>{markAsRead(id)}} className={`${style.notification} ${style.readed} ${style.private_message}`}>
                <div className={style.avatar}><img src={`http://127.0.0.1:8000${notification_chat?.from_user.user_image}`}
                                                   alt="Rizky Hasanuddin"/></div>
                <div className={style.text}>
                    <div className={style.textTop}>
                        <p><span className={style.profile_name}>{notification_chat?.from_user.username}</span> sent you a private
                            message{is_seen ? '' : <span className={style.unreadDot}></span>}
                        </p>
                    </div>
                    <div className={style.textBottom}> {date}
                        <p>{notification_chat?.message.message}</p>
                    </div>
                </div>
            </div>
        </>
    )
}