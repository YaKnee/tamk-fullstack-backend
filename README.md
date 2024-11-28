# TAMK Fullstack Web Development- Backend
This repository serves as a versioned log of weekly updates and improvements to our backend server for the TAMK Fullstack Web Development course. Each update reflects progress in adding new features, improving functionality, and learning how to build a solid and secure server step by step.

## Installation
*requires Node.js and your own MongoDB server and credentials. Instructions can be found here on how to setup your own: [Getting Started with MongoDB Atlas](https://www.youtube.com/watch?v=bBA9rUdqmgY).

Go to the directory where you want to store this repository, then use: `git clone https://github.com/YaKnee/tamk-fullstack-backend.git`.
Next, go into this new directory with `cd tamk-fullstack-backend` and install the dependency packages by using `npm install`. 

Then create a __.env__ file to the project folder with:
- Server credentials, for example: `MONGODB_URI = mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/<database_name>`,
- Json web token secret, for example: `JWT_SECRET=<secret_key>`,
- Port number, for example: `PORT=2000` (_not strictly necessary as code will use 3000 as default if not added, but good for customizability_)

__Replace values between <> with your actual values.__

Finally, use `npm start` which should start the project with nodemon.

## Weekly Updates

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

## Libraries

Full list of libaries used for this project are:
- [axios](https://axios-http.com/docs/intro)
- [dotenv](https://www.dotenv.org/docs/)
- [express](https://expressjs.com/en/4x/api.html)
- [joi](https://joi.dev/api/?v=17.13.3)
- [jsonwebtoken](https://jwt.io/introduction)
- [mongodb](https://www.mongodb.com/docs/drivers/node/current/)
- [mongoose](https://mongoosejs.com/docs/index.html)
- [morgan](https://github.com/expressjs/morgan#readme)
- [nodemon](https://github.com/remy/nodemon)