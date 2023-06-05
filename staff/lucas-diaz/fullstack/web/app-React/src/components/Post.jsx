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

    return <article className="home-post-content-article">
        <div className="flex basis-1/2 items-center gap-2">
            <img className="w-12 h-12 rounded-full m-2" src={post.author.avatar} />
            <p className="text-emerald-400 text-center">{post.userName}</p>
        </div>

        {post.author.id === context.userId ? <span className="material-symbols-rounded lockimg" onClick={handleHidePostClick}>
            {post.visibility === "public" ? "lock_open_right" : "lock"}
        </span> : null}

        {post.author.id === context.userId ? <span className="material-symbols-rounded bin" onClick={handleDeleteClick}>
            delete
        </span> : null}

        {post.author.id === context.userId ? <button className="edit-button" onClick={openEditPostModal}>Edit</button> : null}
        <div className="w-full flex relative pb-3-4">
            <img className="w-full h-full absolute object-contain" src={post.image} />
        </div>
        <span className={post.likeCounter.includes(context.userId) ? "material-symbols-rounded material-symbols-rounded-liked" : "material-symbols-rounded"} onClick={handleHeartClick}>favorite</span>
        <p className="self-center text-sm">{post.likeCounter.length} {post.likeCounter.length === 1 ? "like" : "likes"}</p>

        <button className="bg-transparent border-none basis-4/6 text-right" onClick={handleSavePostClick}><span className={`material-symbols-rounded ${user.savedPosts.includes(post.id) ? "filled" : ""}`}>bookmark</span></button>

        <p className="text-white text-sm basis-full text-left bg-zinc-800 p-1.5">{post.text}</p>
        <time className="basis-full text-right text-xs text-gray-500 pr-3 pb-2">{post.date.toLocaleString()}</time>
    </article>
}  