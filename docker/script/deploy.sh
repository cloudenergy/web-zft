#! /bin/bash

set -e

IMAGE_VERSION=${1:-latest}
docker pull registry.docker-cn.com/kpse/web-zft:$IMAGE_VERSION

function start () {
  docker ps -aq | xargs docker rm -f
  docker run -d -p 80:80 registry.docker-cn.com/kpse/web-zft:$IMAGE_VERSION
}
function test() {
  docker rm -f test_deploy
  docker run -d --name test_deploy -p 8080:80 registry.docker-cn.com/kpse/web-zft:$IMAGE_VERSION
  test_curl
}
function test_curl() {
  response=$(curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080)
  if [[ $response == "200" ]]; then
    docker rm -f test_deploy;
  else
    exit 1;
  fi
}

test && start