#! /bin/bash

set -e

REPO=registry.cn-hangzhou.aliyuncs.com/em_test/web-zft

if [ $# -lt 1 ]; then
  echo "Usage: ./publish.sh <docker image version>"
  exit 1
fi

npm run build -- --env=production && \
docker build -f docker/Dockerfile . -t $REPO:$1 && \
docker push $REPO:$1