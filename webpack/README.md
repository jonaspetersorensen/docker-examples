# Demo webpack development environment in docker

This demo will show you how you can run webpack development environment (webpack server, hot reloading etc) from a docker container, while keeping the files in sync with host.  
Note that `node_modules` is not shared with host (host will see an an empty dir).

The demo app is a simple static web app served by nginx.  
The [webpack](https://webpack.js.org/guides/) configuration is a close to vanilla as possible.


## Table of contets

- [Development](./README.MD#Development)
  - [Start](./README.MD#Start)
  - [Stop](./README.MD#Stop)
  - [Notes](./README.md#Notes)
  - [Starting from scratch](./README.md#Starting-from-scratch)
- [Build and run release image](./README.MD#Build-and-run-release-image)


## Development

The [`./docker-compose.yaml`](./docker-compose.yaml) contains everything we need to run a development environment.

### Start

You will want to use 2-3 terminal sessions for this as it is easier to see what is going on where.

#### _Session 1: Build and start the webpack container_  
If you are using WSL then this session should be in windows `cmd`
```sh
docker-compose up --build
```

#### _Session 2: Run commands inside the webpack container_  
```sh
# Open a bash session into the webpack container
docker exec -it webpack-development_container bash

# From inside the container you can then run any npm command.
# First install all packages. You can later skip this step as long as docker volume "webpack_node-modules" still exist.
npm install
# Then start the webpack-dev-server
npm run start
```
You should now be able to access the webpack server from the host at http://localhost:3000/

#### _Session 3: Access the files in host_  
```sh
# Bring up your IDE and start hacking away. 
code .

# Run git commands etc
git status
```

### Stop

Stop and remove all started containers and networks

```sh
docker-compose down
```

If you want to clean out `node-modules` as well then add option `-v`

```sh
docker-compose down -v
```


### Notes

To make the webpack-dev-server accessible outside the container then you must set the `--host` option when starting the server.  

Example `package.json`:
```js
{
   ...
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --mode development --open --hot --host 0.0.0.0",
      "build": "webpack"
   }
}
```


### Starting from scratch

Say you want to start a new nodejs project and build up `package.js` and `webpack.config.js` from scratch.  

All you have to do is to remove those files from this demo and simply start building them using the tools availble in the webpack-development_container.

```sh
# Open a bash session into the webpack container
docker exec -it webpack-development_container bash

# From inside the container you can then run any npm command.
npm init
npm install --save-dev webpack webpack-cli webpack-dev-server
```


## Build and run release image

The [`./Dockerfile`](./Dockerfile) is a multistage build that will produce a minimal release image.  
Please note that webpack is set to development mode in this demo. You should add your own configuration for webpack production mode (mine tend to differ from project to project).


```sh
docker build -t webpack-demo-release .
docker run -it --rm -p 3000:80 webpack-demo-release
```
