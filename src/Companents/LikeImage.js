export default function Likeimage(props){
    const {likeimage} = props;
    return(
        <>
        <span><img src={`http://127.0.0.1:8000${likeimage}`} alt="no photos" /></span>
        </>
    )
}