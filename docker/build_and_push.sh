#!/bin/bash

set -e 

echo "Building image..."

docker build --platform linux/amd64 -t ensenas-ui -f docker/dockerfile.app.yaml .

echo "Tagging image..."

docker tag ensenas-ui:latest alejol2019/ensenas-ui:latest

echo "Pushing image..."

docker push alejol2019/ensenas-ui:latest

echo "Image pushed successfully!"
