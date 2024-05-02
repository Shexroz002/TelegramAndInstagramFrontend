import style from "../../../assistents/css/core_style.module.css";
import React from "react";

export default function DocumentCategory(props){
    const {is_message_type,is_message_by_type={is_message_by_type}}=props;
    return (
        <div style={{display: is_message_type === 'document' ? "block" : "none"}} className={style.docs}>
            {is_message_by_type.map((item)=>(
                <>
                    <p  className={style.time}>{item.day}</p>
                    <div className={style.docs_all}>
                        {item.messages.map((document)=> (
                            <div className={style.docs_detail}>
                                <div className={style.docs_image} style={{
                                    borderRadius: "10px",
                                    background: "#D9D9D9",
                                    marginBottom: "15px",
                                    width: "283px",
                                    height: "153px",
                                }}>
                                </div>
                                <div className={style.docs_icon}>
                                    {document.message.message_type === "excel" ?
                                        <i className="bi bi-file-earmark-excel"></i> : document.message.message_type === "word" ?
                                            <i className="bi bi-file-earmark-word"></i> : document.message.message_type === "pdf" ?
                                                <i className="bi bi-file-earmark-pdf"></i> :
                                                <i className="bi bi-file-earmark-document"></i>
                                    }

                                    <span>{document.message?.message_file?.name}</span>
                                    <a href={`http://127.0.0.1:8000${document.message?.message_file?.file}`} download>
                                        <i className="bi bi-cloud-arrow-down"></i></a>
                                </div>
                            </div>
                        ))}

                    </div>
                </>
            ))}

        </div>
    )
}