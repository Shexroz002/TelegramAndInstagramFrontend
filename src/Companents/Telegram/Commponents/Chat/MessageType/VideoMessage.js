import style from "../../../assistents/css/core_style.module.css";
import vido from "../../../assistents/images/vido.mp4";

export default function VideoMessage(props){
    const{
        left_or_right,
        message,
        created_at,
        message_id,
        message_type,
        read,
        from_user,
        ChangeActionMessage,
        SetMessageDetail,
        openMessageDetail
    }=props;
    return (
        <div className={left_or_right==='left'?style.left_message:style.right_message} onClick={()=> {
            openMessageDetail(left_or_right)
            ChangeActionMessage(message,message_type,message_id)
            SetMessageDetail(true)
        }}>
            <div className={style.message_detail}>
                <div className={style.video_message}>
                    <video width="220" height="240" controls style={{border: "2px solid white", borderRadius: "50%"}}>
                        <source src={`http://127.0.0.1:8000${message?.message_file}`} type="video/mp4"/>
                    </video>

                </div>
                <br/>
                <span>{created_at}</span>
                {left_or_right==='right'? read ?<i className="bi bi-check2-all"></i> : <i className="bi bi-check"></i> : ''}

            </div>
            {
                left_or_right === 'left' ?
                    <div className={style.user_icon}>
                        <img className={style.user_icon_img} src={`http://127.0.0.1:8000${from_user?.user_image}`} alt=""/>
                    </div>
                    :""
            }
        </div>
    )
}