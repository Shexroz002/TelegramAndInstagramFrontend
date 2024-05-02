import style from "../../../assistents/css/core_style.module.css";
import image from "../../../assistents/images/image.jpg";

export default function ImageCategory(props){
    const {is_message_type,is_message_by_type} = props;
    return (
        <div style={{display: is_message_type === 'image' ? "block" : "none"}} className={style.media}>
            {is_message_by_type.map((item)=>(
                    <>
                        <p className={style.time}>{item.day}</p>
                        <div className={style.media_all}>
                            {item.messages.map((image)=> (
                                <div  className={style.media_image}>
                                    <img src={`http://127.0.0.1:8000${image.message?.message_file?.file}`} alt="user"/>
                                </div>
                            ))}


                        </div>
                    </>
                )
            )}

            {/**/}
        </div>
    )
}