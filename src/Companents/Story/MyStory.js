import '../assistents/css/storysee.css'
import { useState,useEffect } from 'react';
import rsa from "../assistents/images/profile-14.jpg"
import UsersSeenMyStory from './UsersSeenMySrory'
export default function MyStory(props){
    const {showMyStorys,ismystory,isSeen_user,isLoad} = props;
    const[iscount ,setcount] = useState(30);

    useEffect(() => {
        const timer = setTimeout(() => {

            if (iscount > 0) {
                setcount(prev => prev - 1);
            }
            if (iscount === 1) {
                showMyStorys()
                console.log('done')

            }


        }, 1000);



        if (iscount === 0) {
            clearTimeout(timer);

        }

    }, [iscount]);
    return(
<>
<section className="modalsection" id='modalsection'>
            
           { !ismystory ?
            <div className="modal__container show-modal" id="modal-container">
                <div className="modal__content">
                    <div className="modal__close close-modal" title="Close">
                        <i onClick={()=>{showMyStorys()}}  className='bx bx-x'></i>
                    </div>

                    <img src={rsa} alt="noimag3e" className="modal__img"/>

                    

                    
                </div>
            </div> :
            
            <div className="modal__container show-modal" id="modal-container">
                <div className="modal__content">
                    <div className="modal__close close-modal" title="Close">
                        <i onClick={() => {
                            showMyStorys()
                        }} className='bx bx-x'></i>
                    </div>

                    <img src={`http://127.0.0.1:8000${ismystory.story.image}`} alt="noimage" className="modal__img"/>

                    <h1 className="modal__title">{iscount}</h1>
                    <p className="modal__description">{ismystory.story.title}</p>
                    {/*<button className="modal__button modal__button-width">*/}
                    {/*           {iscount}*/}
                    {/*       </button>*/}
                    <p className="modal__description"> Users seen by<b> {isSeen_user.length} </b>
                    </p>
                    <p className="modal__description">Like<b> {ismystory.story_detail.likes} </b></p>
                    {!isLoad ? <div className="users-list">
                        {isSeen_user.length ?
                            isSeen_user.map(item => (
                                <>
                                    <UsersSeenMyStory userimage={item.user_image} username={item.username} id={item.id}
                                                      like={ismystory.likes.includes(item.id)}/>

                                </>
                            ))
                            : <h1>No Views</h1>


                        }

                    </div> : ''}
                </div>
            </div>

           }
</section>


</>
    )
}