import deletePost from "../logic/deletePost.js";
import likeAPost from "../logic/likeAPost.js";
import savePostInUser from "../logic/savePostInUser.js";
import hideAPost from "../logic/hideAPost.js";
import { context } from "../ui.js";
import { useContext } from "react";
import Context from "../Context.js";


export default function Post(props) {
    //destructuring de props, para no hacer todo el tiempo props.post.userName
    const { post, user } = props

    const {alert, freeze, unFreeze} = useContext(Context)
    function openEditPostModal() {
        props.onEditPostButton(props.post.id);
    }

    function handleHeartClick() {
        try {
            freeze()
            likeAPost(context.userId, post, error => {
                unFreeze()
                if (error) {
                    alert(error.message)
                    return
                }

                props.onLikeClick();
            })
        } catch (error) {
            alert(error.message)
        }
    }
    function handleDeleteClick() {
        try {

            deletePost(context.userId, post.id, error => {
                if (error) {
                    alert(error.message)
                    return;
                }
                props.onDeleteClick();
            });

        } catch (error) {
            alert(error.message)
        }
    }

    function handleSavePostClick() {
        freeze()
        try {
            savePostInUser(context.userId, post, (error) => {
                unFreeze()
                if (error) {
                    alert(error.message)
                    return
                }
                props.OnSavedPostClick();
            });
        } catch (error) {
            alert(error.message)
        }
    }

    function handleHidePostClick() {
        freeze()
        try {
            hideAPost(context.userId, post, error => {
                unFreeze()
                if (error) {
                    alert(error.message)
                    return
                }
                props.onHidenPostClick();
            })
        } catch (error) {
            alert(error.message)
        }
    }

    console.log("Post -> render")

    return <article>
        <div className="home-post-content-article-box">
            <img className="home-post-content-article-avatar" src={post.author.avatar} />
            <p className="home-post-content-article-userName">{post.userName}</p>
        </div>

        {post.author.id === context.userId ? <span className="material-symbols-rounded lockimg" onClick={handleHidePostClick}>
            {post.visibility === "public" ? "lock_open_right" : "lock"}
        </span> : null}

        {post.author.id === context.userId ? <span className="material-symbols-rounded bin" onClick={handleDeleteClick}>
            delete
        </span> : null}

        {post.author.id === context.userId ? <button className="home-edit-post-modal-button" onClick={openEditPostModal}>Edit</button> : null}
        <div className="post-image-container">
            <img className="home-post-content-article-img" src={post.image} />
        </div>
        <span className={post.likeCounter.includes(context.userId) ? "material-symbols-rounded material-symbols-rounded-liked" : "material-symbols-rounded"} onClick={handleHeartClick}>favorite</span>
        <p className="home-post-content-article-icon-text">{post.likeCounter.length} {post.likeCounter.length === 1 ? "like" : "likes"}</p>

        <button className="home-post-content-article-saved" onClick={handleSavePostClick}><span className={`material-symbols-rounded ${user.savedPosts.includes(post.id) ? "filled" : ""}`}>bookmark</span></button>

        <p className="home-post-content-article-text">{post.text}</p>
        <time className="home-post-content-article-date">{post.date.toLocaleString()}</time>
    </article>
}  