# STAC API - Busca e Download de Imagens de Satélite

## 🎯 **Descrição do Projeto**

Essa API permite buscar coleções de imagens de satélites fornecidas pelo INPE (Instituto Nacional de Pesquisas Espaciais) através do STAC (SpatioTemporal Asset Catalog). Ela também suporta o download de imagens por banda específica, permitindo trabalhar com diferentes satélites como **Sentinel-2**, **CBERS-4**, **Landsat-8**, entre outros.

A API foi construída em **Node.js** com **TypeScript**, utilizando **Express** e **Swagger** para documentação.

---

## 📁 **Estrutura de Pastas**

```
stac-api/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── collectionsController.ts
│   │   └── searchController.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── routes/
│   │   ├── collections.ts
│   │   └── search.ts
│   ├── services/
│   │   └── stacService.ts
│   ├── openapi.json
│   ├── server.ts
│   └── swagger.ts
├── temp/
├── package-lock.json
├── package.json
└── tsconfig.json
```

---

## 🚀 **Instalação e Configuração**

### **1️⃣ Clone o repositório:**

```bash
git clone <URL_DO_REPOSITORIO>
cd stac-api
```

### **2️⃣ Instale as dependências:**

```bash
npm install
```

### **3️⃣ Execute a API:**

```bash
npm run start
```

O servidor estará disponível em: **http://localhost:3000**

### **📄 Acessando a documentação Swagger**

A API possui documentação interativa utilizando o Swagger. Para acessá-la, basta abrir o navegador e ir até:

👉 **http://localhost:3000/docs**

---

## 🔍 **Endpoints Disponíveis**

### 1️⃣ **Buscar coleções disponíveis**

**GET /collections**

- **Descrição:** Retorna uma lista das coleções disponíveis.
- **Exemplo:**

```bash
curl http://localhost:3000/collections
```

📌 **Resposta de exemplo:**

```json
{
  "collections": [
    "S2-16D-2",
    "CBERS4-WFI-16D-2",
    "CBERS-WFI-8D-1",
    "CBERS4-MUX-2M-1",
    "AMZ1-WFI-L4-SR-1"
  ]
}
```

---

### 2️⃣ **Buscar imagens em uma coleção**

**GET /search**

- **Parâmetros:**

  - `collection` (obrigatório): Nome da coleção de imagens
  - `bbox` (opcional): Coordenadas da área de interesse (`minX,minY,maxX,maxY`)
  - `datetime` (opcional): Intervalo de tempo (`AAAA-MM-DD/AAAA-MM-DD`)
  - `limit` (opcional): Número máximo de resultados

- **Exemplo:**

```bash
curl "http://localhost:3000/search?collection=S2-16D-2&bbox=-60,-10,-50,-5&datetime=2023-01-01/2023-12-31&limit=1"
```

📌 **Resposta de exemplo:**

```json
{
  "features": [
    {
      "id": "S2-16D_V2_018016_20231219",
      "collection": "S2-16D-2",
      "bbox": [-60, -10, -50, -5],
      "datetime": "2023-06-15T00:00:00Z",
      "assets": {
        "B01": { "href": "https://example.com/band_B01.tif" },
        "B02": { "href": "https://example.com/band_B02.tif" },
        "thumbnail": { "href": "https://example.com/thumbnail.png" }
      }
    }
  ]
}
```

---

### 3️⃣ **Download de imagem por banda**

**GET /search/download**

- **Parâmetros:**

  - `collection` (obrigatório): Nome da coleção
  - `itemId` (obrigatório): ID do item retornado pela busca
  - `band` (obrigatório): Banda desejada (exemplo: `B08`, `B02`, `thumbnail`)

- **Exemplo:**

```bash
curl -o imagem_B08.tif "http://localhost:3000/search/download?collection=S2-16D-2&itemId=S2-16D_V2_018016_20231219&band=B08"
```

📌 **Respostas possíveis:**

- **200 OK:** Download da imagem
- **400 Bad Request:** Parâmetros inválidos ou ausentes
- **404 Not Found:** Banda ou item não encontrado
- **500 Internal Server Error:** Falha no download

---

## 🛠️ **Tratamento de Erros**

A API possui middleware para capturar erros e retornar mensagens padronizadas.

- **400:** Erros de validação (exemplo: parâmetros faltando)
- **404:** Item ou banda não encontrada
- **500:** Erro inesperado do servidor

Exemplo de resposta para erro 400:

```json
{
  "error": "O parâmetro 'collection' é obrigatório e deve ser uma string"
}
```
