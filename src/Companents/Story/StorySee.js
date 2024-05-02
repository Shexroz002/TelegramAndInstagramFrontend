import '../assistents/css/storysee.css';
import { Carousel } from 'antd';
import axios from "axios";
import {useState} from "react";
export default function StorySee(props){
    const{showStorys,user_all_story,seen_story} = props;
    const [story_detail,setStoryId]= useState(user_all_story)

    function likeStory(story_id,index){
        console.log(index,"index")
        axios.get(`http://127.0.0.1:8000/api/users/story/like/${story_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.data.status === true) {

                setStoryId((prev)=>{
                    prev[index].liked = true
                    return [...prev]
                })
            } else {
                setStoryId((prev)=>{
                    prev[index].liked = false
                    return [...prev]
                })

            }


            // user_all_story[index].liked = true
        }).catch(error => {
            console.log(error)
        })

    }

    return(
        <section className="modalall containerall" id='modalsection' >


            <div className="modal__container show-modal" id="modal-container">

                    <div className="modal__content">
                        <div onClick={() => {
                            showStorys()
                        }} className="modal__close close-modal" title="Close">
                            <i className='bx bx-x'></i>
                        </div>
                        <Carousel autoplay autoplaySpeed={3000} dotPosition={'top'} afterChange={(e) => {
                            seen_story(story_detail[e]?.story_data?.id)
                        }}>
                            {story_detail.map((item, index) => (
                                <>

                                    <div  key={index}>
                                        <img  src={`http://127.0.0.1:8000${item?.story_data?.story?.image}`} alt="no_image"
                                             className="modal__img"/>
                                        {/*<h1 className="modal__title"></h1>*/}
                                        <p className="modal__description">{item?.story_data?.story.title}</p>
                                        <span className="like">
                                Like this story
                                            {item?.liked === true ?
                                                <i onClick={() => {
                                                    likeStory(item?.story_data?.id,index)
                                                }} style={{color: 'red', fontSize: "25px", marginRight: "5px"}}
                                                   className="bi bi-heart-fill"></i> :
                                                <i onClick={() => {
                                                    likeStory(item?.story_data?.id,index)
                                                }} style={{color: 'red', fontSize: "25px", marginRight: "5px"}}
                                                   className="bi bi-heart"></i>
                                            }
            </span>
                                    </div>
                                </>
                            ))}
                        </Carousel>
                    </div>


            </div>
        </section>

    )
}