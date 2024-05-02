import style from "../assistents/css/core_style.module.css";
import CircleDashed from "../assistents/images/icons/CircleDashed.svg";
import MagnifyingGlass from "../assistents/images/icons/MagnifyingGlass.svg";
import FunnelSimple from "../assistents/images/icons/FunnelSimple.svg";
import ArchiveBox from "../assistents/images/icons/ArchiveBox.svg";
import {Button} from "antd";
import {useState,useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import CreateGroup from "./CreateGroup";

export default function Middle(props){
    const {openCreateGroup,iscreateGroup}=props;
    const [isSearchChatUsers,setSearch]=useState([]);
    const[ischats,setIsChats]=useState([]);
    const[isGroups,setIsGroups]=useState([]);
    const [isSearchGroupsUsers,setGroups]=useState([]);
    const value = useParams();
    const {sidebar}=props;
    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/chat/${sidebar}/list?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                if (sidebar==="chat"){
                    setIsChats(prev=>[...data.data]);
                    setSearch(prev=>[...data.data]);
                }
                else {
                    setIsGroups(prev=>[...data.data]);
                    setGroups(prev=>[...data.data]);
                }
            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            socket.close();
        };
    }, [sidebar]);

    // function delete_group(id){
    //     setGroups(isGroups.filter((item)=>{
    //         return item.group_chat_id!==id;
    //     }));
    // }

    function SearchUser(username){
        if(username){
            let user = ischats.filter((item)=>{
                return item.username.toLowerCase().includes(username.toLowerCase());
            });
            setSearch(user);
        }
        else {
            setSearch(ischats);
        }
    }
    function SearchGroup(group_name){
        if(group_name){
            let group = isGroups.filter((item)=>{
                return item.group_name.toLowerCase().includes(group_name.toLowerCase());
            });
            setGroups(group);
        }
        else {
            setGroups(isGroups);
        }
    }
    return (
        <div className={style.middle}>
            <div className={style.chat_info}>
                <h4>{sidebar==="chat"?"Chats":"Groups"}</h4>
                <img src={CircleDashed} alt="no_image"/>

            </div>
            <div className={style.chat_search}>
                <img className={style.chat_search__search__icon} src={MagnifyingGlass} alt="no_image"/>
                <input onChange={(e)=>{SearchUser(e.target.value);SearchGroup(e.target.value)}} type="text" placeholder="Search"/>
                <img className={style.chat_search__funnel} src={FunnelSimple} alt="no_image"/>
            </div>
            <div className={style.arxive_section}>

                {/*<img src={ArchiveBox} alt="no_image"/>*/}
                {sidebar==="chat"?<h4>Archived Chats</h4>:

                    <Button type="primary" onClick={()=>{openCreateGroup()}} >Create Group</Button>
                }
            </div>
            <div className={style.chats_box}>
                <h4>All {sidebar==="chat"? "Chats":"Groups"}</h4>
                <div className={style.all_message}>
                    {sidebar==="chat"?isSearchChatUsers.map((item,index)=>{
                            return(
                                <Link to={`/telegram/${item.chat_room_id}`}>
                                    <div style={{backgroundColor: +value.id===item.chat_room_id ? "#AFBBF7" :"#fff"}}  key={index} className={style.chat_message}>
                                        <div  className={style.chat_message__image}>
                                            <img src={`http://127.0.0.1:8000${item.user_image}`} alt="user1"/>
                                            {item.online?<div className={style.circle__online}></div>:''}
                                        </div>

                                        <div className={style.chat_message_info}>
                                            <p>{item.username}</p>
                                            <span>{item.last_message}</span>
                                        </div>
                                        <div className={style.chat_message_time}>
                                            <p>{item.last_message_time}</p>
                                            <span>{item.unread_message}</span>

                                        </div>
                                     </div>
                                </Link>
                            )
                        }):
                        isSearchGroupsUsers.map((item,index)=>{
                                return(
                                    <Link to={`/telegram/${item.group_chat_id}`}> <div
                                        style={{backgroundColor: +value.id===item.group_chat_id ? "#AFBBF7" :"#fff"}}
                                        key={index} className={style.chat_message}>
                                        <div className={style.chat_message__image}>
                                            <img src={`http://127.0.0.1:8000${item.group_image}`} alt="user1"/>
                                        </div>

                                        <div className={style.chat_message_info}>
                                            <p>{item.group_name}</p>
                                            <span>{item.last_message}</span>
                                        </div>
                                        <div className={style.chat_message_time}>
                                            <p>{item.last_message_time}</p>
                                            <span>{item.unread_message}</span>

                                        </div>
                                    </div>
                                    </Link>
                                )
                            })
                    }





                </div>
            </div>

        </div>
    )
}