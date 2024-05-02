import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'antd';
import { Avatar, List } from 'antd';
import {useNavigate} from "react-router-dom";
import GroupEdit from "./EditGroup";
import DeleteGroup from "./DeleteGroup";

export default function GroupDetail(props){
    const{status,openModal,sidebar,chat_room_id}=props;
    const[data,setUserInfo]=useState([]);
    const[update_group,setUpdateGroup]=useState(false);
    const[delete_group,setDeleteGroup]=useState(false);
    function handleDelete(){
        setDeleteGroup(prevState => !prevState);
    }
    function handleUpdate(){
        setUpdateGroup(prevState => !prevState);
    }
    let history = useNavigate();
    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/chat/room/${sidebar}/${chat_room_id}?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                setUserInfo(data.data);


            }
            else {
                history('/telegram/0')
            }

        };

        socket.onclose = () => {
            history('/telegram/0')
            console.log('WebSocket Client Closed');

        };

        return () => {
            socket.close();
        };
    }, [chat_room_id,sidebar]);


    return (
        <>

            <Modal title="About Group" open={status} okText={"Close"} onOk={() => {
                openModal()
            }}
                   cancelButtonProps={{style: {display: 'none'}}} closable={false}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '150px',
                    width: '100%',
                    backgroundColor: 'lightgray',
                    margin: 'auto'

                }}>
                    <img src={`http://127.0.0.1:8000${data.group_image}`}
                         style={{
                             width: '100px',
                             height: '100px',
                             borderRadius: '50%'
                         }}/>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        height: '150px',
                        width: '100%',
                        backgroundColor: 'lightgray',
                        margin: 'auto'

                    }}>
                        <h1 style={{
                            fontSize: '20px',
                            fontWeight: 'bold'

                        }}>{data.group_name}</h1>
                        <p>Created by <span style={{
                            color: 'blue',
                            fontWeight: 'bold'

                        }}>{data.author}</span></p>
                    </div>

                </div>
                {data.author_id === parseInt(localStorage.getItem('id')) ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginBottom: '10px',
                        marginTop: '10px'

                    }}>
                        <Button type="primary" onClick={()=>{handleUpdate();}}>Edit Group</Button>
                        <Button type="danger" onClick={()=>{openModal();handleDelete();}}>Delete Group</Button>
                    </div> : ''}


                <h1 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Members</h1>


                <List style={{overflowY: 'auto', height: '300px', overflowX: 'hidden'}}

                      itemLayout="horizontal"
                      dataSource={data.users}
                      renderItem={(item, index) => (
                          <>
                              <List.Item>
                                  <List.Item.Meta
                                      avatar={<Avatar src={`http://127.0.0.1:8000${item.image}`}/>}
                                      title={item.username}
                                      description={item.online_status}
                                  />
                              </List.Item>
                          </>
                      )}
                />
            </Modal>
            <GroupEdit
                isOpen={update_group}
                openModal={handleUpdate}
                sidebar={sidebar}
                chat_room_id={chat_room_id}
                group_name={data.group_name}
            />
            <DeleteGroup
                delete_group={delete_group}
                handleDelete={handleDelete}
                chat_room_id={chat_room_id}/>
        </>
    );
}