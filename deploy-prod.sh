#!/bin/bash
IMAGE_NAME="jsantman29/vocabulary-expander"
IMAGE_TAR="docker_image.tar"
VPS="jsantman29@jsantman29.me"
VPS_DIR="~/sites/docker-images"

# Uses the current Dockerfile to build an image.
echo "Building Docker image..."
docker build . -t ${IMAGE_NAME}

# Saves the Docker image as a tar file.
echo "Saving Docker image as tar file..."
docker save -o ${IMAGE_TAR} ${IMAGE_NAME}

# SSH into a VPS, deploy the docker file, and load it.
echo "Transferring Docker image to ${VPS}"
scp ${IMAGE_TAR} ${VPS}:${VPS_DIR}/.

echo "Removing it locally..."
rm ${IMAGE_TAR}

echo "Deploying Docker image on ${VPS}"
ssh ${VPS} "cd ${VPS_DIR}/; docker load -i ${IMAGE_TAR}; rm ${IMAGE_TAR};"
