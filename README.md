# docker-examples

In this repo you will find a few examples of how to configure docker containers for misc developer purposes.  


## Volume paths

When you have a developer enviroment running in a container then you quite often also want to mount and bind your source code directory.  
This is where you run into the problem of relative vs absolute paths when mounting volumes in docker.

So far my experience have been that when you use

- `docker run -v {host-directory}:{container-directory}`  
  The `{host-directory}` has to be an absolute path.  
  Using relative paths seems to be an hit or miss according to which docker version is used, the amount of coffee available for debugging and divine intervention.  

- `docker-compose`  
  ```yaml
  # docker-compose.yaml
  volumes:
      - "{host-directory}:{container-directory}"
  ```
  The `{host-directory}` in the yaml can be a relative path, and it will work every time  
  Why does this work? Most likely because `docker-compose` does not rely on the `docker`client, it does it's own thing.

- Unix paths,  
  you just need to use the docker client that lives in the same OS as the docker server when starting the container to get the correct path translation from the docker client to the docker server.
Example: in windows then use the windows docker client to start the container.

As I want to use relative paths to keep things sane I therefore default to use `docker-compose` even when I just need to run a single container. It saves a lot of headache and avoid long trips into rabbit holes.


### How to get volume mounting to work in WSL1

_Short version_  
1. Use relative paths.
   Using absolute paths will sooner or later lead you to the "rename /mnt/c to /c" trick, and this again will lead you right over the cliff and into the rabbit hole.  
   - When using relative paths then use `docker-compose` to avoid yet another rabbit hole
1. In windows, open command prompt
1. Navigate to the project directory
1. Run the `docker run...` or `docker-compose` command to start the container(s)
1. When everything is up then you can interact with the containers using the docker client in WSL1

_Long version_  
You need to be aware of that it is the docker client that will handle path translations.  

A typical WSL1 + docker scenarion has the following setup:
- In windows you have installed "docker for windows" which include
  - docker windows client
  - docker windows server
- In WSL1 you have installed
  - docker linux client that points to docker windows server

In WSL, if you try to mount volumes then it is the _linux_ client that will handle path translations.  
The _linux_ docker client is not aware of that it is talking to a _windows_ docker server, so it will not do any "unix-to-windows" path translation, and the mount will fail.  

To get it to work then you have to use the _windows_ docker client to start the container.  
When the container is up then you can use the WSL1 docker client to interact with it.


## Debugging

Quite often you can find out what is going on by just having a look inside the container.  
1. Run `docker ps` to find the name of the container
1. Open a shell in the container by using the command `docker exec -it {name of container} sh`



