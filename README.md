
## Features
* Object oriented
* Typescript
* Authentication (JWT)
* http/2 support
* Sequelize ORM
* TS linting

Please note, This boilerplate is for the API only application.

Visit `https://localhost:3000/` to access the root page.

## Requirements
* Node v18.16.1
* SQL Database ( PostgreSQL)
## Install
    $ git clone https://github.com/pankaj9755/Webelight.git
    $ cd Webelight
    $ npm install
## Running the project    
    $ npm run build
    $ npm start
## Environment Variables Configuration
To simulate environment variables
#### Dev environment *(use anyone)*
- src/resources/config/env.development.ts
- .env file

####  Production environment
- /etc/environment file

The environment variables are as follows -
```
NODE_ENV=production                                 // Environment development/production
SERVER_PORT=3000                                    // Server's Port
SESSION=secret_key                                  // secret-boilerplate-token
JWT_SECRET=token                                    // Jwt secret key
DB_HOST=host                                        // DB Host address
DB_PORT=3306                                        // DB Port number
DB_DIALECT=db                                       // DB (mysql, PostgreSQL, MySQL, etc)
DB_NAME=name                                        // DB name
DB_USER=user                                        // DB user name
DB_PASSWORD=password                                // DB password
```

## Installation
```bash


## Usage
* `npm run build` compile the typescripts in src folder
* `npm start` Starts the server on development mode in Typescript
* `npm run dev` Starts the server on development mode in Javascript
* `npm run grunt` Starts server using grunt file
*  `migrate` sequelize-cli db:migrate,

Visit [https://localhost:{SERVER_PORT}/swagger](https://localhost:{SERVER_PORT}/swagger) to view Swagger UI.