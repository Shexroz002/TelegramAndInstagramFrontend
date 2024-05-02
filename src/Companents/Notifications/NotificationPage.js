// Code: NotificationPage.js
import {useEffect, useState} from "react";
import axios from "axios";
import style from './css/notification.module.css'
import Following from "./NotificationType/Following";
import Group from "./NotificationType/Group";
import Message from "./NotificationType/Message";
import Like from "./NotificationType/Like";
import Comment from "./NotificationType/Comment";
import NotificationStory from "./NotificationType/NotificationStory";
import NotificationToast from "./NotificationType/NotificationToast";
export default function NotificationPage(){
    const [is_load, setLoad] = useState(false);
    const [is_data, setData] = useState([]);
    const [first_notification, SetFirstNotification] = useState([]);
    const [is_show, setShow] = useState(null);



    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/notifications/',{
    //         headers:{
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         },
    //     })
    //         .then((data)=>{
    //             console.log(data.data)
    //             setData(data.data)
    //             setLoad(prev=>!prev)
    //         })
    //         .catch((error)=>{
    //             console.log(error)
    //         })
    // }, []);
    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/notifications/last/thirty/notification?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                console.log(is_data)
                setData(prev=>[...data.data]);

            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/notifications/user?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                SetFirstNotification(prev => [...prev, data.data]);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const notification = first_notification.pop();
            if (notification) {
                setShow(notification);
            } else {
                setShow(null);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [first_notification]);
    function markAllAsRead(){
        axios.get('http://127.0.0.1:8000/api/notifications/read/all/',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            })
            .then((data)=>{
                is_data.map((item)=>{
                    item.is_seen = true;
                })
                setData([...is_data])
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    function markAsRead(id){
        axios.get(`http://127.0.0.1:8000/api/notifications/read/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((data)=>{
             is_data.map((item)=>{
                 if(item.id === id){
                     item.is_seen = true;
                 }
             }
                )
                    setData([...is_data])
            })
            .catch((error)=>{

            })
        }

    return(
        <>

            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;800&display=swap"
                  rel="stylesheet"/>
            <div className={style.container}>
                <div className={style.app}>
                    <div className={style.header}>
                        <h2><span className={style.title}>Notifications</span> <span
                            className={style.unread_notification_number}>{is_data.length}</span></h2>
                        <p onClick={(e)=>{markAllAsRead()}}>Mark all as read</p>
                    </div>
                    <div className={style.body}>

                        {is_data.length ?
                            is_data.map((item)=>(
                                item.notification_type_int_to_str === 'FOLLOWING' ?
                                    <Following
                                        markAsRead={markAsRead}
                                        key={item.id}
                                        is_seen={item.is_seen}
                                        id={item.id}
                                        user={item.following_user}
                                        date={item.time_ago}
                                         />:

                                item.notification_type_int_to_str === 'GROUP' ?
                                    <Group
                                        markAsRead={markAsRead}
                                        key={item.id}
                                        is_seen={item.is_seen}
                                        id={item.id}
                                        date={item.time_ago}
                                        notification_group={item.notification_group} /> :

                                item.notification_type_int_to_str === 'CHAT' ?
                                    <Message
                                        markAsRead={markAsRead}
                                        key={item.id}
                                        is_seen={item.is_seen}
                                        id={item.id}
                                        date={item.time_ago}
                                        notification_chat={item.notification_chat} /> :
                                item.notification_type_int_to_str === 'LIKE' ?
                                    <Like
                                        markAsRead={markAsRead}
                                        key={item.id}
                                        is_seen={item.is_seen}
                                        id={item.id}
                                        date={item.time_ago}
                                        post_like={item.post_like} /> :
                                item.notification_type_int_to_str === 'COMMENT' ?
                                    <Comment
                                        markAsRead={markAsRead}
                                        key={item.id}
                                        is_seen={item.is_seen}
                                        id={item.id}
                                        date={item.time_ago}
                                        notification_comment={item.notification_comment} /> :
                                item.notification_type_int_to_str === 'STORY' ?
                                    <NotificationStory
                                        markAsRead={markAsRead}
                                        key={item.id}
                                        is_seen={item.is_seen}
                                        id={item.id}
                                        date={item.time_ago}
                                        notification_story={item.notification_story} /> :
                                    ''
                                    ))

                            :''}


                    </div>
                </div>
            </div>
            {is_show ?
                is_show.notification_type_int_to_str==="STORY" ?
                <NotificationToast
                    user_image={is_show.notification_story.user.user_image}
                    text = {`${is_show.notification_story.user.username} mentioned you her story`}
                    date = {is_show.time_ago}

                />
                :is_show.notification_type_int_to_str==="COMMENT" ?
                    <NotificationToast
                        user_image={is_show.notification_comment.user.user_image}
                        text = {`${is_show.notification_comment.user.username} mentioned you her story`}
                        date = {is_show.time_ago}

                    />
                :is_show.notification_type_int_to_str==="CHAT" ?
                    <NotificationToast
                        user_image={is_show.notification_chat.from_user.user_image}
                        text = {`${is_show.notification_chat.from_user.username} wrote you a message`}
                        date = {is_show.time_ago}

                    />
                :is_show.notification_type_int_to_str==="GROUP" ?
                    <NotificationToast
                        user_image={is_show.notification_group.get_last_added_user.user_image}
                        text = {`${is_show.notification_group.get_last_added_user.username} joined your group`}
                        date = {is_show.time_ago}

                    />

                :is_show.notification_type_int_to_str==="LIKE" ?
                    <NotificationToast
                        user_image={is_show.post_like.get_last_like_user.user_image}
                        text = {`${is_show.post_like.get_last_like_user.username} liked your post`}
                        date = {is_show.time_ago}


                    />
                    :is_show.notification_type_int_to_str==="FOLLOWING" ?
                        <NotificationToast
                            user_image={is_show.following_user.user_image}
                            text = {`${is_show.following_user.username} following you`}
                            date = {is_show.time_ago}

                        />

                    :"" :""}

        </>
    )
}