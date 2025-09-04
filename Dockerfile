# ---------- STAGE 1: BUILD ----------
FROM cgr.dev/chainguard/node:latest-dev AS build

# Precisa ser root para instalar toolchain e utilitários
USER root
# Toolchain para compilar dependências nativas do sweph
RUN apk add --no-cache build-base python3 git
# node-gyp global para garantir que está no PATH
RUN npm i -g node-gyp
# Indica o Python ao node-gyp via variável de ambiente
ENV npm_config_python=/usr/bin/python3

# Cria um usuário fixo para a app (boa prática)
RUN adduser -D -u 10001 appuser

WORKDIR /app

# Instale deps primeiro para aproveitar cache
COPY package*.json ./
# Se existir package-lock, usa ci; senão, i
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# Copie o restante do projeto (inclui a pasta eph/)
COPY . .
# Ajusta permissões
RUN chown -R appuser:appuser /app

# ---------- STAGE 2: RUNTIME ----------
FROM cgr.dev/chainguard/node:latest

# Root só para criar usuário e acertar permissões
USER root
RUN adduser -D -u 10001 appuser

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo \
    PORT=3000

WORKDIR /app
# Traz tudo que já foi instalado/compilado
COPY --from=build /app /app
RUN chown -R appuser:appuser /app

# Agora roda como não-root
USER appuser

EXPOSE 3000

# Healthcheck mirando /health (certifique que existe no server.js)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/health', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

# Deixe explícito qual arquivo iniciar (não dependa do ENTRYPOINT da imagem)
CMD ["node", "/app/server.js"]
