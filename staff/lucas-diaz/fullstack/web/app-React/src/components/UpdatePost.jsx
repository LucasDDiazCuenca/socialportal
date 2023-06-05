import { context } from "../ui";
import updatePost from "../logic/updatePost";
import retrievePostByPostId from "../logic/retrievePostByPostId";
import { useEffect, useState } from "react";
import Form from "./library/Form";


export default function UpdatePost({ postId, onUpdatedPost, onCancelClick }) {


    const [post, setPost] = useState()

    useEffect(() => {
        try {
            retrievePostByPostId(context.userId, postId, (error, post) => {
                if (error) {
                    alert(error.message);
                    return;
                }
                setPost(post)

            });
        } catch (error) {
            alert(error.message);
        }
    }, [])


    function handleUpdatePost(event) {
        event.preventDefault();
        try {
            let image = event.target.url.value
            let text = event.target.text.value
            updatePost(context.userId, postId, image, text, error => {
                if (error) {
                    alert(error.message);
                    return;
                }
                onUpdatedPost()
            });
        } catch (error) {
            alert(error.message);
        }
    }

    function handleCancelClick(event) {
        event.preventDefault();
        onCancelClick()
    }


    return <section className="home-edit-post-modal">
        <Form onSubmit={handleUpdatePost}>
            {post && <>
                <label htmlFor="url">Edit post:</label>
                <input type="url" className="form-post-url-input form-item text-black" name="url" defaultValue={post.image} />
                <input type="hidden" className="home-edit-hidden-input" name="postId" />
                <textarea className="text-black" name="text" cols="30" rows="5" defaultValue={post.text}></textarea>
            </> || <>
                    <label htmlFor="url">Loading edit post:</label>
                    <input type="url" className="form-post-url-input form-item" name="url" disabled placeholder="Loading..." style={{ backgroundColor: "white" }} />
                    <input type="hidden" className="home-edit-hidden-input" name="postId" />
                    <textarea name="text" cols="30" rows="5" disabled placeholder="Loading..." style={{ backgroundColor: "white" }}></textarea>
                </>}


            <div className="form-buttons">
                <button type="button" className="form-button active:red" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="form-button active:green">Save</button>
                <p className="fail-warning red"></p>
            </div>
        </Form>
    </section>
}
