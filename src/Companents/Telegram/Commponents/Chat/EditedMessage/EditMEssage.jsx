import TextArea from "antd/es/input/TextArea";
import {Modal} from "antd";

export default function EditMessage(props) {
    const {open, setEditMessage, actionMessage, send_update_message, setActionMessage} = props;
    console.log(actionMessage)
    return (
        <Modal
            title="Edit Message"
            centered
            open={open}
            okText={"Yes"}
            cancelText={"No"}
            onOk={()=>send_update_message()}
            onCancel={()=>setEditMessage(false)}
            okButtonProps={{ style: { backgroundColor: 'blue' ,color:"white"} }}>
            <TextArea
                id="edit_message"
                value={actionMessage?.message}
                onChange={(e)=> {
                    setActionMessage({...actionMessage, message: e.target.value})
                }}
                // placeholder="Edit Message"
                autoSize={{ minRows: 3, maxRows: 5 }}

            />


        </Modal>
    )
}