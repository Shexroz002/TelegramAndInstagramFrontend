import {Modal} from "antd";
import {useState} from "react";
import axios from "axios";

export default function GroupEdit(props){
    const{isOpen,openModal,chat_room_id,sidebar,group_name}=props;
    const[is_image,setImage]=useState(null);
    const[is_name,setName]=useState(null);
    function update_group(){
        const form_data=new FormData();
        if(is_image!==null){
            form_data.append("group_image",is_image);
        }
        if(is_name!==null){
            form_data.append("group_name",is_name);
        }
        console.log(is_image,is_name);
        if(is_image!==null || is_name!==null){
            axios({
                url:`http://127.0.0.1:8000/api/chat/group/chat/edit/${chat_room_id}`,
                method:"PUT",
                data:form_data,
                headers:{ Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then((response)=>{
                openModal();
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            console.log("No changes")
        }
    }
    return (
        <>

            <Modal title="About Group"
                   open={isOpen}
                   okText={"Update"}
                   cancelText={"Cancel"}
                   closable={false}
                   onOk={()=>{update_group()}}
                     onCancel={openModal}
            >
               <div style={{
                     display: "flex",
                     flexDirection: "column",
                     gap: "10px"

               }}>
                   <div style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px"

                   }}>
                       <h2 style={{
                            color: "black",
                           fontSize: "20px",
                           fontWeight: "bold",
                            marginBottom: "10px"
                       }}>Change Group Image</h2>
                       <input type="file" style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc"

                       }} onChange={
                            (e)=>{
                                 setImage(e.target.files[0]);
                            }
                       }/>
                   </div>
                     <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px"
                     }}>
                          <h2 style={{
                            color: "black",
                           fontSize: "20px",
                           fontWeight: "bold",
                            marginBottom: "10px"

                          }}>Change Group Name</h2>
                          <input type="text" defaultValue={group_name} style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc"
                          }}
                                 onChange={
                               (e)=>{
                                    setName(e.target.value);
                               }
                          }
                          />
                     </div>
               </div>
            </Modal>
        </>
    );
}