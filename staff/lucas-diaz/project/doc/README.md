# APP ISOLINK

![](https://www.mushmagic.com/img/cms/Blogimages/hx_856A-1.gif)

## INTRO 
This is an app that allows you to register, login, and once inside, create an avatar (_naming proposal "__Link__"_).

Once the **_Avatar_** is created & custimized, we'll have the option of entering into a isometric 3D room.

In this room we will be able to interact with other person's avatar via chat (__atm__), explore the room and interact with some objects. 

We can also admin friends area, adding and deleting friends, see who's online and where. 

We can use this app just for fun, interact with others with an immersive 3D experience or we can use it as a communication Tools in workspaces

---
---


## FUNCTIONAL DESCRIPTION

### USE CASES 

- Register an user
- Upload user information
- Create an avatar  
- Edit avatar 
- Select a room
- enter in a room 
- Add friend
- Delete friend
- Acept friend request 
- Decline friend request

### USE CASES IN A ROOM

- Move the avatar
- Send texts in a chat space 
- interact with "x" object
- do certain movements linked to emotion states
- add a friend

---
---
## TECHINAL DESCRIPTION 

### DATA MODELS 

User 
- id (ObjectId)
- name (string)
- email (string)
- password (string)
- friends( [ObjectId] )
- friendRequests (Array)
- status (string) --> "online"/"offline"

Avatar 
- id (ObjectId)
- owner (ObjectId)
- name (string)
- model (??)
- clothing (??)
- commplement (??)
- actions (??)


## LINK TO WORKFLOW PROCESS

![](https://www.notion.so/lucasdiazcuenca/Project-Finale-4a4c88d6f47a4a7bae6213bbac849d38?pvs=4)






