#! /bin/bash

set -e

REPO=registry.cn-hangzhou.aliyuncs.com/em_test/web-zft

if [ $# -lt 2 ]; then
  echo "Usage: ./publish.sh <docker image version> <build branch>"
  exit 1
fi

env=qa

if [ "$2" = "master" ]; then
    env=production
fi

npm run build -- --env=$env && \
docker build -f docker/Dockerfile . -t $REPO:$1 && \
docker push $REPO:$1