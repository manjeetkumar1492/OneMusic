
# OneMusic - MERN Online Music Streaming Web App

A Mern website/web app for online ad-free music streaming.

## Demo Website

Render : [[https://one-music-7snl.onrender.com/](https://one-music-7snl.onrender.com/)]




## Run Locally

Clone the project

```bash
  git clone https://github.com/manjeet826510/OneMusic.git
```

Go to the project directory

```bash
  cd OneMusic
```
Open OneMusic App in vs code

```bash
  code .
```
Open Terminal in vs code & create .env file inside backend folder

```bash
  cd backend && touch .env
```


Open .env file and paste below contents and provide the <value> of all these variables, generate yourself

```bash
JWT_SECRET = <value>
MONGODB_URI_LOCAL = <value>
MONGODB_URI = <value>
```

To run backend - do cd backend first if you are not in backend directory
```bash
npm install
npm start
```
To run frontend: Open a new terminal
```bash
cd frontend
npm install
npm start
```
This will open the website on local host in the browser at
 http://localhost:3000

To login as admin - 
Create your user account and change the isAdmin field value from "false" to "true" inside the User Collection of your MongoDb account.
