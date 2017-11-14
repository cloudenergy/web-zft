#! /bin/bash

set -e

if [ $# -lt 1 ]; then
  echo "Usage: ./publish.sh <docker image version>"
  exit 1
fi

npm run build -- --env=production && \
docker build -f docker/Dockerfile . -t kpse/web-zft:$1 && \
docker push kpse/web-zft:$1