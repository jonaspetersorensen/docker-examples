#!/bin/sh

### PURPOSE
#
# Make some runtime preparations before we start nginx


### PREPARE CLIENT DATA
#

# Substitute environment variables in the env.json file using the values in the current container environment
ENV_TEMPLATE_PATH="/app/server/env.json"
ENV_OUTPUT_PATH="/app/www/env.json"
envsubst < "$ENV_TEMPLATE_PATH" > "$ENV_OUTPUT_PATH"


### MAIN
#

echo "Environment variables:"
cat "$ENV_OUTPUT_PATH"

# Start Nginx
nginx -g "daemon off;"