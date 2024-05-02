export default function UsersSeenMyStory(props){
    const {username,userimage,like} = props;
    return(
        <>
        <p>
                          <div class="content">
                          <img src={`http://127.0.0.1:8000${userimage}`} alt=""/>
                              <div className="details">
                                  <span>{username}</span>
                                  {like ? <i style={{color: 'red'}} className="bi bi-heart-fill"></i> : ''}
                              </div>
                          </div>

        </p>
        </>
    )
}