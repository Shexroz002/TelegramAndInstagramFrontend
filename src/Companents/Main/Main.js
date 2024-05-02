import Left from "./Left"
import Middle from "./Middle"
import Right from "./Right"
import '../style.css'
import NotificationToast from "../Notifications/NotificationType/NotificationToast";
import {useEffect, useState} from "react";
export default function Main(props){
    const [is_data, setData] = useState([]);
    const [first_notification, SetFirstNotification] = useState([]);
    const [is_show, setShow] = useState(null);
    const {opentheme} = props;

    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/notifications/user?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                console.log(is_data)
                SetFirstNotification(prev=>[...prev,data.data]);

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
    return(
        <main>
        <div className="container">
            <Left openshow={opentheme}/>
            <Middle/>
            <Right/>
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
        </div> 
        </main>
    )
}