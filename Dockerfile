# ---------- STAGE 1: BUILD ----------
FROM cgr.dev/chainguard/node:latest-dev AS build

# 1) Trabalhamos como root para instalar toolchain e compilar deps nativas
USER root
RUN apk add --no-cache build-base python3 git

# 2) Criamos um usuário de aplicação (UID fixo)
RUN adduser -D -u 10001 appuser

WORKDIR /app

# 3) Instalar dependências primeiro (aproveita cache)
COPY package*.json ./
# use npm ci quando houver lockfile; senão npm i
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# 4) Copiar código
COPY . .

# 5) Permissões da pasta da app para o usuário não-root
RUN chown -R appuser:appuser /app

# ---------- STAGE 2: RUNTIME ----------
FROM cgr.dev/chainguard/node:latest

# Trabalhamos como root só para criar o usuário e ajustar permissões
USER root
RUN adduser -D -u 10001 appuser

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo \
    PORT=3000

WORKDIR /app

# Copiamos tudo que já foi instalado/compilado
COPY --from=build /app /app

# Garantir ownership correto
RUN chown -R appuser:appuser /app

# Agora sim, rodamos como usuário da aplicação
USER appuser

EXPOSE 3000

# Healthcheck bate em /health (adicione essa rota no server.js)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/health', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

# Usa o script start do package.json
CMD ["npm", "start"]
