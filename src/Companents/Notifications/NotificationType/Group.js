import style from "../css/notification.module.css";


export default function Group(props){
    const {notification_group,date,is_seen, markAsRead, id} = props;
    return(

        <>
            <div onClick={()=>{markAsRead(id)}} className={is_seen ?`${style.notification}`:`${style.notification} ${style.unreaded}`}>
                <div className={style.avatar}><img src={`http://127.0.0.1:8000${notification_group?.get_last_added_user.user_image}`} alt="Jacob Thompson"/></div>
                <div className={style.text}>
                    <div className={style.textTop}>
                        <p><span className={style.profile_name}>{notification_group?.get_last_added_user.username}</span> has joined your
                            group <b
                                className={style.bBlue}>{notification_group?.group_name}</b>
                            {is_seen ? '' : <span className={style.unreadDot}></span>}</p>
                    </div>
                    <div className={style.textBottom}>{date}</div>
                </div>
            </div>
        </>
    )
}