import style from "../css/notification.module.css";


export default function Following(props){
    const {user,date,is_seen,markAsRead,id} = props;
    return(

        <>
            <div onClick={()=>{markAsRead(id)}}  className={is_seen ?`${style.notification}`:`${style.notification} ${style.unreaded}`}>
                <div className={style.avatar}><img src={`http://127.0.0.1:8000${user?.user_image}`} alt="Angela Gray"/></div>
                <div className={style.text}>
                    <div className={style.textTop}>
                        <p><span className={style.profile_name}>{user?.username}</span> followed you
                            {is_seen ? '' : <span className={style.unreadDot}></span>}</p>
                    </div>
                    <div className={style.textBottom}> {date}</div>
                </div>
            </div>
        </>
    )
}