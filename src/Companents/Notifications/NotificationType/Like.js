import style from "../css/notification.module.css";


export default function Like(props){
    const {post_like,date,is_seen, markAsRead, id} = props;
    return(

        <>
            <div onClick={()=>{markAsRead(id)}} className={`${style.notification} ${style.readed} ${style.picture}`}>
                <div className={style.avatar}><img src={`http://127.0.0.1:8000${post_like?.get_last_like_user.user_image}`} alt="Kimberly Smith"/></div>
                <div className={style.text}>
                    <div className={style.textTop}>
                        <p><span className={style.profile_name}>{post_like?.get_last_like_user.username}</span> liked on your
                            post{is_seen ? '' : <span className={style.unreadDot}></span>}</p>
                    </div>
                    <div className={style.textBottom}> {date}</div>
                </div>
                <div className={style.commentedPicture}>
                    <img src={`http://127.0.0.1:8000${post_like?.post_image}`} alt="Commented Picture" alt="sadss"/>
                </div>
            </div>
        </>
    )
}