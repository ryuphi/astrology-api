# Dockerfile
FROM node:20-bookworm-slim

# Garantir logs sem buffer e builds reproduzíveis
ENV NODE_ENV=production \
    PYTHONUNBUFFERED=1 \
    TZ=America/Sao_Paulo

# Dependências de compilação para node-gyp e libs nativas
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 build-essential git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instale deps primeiro p/ aproveitar cache
COPY package*.json ./
# Use npm ci em prod; cai para npm i se não houver package-lock
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev; fi

# Copie o restante do código (inclui src/ e eph/ do Swiss Ephemeris)
COPY . .

# Porta padrão do app (ajuste se seu app usar outra)
EXPOSE 3000

# Healthcheck simples (altere a rota se tiver /health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/', r=>{if(r.statusCode<400)process.exit(0);process.exit(1)}).on('error',()=>process.exit(1))"

# Se seu start é "node index.js" ou "node app.js", deixe npm start cuidar disso
CMD ["npm", "start"]
