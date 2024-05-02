import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Carousel } from 'antd';
import './Companents/assistents/css/storysee.css';
const VideoCard = () => {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    return (
        <>
        <Button type="primary" onClick={() => setModal2Open(true)}>
            Vertically centered modal dialog
        </Button>
    <Modal
        title="Storis"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        width={600}
        height={600}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
    >
        <Carousel autoplay autoplaySpeed={10000} dotPosition={'top'} style={{color:'black',background:"black"}}>

            <div>
                <video style={{width: "100%", height: "400px"}} controls>
                    <source
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div>
                <video style={{width: "100%", height: "400px"}} controls>
                    <source
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <i style={{
                    color: 'red',
                    fontSize: "25px",
                    marginRight: "5px",
                    position: "relative",
                    left: "500px"
                }}
                   className="bi bi-heart-fill"></i>
            </div>
            <div>
                <img
                    style={{width: "100%", height: "400px"}}
                    src="http://127.0.0.1:8000/media/user_images/photo_2024-01-26_16-57-26_Xi0XkdT.jpg"/>
                <i style={{
                    color: 'red',
                    fontSize: "25px",
                    marginRight: "5px",
                    position: "relative",

                    left: "500px"
                }}
                   className="bi bi-heart"></i>
            </div>

        </Carousel>


    </Modal></>

    );
};

export default VideoCard;
