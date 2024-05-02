
import notification_toast_style from "../css/notificationtoast.module.css";

export default function NotificationToast(props){
    const {user_image,text,date,username}=props;

    return(
        <><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"></link>
            <div className={notification_toast_style.notification_toast}>

                <button className={notification_toast_style.toast_close_btn}>
                    <ion-icon name="close-outline"></ion-icon>
                </button>

                <div className={notification_toast_style.toast_banner}>
                    <img className={notification_toast_style.toast_banner_img}
                         src={`http://127.0.0.1:8000${user_image}`} alt="Rose Gold Earrings" width="80"
                         height="70"/>
                </div>

                <div className={notification_toast_style.toast_detail}>

                    <p className={notification_toast_style.toast_message}>
                        {text}
                    </p>

                    <p className={notification_toast_style.toast_title}>
                        {username}
                    </p>

                    <p className={notification_toast_style.toast_meta}>
                        <time dateTime="PT2M">{date}</time>

                    </p>

                </div>

            </div>
        </>
    )
}