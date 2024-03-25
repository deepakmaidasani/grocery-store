# Grocery Store documentation
## Tasks completed
- User signup
- Authentication and Authorization through JWT
- Manage Grocery Items (CRUD) API endpoints (All the routes are protected)
- Place order (with ability to order multiple items of more than one quantity)


## Tech
- [node.js](https://www.nodejs.org) - evented I/O for the backend
- [Express](https://www.expressjs.com) - fast node.js network app framework
- [TypeScript](https://www.typescriptlang.org/) - strongly typed programming language that builds on JavaScript
- [TypeOrm](https://www.npmjs.com/package/typeorm)-  ORM that can run in NodeJS and can be used 
- [MYSQL](https://dev.mysql.com/doc/) - world's most popular open source relational database

## Project setup instructions and Installation
- Clone the project
- Open the project in VS code or any editor.
- Install the dependencies and start the server.

```sh
npm install
```
- Add all the following required configs in .env file
-- PORT
-- MYSQLPORT
-- USER_ACCESS_KEY
-- HOST
-- DATABASE
-- USERNAME
-- PASSWORD
- Start the server
```sh
npm start
```

- Test the APIs in Postman. The routes are mentioned in [Postman Collection](https://documenter.getpostman.com/view/15896704/2sA35D4NRR)