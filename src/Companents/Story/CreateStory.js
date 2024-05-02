import '../assistents/css/createstory.css'
import { useState  } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MentionedUser from "../NeedCompanents/Mentioned";
import ImgCrop from 'antd-img-crop';
import {Upload} from "antd";
export default function CreateStory(){
    const [isFile,setFile]  = useState();
    const[isMentioned,setMentioned] = useState([]);
    const [isCaption,setCaption] = useState(null);
    function GetInfo(){

        const formData = new FormData();
        formData.set('image',isFile);
        formData.set('title',isCaption);
        formData.set('users',isMentioned);

        axios.post('http://127.0.0.1:8000/api/users/story/create/',
            formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(data=>{
            console.log(data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function ClikFile () {
        const inputFile = document.querySelector('#file');
        inputFile.click();
    }
    
    const FileGet =(event)=> {
        setFile(event.target.files[0])
        const imgArea = document.querySelector('.img-area');
        const image = event.target.files[0];
        if(image.size < 20000000) {
            const reader = new FileReader();
            reader.onload = ()=> {
                const allImg = imgArea.querySelectorAll('img');
                allImg.forEach(item=> item.remove());
                const imgUrl = reader.result;
                const img = document.createElement('img');
                img.src = imgUrl;
                imgArea.appendChild(img);
                imgArea.classList.add('active');
                imgArea.dataset.img = image.name;
            }
            reader.readAsDataURL(image);
        } else {
            alert("Image size more than 20MB");
        }
    }
    const get_value = (e) => {
        let users_id = [];
        e.map((item)=>{
            users_id.push(item.value);
        })
        setMentioned(users_id);
    }
    return(
        <div className="newcontainer">
            <Link to={`/feed/`} className="back-icon"><i className="fas fa-arrow-left"></i></Link>
            <h3 style={{textAlign: 'center'}}>Create Story</h3>

            <input onChange={FileGet} type="file" id="file" accept="image/*" hidden/>
                    <div className="img-area" data-img="">
                        <i className='bx bxs-cloud-upload icon'></i>
                        <h3>Upload Image</h3>
                        <p>Image size must be less than <span>2MB</span></p>
                    </div>

            <button onClick={ClikFile} className="select-image">Select Image</button>
            <br/>
            <textarea placeholder="Descreption your story" className="caption" rows={10}
                      style={{border: "solid 1px black", width: "100%"}}
                      onChange={(e) => {
                          setCaption(e.target.value)
                      }}

            ></textarea>
            <MentionedUser get_value={get_value}/>

            <button style={{marginTop: "15px"}} onClick={GetInfo} className="select-image">Create Story</button>
        </div>
    )
}