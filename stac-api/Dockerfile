# Dockerfile para rodar a STAC API com TypeScript diretamente (sem build)

FROM node:22-alpine

# Instalar dependências necessárias
RUN apk add --no-cache bash

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json tsconfig.json ./

# Instalar dependências (inclusive dev)
RUN npm install

# Copiar código-fonte
COPY . .

# Expor a porta padrão da aplicação
EXPOSE 3333

# Comando para iniciar a aplicação diretamente em TypeScript
CMD ["npx", "ts-node", "src/server.ts"]
# Para rodar a aplicação, use o seguinte comando:
# docker build -t stac-api .
# docker run -p 3333:3333 stac-api
# flag -d para rodar em background
# Para rodar a aplicação com hot reload, use o seguinte comando:
# docker run -p 3333:3333 -v $(pwd):/app stac-api
# Para rodar a aplicação com hot reload e TypeScript, use o seguinte comando:       
# docker run -p 3333:3333 -v $(pwd):/app stac-api npx ts-node src/server.ts

