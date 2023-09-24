# startup
## Elevator Pitch:
In a world full of monsters, fight your way to victory in this new web game. Using a classic turn based RPG style, this game pits you, the hero, up against an endless army of progressively difficult monsters. Upgrade your character and see how many enemies you can strike down before they finally finish you off. Replay it again and again and see if you can push even farther.

## Key Features:
- Fight hordes of monsters!
- Upgrade the stats and moves hero
- Continue playing through a save
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

## Notes:

### Web Server Info:
> ssh -i [key pair file] ubuntu@[ip address]

> IP Address: 3.229.66.224

> Domain Name: cs260game.click
