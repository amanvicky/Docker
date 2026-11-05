# Docker — Containerizing a Node App

The smallest complete Docker walkthrough: run an Express app three ways — bare metal, supervised, containerized.

## 1. Bare metal

```bash
cd app
node app.js                        # foreground
nohup node app.js > output.log &   # background via nohup
```

## 2. Supervised with pm2

```bash
npm install pm2 -g
pm2 start app.js                   # restarts, logs, clustering
```

## 3. Dockerized

```bash
npm install express ejs
docker build -t node-docker .
docker run -d --publish 2222:2222 node-docker
```

The jump from "works on my machine" to a sealed image: pm2 supervises on the host, Docker supervises at the OS level. Deeper notes in [Docker-2](https://github.com/amanvicky/Docker-2).
