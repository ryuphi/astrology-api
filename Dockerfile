# Dockerfile — single-stage para evitar erro de tag no runtime
FROM cgr.dev/chainguard/node:20-dev

# Wolfi (apk). Toolchain para node-gyp e libs nativas
RUN apk add --no-cache build-base python3 git

WORKDIR /app

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo \
    PORT=3000

# Instala deps primeiro (aproveita cache)
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# Copia o restante do código (inclui pasta eph/ do Swiss Ephemeris)
COPY . .

# Se tiver build de assets/typescript, rode aqui:
# RUN npm run build

EXPOSE 3000

# Healthcheck simples na raiz (ajuste para /health se existir)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

# Usa o script start do package.json (ex.: "start": "node index.js")
CMD ["npm", "start"]
