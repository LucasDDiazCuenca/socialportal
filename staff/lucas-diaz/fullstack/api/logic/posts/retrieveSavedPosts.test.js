const retrieveSavedPosts = require("./retrieveSavedPosts")

const jsonPosts = [
    {
        id: 'post-3',
        author: {
            id: 'user-2',
            name: 'pepa pig',
            avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
        },
        userName: 'pepa pig',
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2018/05/11/tobiarchitects1.1526035990.6946.jpg',
        text: 'Really like this house',
        date: '2023-06-14T01:26:33.965Z',
        likeCounter: [],
        visibility: 'public'
    },
    {
        id: 'post-2',
        author: {
            id: 'user-1',
            name: 'lucas Diaz',
            avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
        },
        userName: 'lucas Diaz',
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2018/05/11/tobiarchitects1.1526035990.6946.jpg',
        text: 'Really like this house',
        date: '2023-06-14T00:39:08.652Z',
        likeCounter: [],
        visibility: 'public'
    }
]

retrieveSavedPosts("user-1", jsonPosts, (error, _posts) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Saved posts retrieved correctly")
    console.log(_posts)
})


