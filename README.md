# Docker — Containerizing a Node App

The smallest complete Docker walkthrough: take one Express app and run it three ways — bare metal, supervised with pm2, containerized — so the difference between the three is visible in one place.

## The app

A small Express + EJS server (`routes/server.js`, Paytm-style checkout routes, one HTML view) listening on port **2022**. Nothing complicated — that's the point. The interesting part is what happens around it.

## 1. Bare metal

```bash
node app.js                        # foreground
nohup node app.js > output.log &   # background via nohup
```

Works. But if the process dies, it stays dead.

## 2. Supervised with pm2

```bash
npm install pm2 -g
pm2 start app.js                   # restarts on crash, logs, clustering
pm2 logs                           # watch it work
```

Supervision at the process level: pm2 brings the app back when it crashes.

## 3. Dockerized

```bash
docker build -t node-docker .
docker run -d --publish 2022:2022 node-docker
```

Same app, now sealed in an image. The `Dockerfile` is the standard shape: `node:12.18.1` base, `NODE_ENV=production`, copy `package.json` first so `npm install` hits the layer cache, then copy the app and run it. Supervision now happens at the OS level — a dead container gets restarted as a fresh instance from the image.

Stopping every running container quickly — that's what the little `containerstop.bat` here does:

```bat
FOR /f "tokens=*" %%i IN ('docker ps -q') DO docker stop %%i
```

## Why three ways

| Way | Supervisor | Survives a crash | Survives a machine |
|---|---|---|---|
| `node app.js` | none | no | no |
| pm2 | pm2 | yes (it restarts the process) | no |
| Docker | container runtime | yes (restart policy) | yes (the image is portable) |

A `Jenkinsfile` sits next to the `Dockerfile` from the CI work — the same image built and pushed by a Jenkins pipeline in [Jenkins-CI-CD](https://github.com/amanvicky/Jenkins-CI-CD).

Deeper notes — layer caching, volumes, ENTRYPOINT vs CMD, multi-stage builds — in [docker-in-depth](https://github.com/amanvicky/docker-in-depth).
