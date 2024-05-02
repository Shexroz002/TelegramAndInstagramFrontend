import style from "../assistents/css/core_style.module.css";
import Group from "../assistents/images/icons/Group.svg";
import React from "react";


export default function DefaultRight(){
    return(
        <div className={style.rightInfo}>
            <img style={{width: "200px"}} src={Group} alt="Group"/>
            <p>Select a conversation or start a new one</p>
        </div>
    )
}