# ---- Stage 1: build (com toolchain p/ node-gyp)
FROM cgr.dev/chainguard/node:latest-dev AS build

# subir a permissão só para instalar pacotes
USER root
RUN apk add --no-cache build-base python3 git
USER nonroot

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

COPY . .

# ---- Stage 2: runtime
FROM cgr.dev/chainguard/node:latest

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo \
    PORT=3000

WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000

# healthcheck aponta para /health (adicione essa rota no server.js)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/health', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

CMD ["npm", "start"]
