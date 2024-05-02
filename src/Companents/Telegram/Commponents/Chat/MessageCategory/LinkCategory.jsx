import style from "../../../assistents/css/core_style.module.css";

export default function LinkCategory(props){
    const {is_message_type} = props;
    return (
        <div style={{display: is_message_type === 'link' ? "block" : "none"}} className={style.link}>
            <p className={style.time}>27th Oct 22</p>
            <div className={style.link_list}>
                <div className={style.link_box}>
                    <div className={style.link_icon}>
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className={style.link_detail}>
                        <p>https://codingmonk.in/blogs</p>
                        <span>codingmonk.in</span>
                    </div>
                </div>
                <div className={style.link_box}>
                    <div className={style.link_icon}>
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className={style.link_detail}>
                        <p>https://codingmonk.in/blogs</p>
                        <span>codingmonk.in</span>
                    </div>
                </div>
                <div className={style.link_box}>
                    <div className={style.link_icon}>
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className={style.link_detail}>
                        <p>https://codingmonk.in/blogs</p>
                        <span>codingmonk.in</span>
                    </div>
                </div>
                <div className={style.link_box}>
                    <div className={style.link_icon}>
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className={style.link_detail}>
                        <p>https://codingmonk.in/blogs</p>
                        <span>codingmonk.in</span>
                    </div>
                </div>
                <div className={style.link_box}>
                    <div className={style.link_icon}>
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className={style.link_detail}>
                        <p>https://codingmonk.in/blogs</p>
                        <span>codingmonk.in</span>
                    </div>
                </div>
                <div className={style.link_box}>
                    <div className={style.link_icon}>
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className={style.link_detail}>
                        <p>https://codingmonk.in/blogs</p>
                        <span>codingmonk.in</span>
                    </div>
                </div>
            </div>
        </div>
    )
}