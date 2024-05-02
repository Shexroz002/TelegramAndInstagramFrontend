import style from './assistents/css/core_style.module.css';
import SideBar from "./Commponents/SideBar";
import Middle from "./Commponents/Middle";
import DefaultRight from "./Commponents/DefaultRight";
import MainChat from "./Commponents/Chat/MainChat";
import ExtraRight from "./Commponents/ExtraRight";
import CreateGroup from "./Commponents/CreateGroup";
import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import {ToastContainer} from "react-toastify";


export default function MainTelegram(){
    const value = useParams();
    const [sidebar,setSidebar]=useState("chat")
    const [iscreateGroup, setCreateGroup] = useState(false);
    const [is_show_extra_right,setExtraRight] = useState(false);
    function showExtraRight(){
        setExtraRight(prevState => !prevState)
    }
    function openCreateGroup(){
        setCreateGroup(prevState => !prevState);
    }
    function change_sidebar(value){
        setSidebar(value)
    }
    return(
        <>
        <div className={style.container}>
            {/*<!----------------------------------SideBar----------------------------------------->*/}
           <SideBar sidebar={sidebar} change_sidebar={change_sidebar}/>
            {/*<!----------------------------------Middle----------------------------------------->*/}
            <Middle sidebar={sidebar} openCreateGroup={openCreateGroup} iscreateGroup={iscreateGroup} />

            {/*<!----------------------------------Right----------------------------------------->*/}
            <div className={style.right}>
                { +value.id ===0 ? <DefaultRight id={value.id}/> : <MainChat sidebar={sidebar} showExtraRight={showExtraRight}/>}
                {/*<DefaultRight/>*/}

            </div>
            <ExtraRight sidebar={sidebar} show = {is_show_extra_right} showExtraRight={showExtraRight}/>
        </div>
            <CreateGroup openGroup={openCreateGroup} status={iscreateGroup} />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </>
    )
}