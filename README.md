# Fantasy Stock Trade (React-Express-Postgresql)

_Stock tracker using fantasy money, built using express.js, react.js, and mongodb._

<br>
<strong>Note:</strong> I'm updating this app, the backend parth, the API is done. I've changed the postgresql database for Mongodb database. And now I'm working on the client part, updating and cleaning everything.

<br>

<img src="demo-fst.png" width="500">

## Summary

Fantasy Stock Trade is an application the allows you the manage your holdings. The main objective of this project is to server as a learning tool, and familiarize myself with Expressjs for implementing an API using Postgresql as a Databaseand, and consuming an external API as IEX Cloud, using React Hooks like useContext and useReducer, and JsonWebtoken for authentication users, and jest and supertest for testing the API. 

## How to Install

git clone https://github.com/marialobillo/stock-trade-v4.git
cd stock-trade-v4

For install dependencies on back-end:

`npm install`

And run the server:

`npm run start`

For Front-end we need to move to client folder:

`cd client`

`npm install`

And for run the React app:

`npm run start`

For the database and other setting you should use an .env file on project root with these variables:

PORT='your_port_here'
DEV_DATABASE_URL='postgresql_database_here'
TEST_DATABASE_URL='postgresql_database_here'
DATABASE_URL='postgresql_database_here'
SECRET='your_secret_sentence'

But the .env file is there because this project is just part of my portfolio.


## Author
 -  **Maria Lobillo-Santos** - Full-Stack Software Developer <a href="https://marialobillo.github.io" target="_blank">Website</a> | <a href="https://www.linkedin.com/in/mar%C3%ADa-lobillo-santos/" target="_blank">LinkedIn</a>
