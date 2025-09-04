# ---- Stage 1: build (com toolchain p/ node-gyp)
FROM cgr.dev/chainguard/node:latest-dev AS build
# Imagens Chainguard usam apk (Wolfi)
RUN apk add --no-cache build-base python3 git

WORKDIR /app
ENV NODE_ENV=production

# Instalar deps primeiro p/ aproveitar cache
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# Copiar código (inclui a pasta eph/ do Swiss Ephemeris)
COPY . .

# Caso você gere build de TS/webpack, rode aqui:
# RUN npm run build

# ---- Stage 2: runtime (mínimo)
FROM cgr.dev/chainguard/node:latest

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo \
    PORT=3000

WORKDIR /app

# Copia a app pronta com node_modules já compilados
COPY --from=build /app /app

EXPOSE 3000

# Healthcheck simples (ajuste rota/porta se necessário)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

# Usa o script "start" do package.json (ex.: node index.js)
CMD ["npm", "start"]
