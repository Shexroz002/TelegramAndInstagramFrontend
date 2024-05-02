import style from "../assistents/css/core_style.module.css";
import MentionedUser from "../../NeedCompanents/Mentioned";
import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateGroup(props){
    const{openGroup,status}=props;
    const[is_group_name, set_group_name]=useState("");
    const[is_mentioned_user, set_mentioned_user]=useState([]);
    function get_value(value){
        let users_id = [];
        value.map((item)=>{
            users_id.push(item.value);
        })
        set_mentioned_user(users_id);
    }

    function create_group(){
        let data = {
            group_name:is_group_name,
            users:is_mentioned_user
        }
        if(is_group_name==="" || is_mentioned_user.length===0){
            alert("Please fill all fields")
            }
        else{
            axios.post("http://127.0.0.1:8000/api/chat/group/chat/create",data,{
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }
            })
                .then((response)=>{
                    toast.success(`${is_group_name} created!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    openGroup();
                })
                .catch((error)=>{
                    toast.info(`You should fill all fields!`, {
                        position: "top-centers",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }

    }

    return(
        <div className={style.create_group_box} style={{display:status ?'block':'none'}}>
            <div className={style.create_group}>
                <div className={style.create_group_info}>
                    <h2>Create New Group</h2>
                    <i onClick={()=>{openGroup()}} className="bi bi-x-circle-fill"></i>
                </div>
                <div className={style.form_group}>
                    <p>Name</p>
                    <input onChange={(e)=>{set_group_name(e.target.value)}} type="text" placeholder="Enter group name.."/>
                </div>
                <div style={{width:"65%",textAlign:"center",margin:"auto",marginTop:"20px"}}>
                    <MentionedUser get_value={get_value}/>
                </div>

                <button className={style.save_group} onClick={()=>{create_group()}} type="button">Create Group</button>
            </div>


        </div>
    )
}