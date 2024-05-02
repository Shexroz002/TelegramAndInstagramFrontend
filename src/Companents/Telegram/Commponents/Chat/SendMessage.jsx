import style from "../../assistents/css/core_style.module.css";
import Link from "../../assistents/images/icons/Link.svg";
import TelegramLogo from "../../assistents/images/icons/TelegramLogo.svg";
import {useState,useEffect} from "react";
import { Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import axios from "axios";
export default function SendMessage(props){
    const {chat_room_id,sidebar}=props;
    const[voicestart,setVoiceStart] = useState(true);
    const [videostart,setVideoStart] = useState(true);
    const [message,setMessage] = useState('');
    const [isTyping,setIsTyping] = useState(false);
    const[isFile,setIsFile] = useState(null);
    const[message_type,setMessageType] = useState("text");
    const [is_sendfile, setSendFile] = useState(false);
    const [voice,set_Voice] = useState(null);
    const [video,set_Video] = useState(null);
    const uploadFile=(e)=>{
        const file_type = e.target.files[0].name?.split('.')[1];
        let message_type = '';
        if(file_type === 'jpg' || file_type === 'png' || file_type === 'jpeg'){
            message_type = 'image';
        }
        else if(file_type === 'mp4' || file_type === 'avi' || file_type === 'mkv'){
            message_type = 'video';
        }
        else if(file_type === 'mp3' || file_type === 'wav' || file_type === 'flac'){
            message_type = 'audio';
        }
        else if(file_type === 'docx'){
            message_type = 'word';
        }
        else if(file_type === 'pdf'){
            message_type = 'pdf';
        }
        else if(file_type === 'pptx'){
            message_type = 'ppt';
        }
        else if(file_type === 'xlsx'){
            message_type = 'excel';
        }
        else{
            alert('This file type is not supported');
        }
        setMessageType(message_type);
        setIsFile(e.target.files[0]);

    }
    const sendMessageByText = () => {
        const formData = new FormData();
        if(message){
            formData.append('message_text', message);
            formData.append('message_type', message_type);
            axios.post(`http://127.0.0.1:8000/api/chat/room/${sidebar}/message/create/${chat_room_id}`,
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then(data=>{
                    setMessage('')
                    let input = document.getElementById('get_value');
                    input.value = '';
                })
                .catch(error=>{
                    console.log(error)
                })
        }

    }
    const sendMessageByFile = () => {
        const formData = new FormData();
        if(isFile){
            formData.append('message_file', isFile);
            formData.append('message_type', message_type);
            axios.post(`http://127.0.0.1:8000/api/chat/room/${sidebar}/message/create/${chat_room_id}`,
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then(data=>{
                    setSendFile(false)
                })
                .catch(error=>{
                    console.log(error)
                })
        }

    }
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [chunks, setChunks] = useState([]);
    const [recordingVideo, setRecordingVideo] = useState(false);
    const [mediaRecorderVideo, setMediaRecorderVideo] = useState(null);


    function startRecordingVideo(){
        navigator.mediaDevices.getUserMedia({video: true, audio: true })
            .then(function(stream) {
                const recorder = new MediaRecorder(stream,{ mimeType: 'video/webm' });
                setMediaRecorderVideo(recorder);
                setRecordingVideo(true);
                const chunks = [];

                recorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                };

                recorder.onstop = function() {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const recordedData = blob // Blob data representing the recorded voice
                    const fileName = "voice_messae.webm"; // Generate a unique file name

                    const file = new File([recordedData], fileName, { type: recordedData.type });
                    set_Video(file)

                };

                recorder.start();
                console.log('Recording started...');
            })
            .catch(function(error) {
                console.error('Error accessing microphone:', error);
            });
    };

    function stopRecordingVideo(){
        if (mediaRecorderVideo) {
            mediaRecorderVideo.stop();
            setRecordingVideo(false);
            console.log('Recording stopped...');
        }
    };

    function startRecording(){
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                const chunks = [];

                recorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                };

                recorder.onstop = function() {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const recordedData = blob // Blob data representing the recorded voice
                    const fileName = "voice_messae.webm"; // Generate a unique file name

                    const file = new File([recordedData], fileName, { type: recordedData.type });
                    set_Voice(file)

                };

                recorder.start();
                console.log('Recording started...');
            })
            .catch(function(error) {
                console.error('Error accessing microphone:', error);
            });
    };

    function stopRecording(){
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('Recording stopped...byshexroz')

        }


    };
    useEffect(()=>{
        if(voice){
            const formData = new FormData();
            formData.append('message_file', voice);
            formData.append('message_type', 'voice');
            axios.post(`http://127.0.0.1:8000/api/chat/room/${sidebar}/message/create/${chat_room_id}`,
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then(data=>{
                    // setSendFile(false)
                })
                .catch(error=>{
                    console.log(error)
                })
        }

    },[voice])
    useEffect(()=>{
        if(video){

            const formData = new FormData();
            formData.append('message_file', video);
            formData.append('message_type', 'video');
            axios.post(`http://127.0.0.1:8000/api/chat/room/${sidebar}/message/create/${chat_room_id}`,
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then(data=>{
                    // setSendFile(false)
                })
                .catch(error=>{
                    console.log(error)
                })
        }

    },[video])
    useEffect(()=>{
        if(message){

            setIsTyping(true)
        }
         else{
            setIsTyping(false)
        }
        },[message])
useEffect(()=>{
    axios.post(`http://127.0.0.1:8000/api/chat/user/${sidebar}/typing/${chat_room_id}`,{"is_typing":`${isTyping}`},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(data=>{
            console.log(data)
        })
        .catch(error=>{
            console.log(error)
        })


    },[isTyping,sidebar,chat_room_id])
    return (
        <>
        <div className={style.message_form}>
            <div className={style.message_form__input}>
                <img onClick={() => {
                    setSendFile(true)
                }} src={Link} alt="Link"/>
                <input defaultValue={message} id="get_value" onChange={(e) => {
                    setMessage(e.target.value)
                }} type="text" placeholder="Write a message"/>
                {
                    voicestart ?
                        <i onClick={()=>{setVoiceStart(prevState => !prevState);
                            startRecording()}}
                           className="bi bi-mic"></i> :
                        <i onClick={()=>{setVoiceStart(prevState => !prevState);
                            stopRecording()}}
                           style={{color: "red"}} className="bi bi-mic-mute"></i>
                }
                {
                    videostart ?
                        <i onClick={()=>{setVideoStart(prevState => !prevState);
                            startRecordingVideo()}}
                           className="bi bi-camera-video"></i> :
                        <i onClick={()=>{setVideoStart(prevState => !prevState);stopRecordingVideo()}}
                           style={{color:"red"}} className="bi bi-camera-video-off"></i>
                }

                <i className="bi bi-emoji-smile"></i>
            </div>
            <div onClick={() =>{sendMessageByText()}} className={style.message_form__send}>
                <img src={TelegramLogo} alt="Link"/>
            </div>
        </div>
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={is_sendfile}
                onOk={() => sendMessageByFile() }
                onCancel={() => setSendFile(false)}
            >
                <input type={"file"} onChange={uploadFile} />
                    <Button icon={<UploadOutlined />}>Upload</Button>

            </Modal>

</>
    )
}