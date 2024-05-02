import '../style.css';
import { useState,useEffect } from "react";
import Feed from "./Feed";
export default function Feeds(){
    const [isPosts,setPosts]=useState([]);
    useEffect(() => {
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/posts/following/post?Bearer=${localStorage.getItem('token')}`);

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data.data);
            if (data.data) {
                setPosts(prev=>[...data.data]);

            }
        };

        socket.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    
return(
    <div className="feeds">    
        {isPosts.length ? isPosts.map((item) =>(
            <Feed  
            key={item.id}
            id={item.id}
            userid={item.author_id}
            username={item.author}
            user_image={item.author_image}
            post_image={item.post_image} 
            post_title={item.post_text}
            create_by = {item.post_date}
            like = {item.get_last_three_like_user_image_url}
            liked = {item.liked}
            saved = {item.saved}
            comment_count = {item.comments}
            comment={item?.last_comment.comment}
            comment_author={item?.last_comment.comment_author}


            />
        )

       )   : ''}
            </div>
)
}