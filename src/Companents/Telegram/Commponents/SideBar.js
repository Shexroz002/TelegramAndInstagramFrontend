import style from "../assistents/css/core_style.module.css";
import icon_chat from "../assistents/images/icon-chat.png";
import chat from "../assistents/images/icons/chat.svg";
import users from "../assistents/images/icons/users.svg";
import phone from "../assistents/images/icons/phone.svg";
import gear from "../assistents/images/icons/gear.svg";
import user_image from "../assistents/images/user_image.jpg";
import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
export default function SideBar(props){
    const{sidebar,change_sidebar}=props;

    return (
        <div className={style.sidebar}>
            <div className={style.menu}>
                <Link to={'/feed/'}>
                    <span className={style.menu__icon}>
                       <img src={icon_chat} alt="icon-chat"/>
                    </span>
                </Link>
                <span onClick={()=>{change_sidebar("chat")}} className={sidebar==="chat"?`${style.menu__icon} ${style.sidebar_active}`:style.menu__icon}>
                    <i style={{fontSize:"25px",color:sidebar==="chat"? "white":"black"}}  className="bi bi-chat-dots"></i>
                </span>
                <span onClick={()=>{change_sidebar("group")}} className={sidebar==="group"?`${style.menu__icon} ${style.sidebar_active}`:style.menu__icon}>
                    <i style={{fontSize:"25px",color:sidebar==="group"? "white":"black"}} className="bi bi-people"></i>
                </span>

                {/*<span className={style.menu__icon}></span>*/}
                {/*<span className={style.menu__icon}>*/}
                {/*    <img src={gear} alt="icon-chat"/>*/}
                {/*</span>*/}

            </div>
            <div className={style.themeMode}>
                    <span className={style.menu__icon}>
                        <img src={user_image} alt="icon-chat"/>
                     </span>
            </div>
        </div>
    )
}