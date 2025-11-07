# Deploying this app to Render

This repository is a small Node.js app using Express and Socket.IO. It serves static files from the `public/` folder and handles realtime connections with Socket.IO on the same HTTP server.

Render is a good fit because it supports persistent Node processes and WebSockets.

## Pre-requisites
- Create a GitHub (or GitLab) repository and push this project to it (instructions below).
- Create a Render account and connect your Git provider.

## Quick steps (Render web service)

1. Push your code to GitHub (example using PowerShell):

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

2. On Render dashboard:
   - Click "New" -> "Web Service".
   - Connect your repo and choose the branch (e.g., `main`).
   - Root Directory: leave blank unless your app is in a subfolder.
   - Build Command: (optional) `npm install` (Render runs detection automatically).
   - Start Command: `npm start` (we added this script to `package.json`).
   - Instance Type: choose according to traffic; the smallest is fine for testing.
   - Leave Environment as `Node` (Render uses the `engines.node` in `package.json` if present).
   - Create the service.

Render will automatically detect any port the app listens on via `process.env.PORT`. The server in `server.js` already uses `process.env.PORT || 3000`, so no change is necessary.

## WebSockets
Render supports WebSockets. Socket.IO will negotiate WebSocket transport; if a proxy prevents WebSockets, Socket.IO will fall back to polling.

If you later run multiple instances, add a socket adapter (Redis) so Socket.IO instances can broadcast between replicas.

## Optional: Deploy with Docker on Render
If you prefer to use your Dockerfile, choose the "Docker" option when creating a new service.

## Environment variables
- If you need secrets (API keys, etc.), set them in Render under the service's Environment tab.

## Local testing
To run locally:

```powershell
npm install
npm start

# Then open http://localhost:3000 in your browser
```

## Troubleshooting
- If clients can't connect to sockets, check the browser console for connection URL and errors.
- If you put frontend on a different host, configure CORS on the server and ensure the client connects to the correct URL.

---
If you want, I can also:
- Add a GitHub Actions workflow to auto-deploy on push to `main`.
- Run the app locally now and show the console output to confirm it starts.
