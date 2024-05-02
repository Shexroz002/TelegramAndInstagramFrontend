import {Modal} from "antd";
import React from "react";
import axios from "axios";

export default function DeleteGroup(props) {
    const {delete_group, handleDelete,chat_room_id} = props;
    function deleteGroup(){
        axios({
            url:`http://127.0.0.1:8000/api/chat/group/chat/edit/${chat_room_id}`,
            method:"DELETE",
            headers:{ Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response)=>{
            handleDelete();
        }).catch((error)=>{
            handleDelete();
        })
    }

    return (
        <Modal title="Delete Group" open={delete_group} okText={"Delete"} cancelText={"Cancel"}
               onCancel={handleDelete} onOk={deleteGroup}
               closable={false}>
            <p>Are you sure you want to delete this group?</p>

        </Modal>
    )
}