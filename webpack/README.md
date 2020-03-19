# Demo webpack dev environment and an auth prox

## How to A clean start

```
npm init
npm install --save-dev webpack webpack-cli webpack-dev-server

```

## webpack-dev-server and docker

To make the server accessible outside the container then you must set the `--host` option when starting the server.  

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

## Shell

```
# webpack
docker exec -it webpack_container bash

# auth-proxy
docker exec -it auth_container sh
```
