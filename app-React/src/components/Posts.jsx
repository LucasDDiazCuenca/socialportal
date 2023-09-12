import retrievePosts from "../logic/retrievePosts.js"
import Post from "./Post.jsx";
import retrieveUser from "../logic/retrieveUser.js";
import { useState, useEffect, useContext } from "react";
import retrieveSavedPosts from "../logic/retrieveSavedPosts.js";
import retrieveUserPosts from "../logic/retrieveUserPosts.js";
import Context from "../AppContext.js";


export default function Posts({ onEditPostButtonClick, lastPostsUpdate, view }) {
    console.log("Posts -> render")

    const { freeze, unFreeze } = useContext(Context)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [isInitialRun, setIsInitialRun] = useState(true)

    useEffect(() => {
        try {
            checkPostType();
        } catch (error) {
            unFreeze()
            alert(error.message);
        }
    }, []);

    const checkPostType = () => {
        freeze()

        switch (view) {

            case "posts":
                retrievePosts()
                    .then(_posts => setPosts(_posts))
                    .catch(error => alert(error))

                retrieveUser()
                    .then(_user => {
                        unFreeze()
                        setUser(_user);
                    })
                    .catch(error => console.log(error))
                break;

            case "savedPosts":
                retrieveSavedPosts()
                    .then(_posts => setPosts(_posts))
                    .catch(error => alert(error))

                retrieveUser()
                    .then(_user => {
                        unFreeze()
                        setUser(_user);
                    })
                    .catch(error => console.log(error))
                break;

            case "userPosts":
                retrieveUserPosts()
                    .then(_posts => setPosts(_posts))
                    .catch(error => alert(error))

                retrieveUser()
                    .then(_user => {
                        unFreeze()
                        setUser(_user);
                    })
                    .catch(error => console.log(error))
                break;
        }

    }

    const handleDeletePost = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleToggleLike = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleRefreshPosts = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleOpenEditModal = (id) => {
        onEditPostButtonClick(id)
    }
    const handletoggleSavePost = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleHidePost = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log("Posts --> componentDidMount with hooks")
        return () => console.log("Posts --> componentWillUnmount with hooks")
    }, [])

    useEffect(() => {
        if (isInitialRun) {
            setIsInitialRun(false)
            return
        } else {
            console.log("Posts -> componentWillReciveProps with hooks")
            handleRefreshPosts();
        }
    }, [lastPostsUpdate])

    return <section className="home-posts-content">
        {posts.map((post) => <Post
            key={post._id}
            post={post}
            user={user}
            onDeleteClick={handleDeletePost}
            onLikeClick={handleToggleLike}
            onEditPostButton={handleOpenEditModal}
            OnSavedPostClick={handletoggleSavePost}
            onHidenPostClick={handleHidePost}
        />)}
    </section>
}
