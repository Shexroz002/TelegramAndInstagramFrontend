import style from "../../../assistents/css/core_style.module.css";

export default function TextAndImage(props){
    const {
        left_or_right,
        message_id,
        message_type,
        message,
        created_at,
        read,
        ChangeActionMessage,
        from_user,
        SetMessageDetail,
        openMessageDetail
    } = props;
    return (
        <div className={left_or_right==='left'?style.left_message:style.right_message} onClick={()=> {
            openMessageDetail(left_or_right)
            ChangeActionMessage(message,message_type,message_id)
            SetMessageDetail(true)
        }}>
            <div className={style.message_detail}>
                <p> {message_type === 'text' ? message : <img src={`http://127.0.0.1:8000${message.message_file}`} alt=""/>} </p>

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