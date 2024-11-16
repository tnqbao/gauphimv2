git pull origin main

docker stop gauphimv2
docker rm gauphimv2
docker rmi gauphimv2
docker build -t gauphimv2 .
docker run -d -p 3000:3000 --name gauphimv2 gauphimv2
docker system prune -a --volumes -f
docker exec -it gauphimv2 ./bin/sh
yarn clear cache
EXIT
