# ---- Stage 1: build (tem toolchain)
FROM cgr.dev/chainguard/node:20-dev AS build
# cgr.dev/chainguard/* usa Wolfi (apk)
# Pacotes para node-gyp e nativos
RUN apk add --no-cache build-base python3 git

WORKDIR /app

# Instala dependências primeiro para aproveitar cache
COPY package*.json ./
# Em produção, geralmente omitimos dev deps; ajuste se precisar compilar algo que está em devDependencies
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# Copia o restante do código
COPY . .

# (Opcional) se você gera build/artefatos, rode aqui (ex.: npm run build)
# RUN npm run build

# ---- Stage 2: runtime (sem toolchain, mais leve e seguro)
FROM cgr.dev/chainguard/node:20

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo

WORKDIR /app

# Copia tudo do build (node_modules já compilados)
COPY --from=build /app /app

# Ajuste a porta conforme seu app
EXPOSE 3000

# Healthcheck simples na raiz (mude a rota se tiver /health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

# Usa o start do package.json (ajuste se necessário)
CMD ["npm", "start"]
