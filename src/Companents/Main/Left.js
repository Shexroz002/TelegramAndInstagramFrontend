import Profile from '../Users/Profile';
import { Link } from 'react-router-dom';
// import Notification from '../Notifications/Notification';
import '../style.css';
import {useEffect} from "react";
import { useState } from 'react';
export default function Left(props){
    const [is_data, setCount] = useState(0);
    const {openshow}=props;
    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/notifications/count?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                console.log('data',data.data)
                setCount(data.data);

            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            socket.close();
        };
    }, []);
    function notificationfunc(){
        const messageNotification = document.querySelector('#message-notification');
        const messages = document.querySelector('.messages');
        messages.style.boxShadow = '0 0 1rem var(--color-primary)';
        messageNotification.querySelector('.notification-count').style.display = 'none';
        setTimeout(() => {
            messages.style.boxShadow = 'none';
        }, 2000);
    }

    const changeActiveItem = () => {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
        })
    };
    const MenuItemsFun =(e)=>{
        let item = e.target;
        if( ('menu-item' === item.classList[0])){
            changeActiveItem()
            item.classList.add('active');

            if(item.id === 'theme'){
                openshow()
            }
        }
        
    }

    return(
        <div className="left" >
        <Profile/>

        <div className="sidebar">
            <p onClick={MenuItemsFun}  className="menu-item active">
                <span><i className="uil uil-home"></i></span><h3>Home</h3>
            </p>
            {/* <p onClick={MenuItemsFun} className="menu-item">
                <span><i className="uil uil-compass"></i></span><h3>Explore</h3>
            </p> */}
            <Link to='/notification/'> <p onClick={MenuItemsFun} className="menu-item" id="notification">
                <span><i className="uil uil-bell"><small className="notification-count">+{is_data}</small></i></span><h3>Notifications</h3>
            </p></Link>
            <Link to='/telegram/0'> <p onClick={MenuItemsFun} className="menu-item" id="message-notification">
                <span onClick={notificationfunc}><i className="uil uil-envelope-alt"><small className="notification-count">6</small></i></span><h3>Messages</h3>
            </p></Link>
            <Link to='/favorite/post'><p onClick={MenuItemsFun} className="menu-item">
                <span><i className="uil uil-bookmark"></i></span><h3>Bookmarks</h3>
            </p></Link>
            {/*<Link to='/statistic/'><p onClick={MenuItemsFun} className="menu-item">*/}
            {/*    <span><i className="uil uil-chart-line"></i></span><h3>Statistic</h3>*/}
            {/*</p></Link>*/}
            <p onClick={MenuItemsFun} className="menu-item" id="theme">
                <span><i className="uil uil-palette"></i></span><h3>Theme</h3>
            </p>
            <Link to='/post/search/'><p onClick={MenuItemsFun} className="menu-item">
                <span><i className="uil uil-book"></i></span><h3>Search Post</h3>
            </p></Link>
        </div>

        <Link to='/createpost/'><label form="create-post" className="btn btn-primary">Create Post</label></Link>
    </div>
    )
}