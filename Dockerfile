# ---------- STAGE 1: BUILD ----------
FROM cgr.dev/chainguard/node:latest-dev AS build

USER root
# toolchain + python + git
RUN apk add --no-cache build-base python3 git
# node-gyp global e python apontado
RUN npm i -g node-gyp && npm config set python /usr/bin/python3

# usuário e diretório
RUN adduser -D -u 10001 appuser
WORKDIR /app

# deps primeiro (aproveita cache)
COPY package*.json ./
# se tiver package-lock, usa ci; caso contrário, i
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# código
COPY . .
RUN chown -R appuser:appuser /app

# ---------- STAGE 2: RUNTIME ----------
FROM cgr.dev/chainguard/node:latest

USER root
RUN adduser -D -u 10001 appuser

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo \
    PORT=3000

WORKDIR /app
COPY --from=build /app /app
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 3000

# healthcheck -> /health (precisa existir no server.js)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/health', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

CMD ["npm", "start"]
