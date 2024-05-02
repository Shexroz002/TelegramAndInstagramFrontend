import React from 'react';
import 'video-react/dist/video-react.css';
import { Player, ControlBar } from 'video-react';

const VideoPlayer = (props)=> {
    const {image} = props;
    return (
        <div style={{width:"600px"}}>
            <h1>Video Player</h1>
        <Player autoPlay
                poster={image}
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
            <ControlBar autoHide={false} autoHideTime={false} className="my-class" />
        </Player>
        </div>
    );
};
export default VideoPlayer;