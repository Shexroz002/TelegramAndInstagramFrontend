import style from "../../../assistents/css/core_style.module.css";
import React from "react";

export default function VoiceCategory(props){
    const {is_message_type,is_message_by_type}=props;
    return (
        <div style={{display: is_message_type === 'voice' ? "block" : "none"}} className={style.docs}>
            {is_message_by_type.map((item,index)=>(
                <>
                    <p className={style.time}>{item.day}</p>
                    <div  className={style.docs_all}>
                        {item.messages.map((document,order)=> (
                            <div className={style.docs_detail} style={{width: "80%", height: "90px"}}>

                                <div className={style.audio_message}>
                                    <audio key={order} controls>
                                        <source src={`http://127.0.0.1:8000${document.message?.message_file?.file}`}
                                                type="audio/mp3"
                                        />
                                    </audio>
                                </div>

                            </div>
                        ))}

                    </div>
                </>
            ))}

        </div>
    )
}