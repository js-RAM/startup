# startup
## Elevator Pitch:
In a world full of monsters, fight your way to victory in this new web game. Using a classic turn based RPG style, this game pits you, the hero, up against an endless army of progressively difficult monsters. Upgrade your character and see how many enemies you can strike down before they finally finish you off. Replay it again and again and see if you can push even farther.

## Key Features:
- Fight hordes of monsters!
- Turned based combat
- Upgrade the stats and moves of your hero
- Continue playing through saved data
- See your previous 3 adventures
- See when other players strike down their foes!

## Key Technologies:
-> **Authentication:** Players will first be directed to a login page that will match their username and password into a database. They will then be directed to their User Page

-> **Database Data:** After logging in, players will be able to see their last 3 attempts as well as a current attempt they can resume if they have saved progress.

-> **Websocket Data:** As players defeat enemies, their victory will be broadcast to other players in a global log in real time.

## Image Preview:
### Login Page:
![The Login Page](/Images/game-login.png)
### User Page:
![The User Page](/Images/user-page.png)
### Adventure Page:
![The Adventure Page](/Images/adventure-page.png)

## Change Notes:
### 9/30/2023
- Created html pages for the home page, user page and adventure page
- Navigation between pages
- Implemented a basic structure on each page with textual content
- Put in a placeholder image for enemies in adventure-page.html
- Login placeholder implemented
- Created placeholders for database content in user-page.html and adventure=page.html. This data is represented with a 'xxx'
- Created websocket placeholders where realtime communication will go in adventure-page.html

### 10/15/2023
- stylized the header and footer
- sylized the body in the home, user, and adventure pages
- Formatted the content so it adjusts with the window size
- All elements, contents, and images are stylized with CSS

### 10/28/2023
- Created javascript for login
- Created javascript structure for future database
- Created javascript structure for future websocked
- Created javascript interaction fo the game

### 11/12/2023
- Created an HTTP service via Node.js and Express
- The frontend is served by express static middleware
- Frontend calls an inspirational quote api on the front page to inspire prospective adventurers!
- The backend has service endpoints that allow the players data to be stored on the server
- The frontend calls these endpoints to store the data
- Side Note: if you know a 3rd party endpoint that could be used to generate images for the enemies, it would be much appreciated. I have been looking for one.

### 11/18/2023
- MongoDB Atlas database created and implemented
- Backend endpoints manipulate the data
- The data is saved and stored in MongoDB
- Setup login verification
- Allows new users to be created
- Verifies users
- Creditentials stored and retrieved from MongoDB
- Forced players to login to play

### 12/2/2023
- Created frontend and backend of websocket
- Data sent and received in adventure.js
- Data is displayed

### 12/14/2023
- React App properly bundled and created
- Functional React Components for the login, user page and adventure page
- Functional React Router
- React Hooks implemented
