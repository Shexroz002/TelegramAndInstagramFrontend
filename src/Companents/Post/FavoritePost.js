import axios from "axios";
import {useEffect, useState} from "react";
import Feed from "./Feed";
import {Link} from "react-router-dom";

export default function FavoritePost(){
    const [isPosts,setPosts]=useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/posts/saved/post/all',{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(data=>{
            console.log(data,'Feed')
            setPosts(data.data)
        })
        .catch(error=>{
            console.log(error)
        })

    },[])
    function delete_post(post_id){
        setPosts(prev=>{
            return prev.filter(item => item.id !== post_id)
    })
    }

    return(
        <>
         <main >
        <div className="container">
            <div className="left"></div>
            <div className="middle">
            <Link to={`/feed/`} className="back-icon" ><i className="fas fa-arrow-left"></i></Link>

                <form className="create-post">
                   <h2>Your fovarite posts</h2>
                </form>

                <div className="feeds">
                {isPosts.length ? isPosts.map((item) =>(
            <Feed
            status = 'favorite'  
            key={item.id}
            id={item.id}
            username={item.username}
            user_image={item.user_image}
            post_image={item.post_image}
            post_title={item.title}
            create_by = {'asd'}
            like = {item.liked}
            delete_post = {delete_post}
            userid = {item.user_id}
            favorite_post = {true}

            />
        )

       )   : ''}
                </div>
            </div>

            <div className="right"> </div>
        </div>
    </main>
        </>
    )
}