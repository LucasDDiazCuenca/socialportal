# __APP SOCIAL PORTAL__

![](./doc/login.gif)

## Intro

Introducing SOCIAL PORTAL, an app that closely resembles popular social media platforms like Instagram. With features such as photo uploading, editing, deletion, favoriting, and liking, it provides a familiar social experience. Building SOCIAL PORTAL has been a valuable learning journey, allowing us to deepen our expertise in technologies like React and more.

## __Functional description__

### ___Use cases___

- add post
- modify post
- remove post
- toggle like post 
- toggle fav post

## __Technical description__

### ___Data model___

User
- id (string)
- name (string)
- email (string)
- password (string)
- avatar (string)
- favs (string array, refers to Post id) 

Post
- id (string)
- author (string, refers to User id)
- image (string)
- text (string)
- likes (string array, refers to User id)


## NORMAS DE USO

hay una version deployed

https://lucas-social-app.netlify.app

si presenta problemas borrar la palabra "login" de la URL del navegador

User: lucas@gmail.com Pass: LucasDiaz22!

Puedes postear una imagen que sea una url que acabe en .jpeg 

ejemplo : https://archello.s3.eu-central-1.amazonaws.com/images/2018/05/11/tobiarchitects1.1526035990.6946.jpg

La app esta preparada para funcionar esteticamente mas optima con un formato mobile first



![](./doc/img2.png)

![](./doc/loading.gif)
