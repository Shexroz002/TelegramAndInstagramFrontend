import style from "../../../assistents/css/core_style.module.css";

export default function FileMessage(props){
    const{
        message,
        message_type,
        left_or_right,
        message_id,
        created_at,
        read,
        from_user,
        ChangeActionMessage,
        SetMessageDetail,
        openMessageDetail
    } = props;
    return (
        <div className={left_or_right==='left'?style.left_message:style.right_message} onClick={()=> {
            openMessageDetail(left_or_right)
            ChangeActionMessage(message,message_type,message_id)
            SetMessageDetail(true)
        }}>
            <div className={left_or_right==='left'?style.message_file_left:style.message_file_right}>
                <div className={style.file_detail}>
                    {message_type === 'image' ?
                        <i className="bi bi-image"></i>: message_type === 'video' ?
                        <i className="bi bi-file-play"></i>: message_type === 'audio' ?
                                <i className="bi bi-file-break"></i> : message_type === 'document' ?
                                    <i className="bi bi-file-earmark-text"></i>: message_type === 'pdf' ?
                        <i className="bi bi-file-earmark-pdf"></i>: message_type === 'excel' ?
                        <i className="bi bi-file-earmark-excel"></i>: message_type === 'word' ?
                                                <i className="bi bi-file-earmark-word"></i> : ''}

                        <div className={style.file_size}>
                    <p>{message.file_name}</p>
                        <span>{message.size}</span>
                    </div>

                    <i className="bi bi-cloud-arrow-down"></i>
                </div>
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