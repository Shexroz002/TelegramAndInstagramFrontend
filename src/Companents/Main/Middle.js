import '../style.css'
import rsa from "../assistents/images/profile-14.jpg"
import Story from '../Story/Story'
import Feeds from '../Post/Feeds'
export default function Middle() {
    return (
        <div className="middle">
            <Story/>
            <div className="create-post">
                <div className="profile-photo">
                    <img src={rsa} alt="" />
                </div>
                <button type="submit"  className="btn btn-primary"  >Post</button>
            </div>
            <Feeds/>
        </div>

    )
}