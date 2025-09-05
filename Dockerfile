# ---------- STAGE 1: BUILD ----------
FROM cgr.dev/chainguard/node:latest-dev AS build

# Precisamos de root para instalar toolchain e utilitários
USER root
RUN apk add --no-cache build-base python3 git
# node-gyp no PATH
RUN npm i -g node-gyp
# node-gyp detecta este python
ENV npm_config_python=/usr/bin/python3

# Usuário de app (opcional, boa prática)
RUN adduser -D -u 10001 appuser

WORKDIR /app

# Instale deps primeiro (cache)
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# Copie o restante (inclui pasta eph/)
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

# Healthcheck aponta para /health (garanta a rota no server.js)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/health', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

# IMPORTANTE: a imagem base já tem ENTRYPOINT ["node"].
# Portanto, passe APENAS o caminho do seu script aqui.
CMD ["/app/server.js"]
