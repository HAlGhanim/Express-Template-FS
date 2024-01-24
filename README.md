# Express-Template-FS

In this template, you have all the necessary apis, models, middlewares, and files for a functional user authentication application. Rate limit middleware is included to prevent brute force attacks.

Simply fork this repo and you will be able to choose it as a Github template for any new repos you create.

You will have to use `npm install` to install node modules.
`npm install nodemon -g` This step is necessary to install this package globally. This package restarts the node.js application everytime you save.

## File Structure

`Express-Template-FS/
|-- api/                     
|   |-- Auth/                
|       |-- controllers.js   
|       |-- routes.js        
|-- config/                  
|   |-- keys.js          
|-- media/             
|   |-- // This is were the images would be saved  
|-- middlewares/             
|   |-- errors/         
|       |-- errorHandler.js         
|       |-- notFoundHandler.js         
|   |-- images/  
|       |-- imageConditional.js         
|       |-- uploader.js         
|   |-- passport/  
|       |-- passport.js                
|   |-- password/  
|       |-- password.js              
|   |-- rates/  
|       |-- rateLimiter.js                  
|-- models/                  
|   |-- User.js              
|-- node_modules/            
|-- utils/                   
|   |-- generateToken.js            
|   |-- passHash.js            
|-- .env.txt                 // Rename to .env to include in .gitignore
|-- .gitignore               
|-- app.js                   
|-- database.js                   
|-- package.json             
|-- README.md                `

### .env

```javascript
PORT = 8000;
JWT_SECRET = "secret";
JWT_TOKEN_EXP = "1h";
MONGO_DB_URL = "YOUR MONGODB URL";
```

### .gitignore

```javascript
.env
node_modules
media
```
