import React, { useState } from 'react';
import {  Modal } from 'antd';
import MentionedUser from "./Mentioned";
import axios from "axios";

 export  default function ForwardPost (props){
    const {open,setModal,post_id} = props;
    const [mentioned,setMentioned] = useState([]);
    function sendPost(){
        let formData = new FormData();
        formData.append('post_id',post_id);
        formData.append('users',mentioned);
        axios.post('http://127.0.0.1:8000/api/chat/forward/post',
            formData,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(data=>{
                setModal(false);
            })
            .catch(error=>{
                console.log(error)
            })
    }
     const get_value = (e) => {
         let users_id = [];
         e.map((item)=>{
             users_id.push(item.value);
         })
         setMentioned(users_id);
     }

    return (
        <>
            <Modal
                title="Tag the friends you want to share the post with"
                okText={'Send Post'}
                centered
                open={open}
                onOk={() => sendPost()}
                onCancel={() => setModal(false)}
            >
                <MentionedUser get_value={get_value}/>
            </Modal>
        </>
    );
};

