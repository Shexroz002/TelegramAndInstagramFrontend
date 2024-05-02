import style from "../../../assistents/css/core_style.module.css";
import she from "../../../assistents/images/she.mp3";


export default function AudioMessage(props){
    const{
        left_or_right,
        message,
        created_at,
        message_id,
        read,
        openMessageDetail,
        ChangeActionMessage,
        SetMessageDetail,
        message_type,
        from_user
    }=props;
    return (
        <div className={left_or_right === 'left' ? style.left_message : style.right_message}
             read={left_or_right === "left" ? {read} : ""} onClick={()=> {

            openMessageDetail(left_or_right)

            ChangeActionMessage(message,message_type,message_id)
            SetMessageDetail(true)
        }}>
            <div className={style.message_detail}>
                <div className={style.audio_message}>
                    <audio controls>
                        <source src={`http://127.0.0.1:8000${message?.message_file}`} type="audio/mp3"/>
                    </audio>
                </div>
                <br/>
                <span>{created_at}</span>
                {left_or_right === 'right' ? read ? <i className="bi bi-check2-all"></i> :
                    <i className="bi bi-check"></i> : ''}
            </div>
            {
                left_or_right === 'left' ?
                    <div className={style.user_icon}>
                        <img className={style.user_icon_img} src={`http://127.0.0.1:8000${from_user?.user_image}`} alt=""/>
                    </div>
                    :""}
                </div>
                )
            }