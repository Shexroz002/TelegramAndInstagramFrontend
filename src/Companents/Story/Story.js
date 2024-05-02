import StorySee from './StorySee';
import MyStory from './MyStory';
import '../style.css'
import axios from "axios";
import { useState , useEffect } from "react";
import VideoPlayer from "../../vides";


export default function Story(){
    const[isshow,setshow] = useState(false);
    const[all_user_story,setAllStory] = useState();
    const [isStory,setStory] = useState([])
    const [isload,setload] = useState(false)
    const [myStory,setStorys] = useState(false)
    const [ismyStory,setmyStory] = useState(false)
    const [isSeen_user,setSeenUser] = useState([]);
    const [ismystory,setmystory] = useState(null);
    const user_id = localStorage.getItem('id');
    const [isLoad,setLoad] = useState(false);

    // useEffect(()=>{
    //     axios.get(`https://mysocial.pythonanywhere.com/feeds/api/story/seen/personal/${user_id}`,
    //     {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    //     )
    //     .then(data=>{
    //         setmystory(data.data)
    //         setSeenUser(data.data.seen_user)
    //         setLoad((prev)=>!prev)
    //         console.log('personal',data.data)
    //     })
    // },[user_id])


    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/users/self/stories?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data.data);
            if ( !data.data.error){

                    setmystory(data.data)
                    setSeenUser(data.data.story_detail?.user_seen)
                    setStorys((prev)=>!prev)


            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/users/stories?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.data) {
                setStory(prev=>[...data.data]);
                console.log(data.data,"storys")

            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            socket.close();
        };
    }, []);
    
    
    function showStory(){
        setshow(prev=>!prev)
       
    }
    function showMyStory(){
        setmyStory(prev=>!prev)
       
    }
    function seenStory(id){
        axios.get(`http://127.0.0.1:8000/api/users/story/seen/${id}`,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
        )
        .then(data=>console.log(data.status))
        .catch(error=>console.log(error))
       
    }

    return(
        <>
         <div className="stories">
             {myStory ? <div className="story" onClick={() => {
                     showMyStory()
                 }} style={{backgroundImage: `url(http://127.0.0.1:8000${ismystory?.story?.image})`}}>
                     {/*<div className="profile-photo">*/}
                     {/*    /!*<img src='' alt="no" />*!/*/}
                     {/*</div>*/}
                     <p className="name">Your Story</p>
                 </div> :
                 <div className="story"  >

                     <p className="name">Your Story</p>
                 </div>
             }


             {isStory.length ?
                 isStory.map(item => (


                     <div onClick={() => {
                         showStory();
                         seenStory(item[0]?.story_data.id);
                         setAllStory(item)
                     }} className="story" style={{backgroundImage: `url(http://127.0.0.1:8000${item[0]?.story_data.story?.image})`}}>
                     <div className="profile-photo_story">
                        <img src={`http://127.0.0.1:8000${item[0]?.story_data.user.user_image}`} alt="no_image" />
                    </div>
                    <p className="name" style={{fontSize:'12px'}}>{item[0]?.story_data.user.username}</p>

                </div> 
             ))
                 : <h1>asd</h1>}
            {isshow ? <StorySee showStorys={showStory} user_all_story={all_user_story} seen_story={seenStory} /> : ''}
            {ismyStory ? <MyStory showMyStorys={showMyStory} isSeen_user ={isSeen_user}  ismystory={ismystory} isLoad={isLoad}  /> : ''}
            
            </div></>
    )
}