import style from "../../../assistents/css/core_style.module.css";
import story from "../../../assistents/images/story.jpg";

export default function ForwardMessage(props) {
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
                         src={`http://127.0.0.1:8000${message?.user_image}`} alt=""/>
                    <h3>{message?.username}</h3>
                </div>

                <div style={{backgroundColor: 'rgb(255, 255, 255)'}}>


                    {message.message_type === 'video' ?
                        <video width="220" height="240" controls
                               style={{border: "2px solid white", borderRadius: "50%"}}>
                            <source src={`http://127.0.0.1:8000${message?.message}`}
                                    type="video/mp4"/>
                        </video> :
                        message.message_type === 'image' ?
                            <>
                                <img style={{maxWidth: "700px", maxHeight: "400px"}}
                                     src={`http://127.0.0.1:8000${message?.message}`} alt=""/> <br/>
                            </>
                            :
                            message.message_type === 'voice' ?
                                <div className={style.audio_message}>
                                    <audio controls>
                                        <source src={`http://127.0.0.1:8000${message?.message}`} />
                                    </audio>
                                </div>
                                :
                                [
                                    "video",
                                    'audio',
                                    'document',
                                    'pdf',
                                    'excel',
                                    'word',
                                ].includes(message.message_type) ?
                                    <div className={style.file_detail}>
                                        {message.message_type === 'image' ?
                                            <i className="bi bi-image"></i> : message.message_type === 'video' ?
                                                <i className="bi bi-file-play"></i> : message.message_type === 'audio' ?
                                                    <i className="bi bi-file-break"></i> : message.message_type === 'document' ?
                                                        <i className="bi bi-file-earmark-text"></i> : message.message_type === 'pdf' ?
                                                            <i className="bi bi-file-earmark-pdf"></i> : message.message_type === 'excel' ?
                                                                <i className="bi bi-file-earmark-excel"></i> : message.message_type === 'word' ?
                                                                    <i className="bi bi-file-earmark-word"></i> : ''}

                                        <div className={style.file_size}>
                                            <p>{message.file_name}</p>
                                            <span>{message.size}</span>
                                        </div>

                                        <i className="bi bi-cloud-arrow-down"></i>
                                    </div>:
                                message.message_type === 'text' ?
                                    <p>{message.message}</p> : ''



                    }
                </div>
                <br/>
                <span>{created_at}</span>
                {left_or_right === 'right' ? read ? <i className="bi bi-check2-all"></i> :
                    <i className="bi bi-check"></i> : ''}

            </div>
            {
                left_or_right === 'left' ?
                    <div className={style.user_icon}>
                        <img className={style.user_icon_img} src={`http://127.0.0.1:8000${from_user?.user_image}`}
                             alt=""/>
                    </div>
                    : ""
            }
        </div>
    )
}