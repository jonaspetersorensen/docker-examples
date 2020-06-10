# Simple nginx in docker example

The purpose is to serve web resources from host directory via nginx that is running in a docker container.  
The web files are in directory `./wwww`  
Nginx configuration is in directory `./server`

## Build and run developer container

1. Open a terminal (windows command prompt if using WLS1)
1. Navigate to this directory
1. Run command `docker-compose up --build --remove-orphans`
1. Open a browser and go to `http:\\localhost:3000`
1. Start hacking away in dir `./www` and reload browser to see results 


## https

I have had no need to set this up yet, so this is what I would try if I had to go that way

1. Read up on ["Create a Self-Signed Certificate for Nginx in 5 Minutes"](https://www.humankode.com/ssl/create-a-selfsigned-certificate-for-nginx-in-5-minutes) to get an understanding of what to do
1. Add required tooling to the image by modifying the dockerfile
   - openssl
1. Add the necessary steps to create the cert into the `./server/init_app.sh` script
1. Add the neccessary steps to update the nginx config in the `./server/init_app.sh` script
