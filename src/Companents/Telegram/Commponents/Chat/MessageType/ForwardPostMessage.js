import style from "../../../assistents/css/core_style.module.css";
import story from "../../../assistents/images/story.jpg";

export default function ForwardPostMessage(props) {
    const{message,left_or_right,message_id,created_at,read,from_user} = props;
    return (
        <div className={left_or_right==='left'?style.left_message:style.right_message}>
            <div className={left_or_right === 'left' ? style.message_file_left : style.message_file_right}>
                <div className={style.user_image}
                     style={{
                         display: 'flex',
                         flexDirection: 'row',
                         alignContent: 'center',
                         justifyContent: 'left',
                         alignItems: 'center',
                         backgroundColor: 'rgb(255, 255, 255)',
                         padding: '5px',
                     }}
                >
                    <img style={{width: '44px', height: '44px', borderRadius: "50%", marginRight: '5px'}}
                         src={`http://127.0.0.1:8000${message?.author_image}`} alt=""/>
                    <h3>{message?.author}</h3>
                </div>

                <div style={{backgroundColor: 'rgb(255, 255, 255)'}}>

                    <img style={{ width: "100%", maxHeight: "400px"}} src={`http://127.0.0.1:8000${message?.image}`} alt=""/> <br/>
                    <p>{message?.title}</p>

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
                    :""
            }
        </div>
    )
}