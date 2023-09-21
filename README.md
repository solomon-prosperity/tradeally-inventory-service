# Tradeally Inventory Service

> RESTful/gRPC api with Domain Driven Design

## Development Environment Setup

1.  Make sure you have `nvm`, node `v18.17.0` or `LTS` version of node installed
2.  Install `yarn` - `npm install -g yarn`.


## Documentation
Find the API documentation [HERE](https://tradeally-inventory-service.onrender.com/docs)

## Docker support

**Prerequisites**

1. [Docker](https://www.docker.com/products/docker-engine) Community Edition v17 or higher

```sh
$ docker build -t tradeally-inventory-service  .
$ docker run -p 30041:30041 -p 30042:30042 --env-file=.env  tradeally-inventory-service
```

Access `http://localhost:<PORT>` and you're ready to go!

> http://localhost:30041/

## Quick Start
1. to clone the project `git clone https://github.com/solomon-prosperity/tradeally-inventory-service.git`
2. install neccesary dependencies using `yarn install`
3. create `.env` file in root directory, populate with variables values in the `.env.example` file 
4. run `yarn seed:user` to seed your database with a user, an ApiKey for that user will be logged on your console, copy the apiKey and replace with the apiKey variable in `/seeds/seedProducts` then run `yarn seed:products` to seed the database with product data
5. start the server locally using `yarn start:dev:rs`
6. Access the default url with `http://localhost:<PORT>` 
> http://localhost:40121/

## Overview

- uses Node.js > v9
- written using ES6
- uses Yarn for package dependency management
- uses [Airbnb JavaScript Style](https://github.com/airbnb/javascript)
- uses `Mongoose` as ODM
- Filename convention - `camelCase`

## CLI Tools

- `yarn build` - build codebase for production
- `yarn start:dev` - start the application in development mode
- `yarn start:dev:rs` - start the application in development mode with nodemon for automatic server restart on code change
- `yarn test` - run Unit tests
- `yarn lint` - lint codebase using Airbnb style
- `yarn lint:fix` - fix code according to Airbnb style
- `yarn build:docs` - generate Rest API, Readme & JSDC documenation
- `yarn update:stub` - update submodules
- `yarn start:jaeger:dev` - start a local Jaeger server and serve
- `yarn stop:jaeger:dev` - stop a local Jaeger container

### Databases & Messaging

- [Mongodb](https://www.mongodb.com) - Main datastore
- [Redis](https://redis.io/) - In-memory datastore for caching
- [Elasticsearch](https://www.elastic.co/elasticsearch/) - Elasticsearch is a distributed, RESTful search and analytics engine
- [RabbitMq](https://www.rabbitmq.com/) - Message Broker

## Some Tech

- [Express](https://expressjs.com/) - Node Framweork
- [Awilix](https://github.com/jeffijoe/awilix) - dependency resolution support powered by `Proxy`
- [Nodemon](https://nodemon.io/) - Use for development file reload.
- [CORS](https://github.com/expressjs/cors) - a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Compression](https://github.com/expressjs/compression) - Node.js compression middleware.
- [Http-status](https://github.com/adaltas/node-http-status) - Utility to interact with HTTP status code.
- [Winston](https://github.com/winstonjs/winston) - A multi-transport async logging library for node.js.
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
- [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras
- [Mongoose](https://mongoosejs.com/) - Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- [Chance](https://chancejs.com/) - generate massive amounts of fake data in the browser and node.js

- [Moment](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
- [Moment-timezone](https://momentjs.com/timezone/) - Parse and display dates in any timezone.

- [APIdocjs](https://apidocjs.com/)- Inline Documentation for RESTful web APIs

### Tests

- [mocha](https://mochajs.org/) - JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
- [chai](http://chaijs.com/) - a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- [supertest](https://github.com/visionmedia/supertest) - HTTP assertions made easy via superagent.


## Author
[Eravwuvieke Prosper Ilouoghene](https://www.linkedin.com/in/prosper-eravwuvieke-25b534163/)


## License
MIT License - fork, modify and use however you want.
