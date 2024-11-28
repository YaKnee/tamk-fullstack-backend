# TAMK Fullstack Web Development- Backend
Place to store weekly updates to our backend server.

### Installation
*requires own MongoDB server and credentials. Instructions can be found here on how to setup your own: [Getting Started with MongoDB Atlas](https://www.youtube.com/watch?v=bBA9rUdqmgY).
Then create a .env file to the project folder with:
- Server credentials, for example: `MONGODB_URI = mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/<database_name>`,
- Json web token secret, for example: `JWT_SECRET=<secret_key>`,
- Port number, for example: `PORT=2000` (_not strictly necessary as code will use 3000 as default if not added, but good for customizability_)
__Replace values between <> with your actual values.__

Go to the directory where you want to store this repository, then use: `git clone https://github.com/YaKnee/tamk-fullstack-backend.git`. Next, go into this new directory with `cd tamk-fullstack-backend` and install the dependency packages by using `npm install`. After installation is complete, use `npm start` which should start the project with nodemon.

### Week 1
First implementation of CRUD application with Node Express.

Routes so far:
- GET/movies
- GET/movies/[id]
- POST/movies


### Week 2
Full CRUD Implentation. Valids data, handles errors, can search and filter with query parameters, and uses correct status codes.

All routes:
- GET/movies
- GET/movies/[id]
- POST/movies
- PUT/movies/[id]
- DELETE/movies/[id]

Also handles all unknown routes and returns 404 if incorrect route used.

Uses morgan for logging http requests in development.

### Week 3

Refactor local backend to utilise a MongoDB cluster provided by AWS.

### Week 4

- Modularize the project
- Implement validation with Joi
- Implement authentication with JWT
- Create script to make a seed admin
- Create script to populate database with some movies

### Week 5
