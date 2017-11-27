#! /bin/bash

set -e

IMAGE_VERSION=${1:-latest}
docker pull registry.docker-cn.com/kpse/web-zft:$IMAGE_VERSION

function start () {
  docker ps -aq | xargs docker rm -f
  docker run -d -e ZFT_BACKEND_PROXY -p 80:80 --net=zft --name=web registry.docker-cn.com/kpse/web-zft:$IMAGE_VERSION
}
function test_deploy() {
  docker rm -f test_deploy
  docker rmi $(docker images -qf "before=registry.docker-cn.com/kpse/web-zft:$IMAGE_VERSION" -f=reference='registry.docker-cn.com/kpse/web-zft:v*')
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

test_deploy && start