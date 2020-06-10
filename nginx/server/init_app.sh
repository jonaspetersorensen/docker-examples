#!/bin/sh

### PURPOSE
#
# Make some runtime preparations before we start nginx

# 

### NGINX
# 
echo "\n$(date) Starting nginx"
nginx -g "daemon off;"