<h1 align="center">🌍 D-FireTrack</h1>

## :memo: Desafio
Este projeto tem como objetivo o desenvolvimento de uma solução completa (API, aplicação web) para o mapeamento automático de cicatrizes de queimadas utilizando imagens do sensor WFI a bordo dos satélites CBERS4, CBERS4A e Amazônia 1. O projeto será desenvolvido com base em técnicas de Deep Learning e processamento em nuvem.
 
## 🖥️ Protótipo Navegavel Figama
[Assista ao funcionamento do produto!] 


### 🏁 Entregas de Sprints





Cada entrega foi realizada a partir da criação de uma **tag** Observe a relação a seguir:
| Sprint | Previsão de entrega | Status | Release | Kanban | BurnDown |
|:--:|:----------:|:-------------------|:-------------------:|:-------------------:|:-------------------:|
| 01 | 15/04/2025 | ✅ Concluída | [Ver release 1]() | [Ver Sprint 1]() | [Ver BurnDown 1]() |
| 02 | 13/05/2025 | 🚧 Em andamento | [Ver release 2]() | [Ver Sprint 2]() | [Ver BurnDown 2]() |
| 03 | 10/06/2025 | 🕓 Não Iniciada | [Ver release 3]() | [Ver Sprint 3]() | [Ver BurnDown 3]() |

## 📋 Product Backlog - Mapeamento de Cicatrizes de Queimadas
O Product Backlog segue o padrão de priorização:
- *A* Alta
- *M* Média
- *B* Baixa

---

### *📋 1. Backlog de Produto (Histórias de Usuário)*

| ID       | História do Usuário                                                                                                                               | Prioridade | Tipo    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| *US01* | Como *usuário, quero **selecionar uma região e período de interesse, para obter dados específicos da área desejada.                          | **A*      | *RF*  |
| *US02* | Como *usuário, quero **visualizar imagens dos satélites CBERS-4, CBERS-4A e Amazônia-1, para analisar áreas queimadas.                       | **A*      | *RF*  |
| *US03* | Como *usuário, quero **executar o mapeamento automático de cicatrizes de queimadas* com base nas imagens selecionadas.                        | *A*      | *RF*  |
| *US04* | Como *usuário, quero **visualizar os resultados do mapeamento em uma interface de mapas interativa.                                          | **A*      | *RF*  |
| *US05* | Como *usuário, quero **baixar os mapas de cicatrizes de queimadas em formato vetorial, para utilizá-los em análises externas.                | **A*      | *RF*  |
| *US06* | Como *sistema, preciso **gerar uma máscara de nuvens automaticamente* para melhorar a precisão do mapeamento.                                 | *M*      | *RF*  |
| *US07* | Como *desenvolvedor, preciso que a **API suporte o formato COG (Cloud Optimized GeoTIFF), para otimizar o processamento de imagens em nuvem. | **M*      | *RNF* |
| *US08* | Como *usuário, quero **ter acesso aos metadados das imagens, para entender a origem e qualidade dos dados utilizados.                        | **M*      | *RF*  |
| *US09* | Como *usuário, quero **poder visualizar o histórico de queimadas por período selecionado, para monitoramento de longo prazo.                 | **B*      | *RF*  |
| *US10* | Como *usuário, quero **exportar os dados do mapeamento em diferentes formatos (GeoJSON, SHP, CSV), para análises avançadas.                  | **B*      | *RF*  |

---

### *📋 2. Classificação dos Requisitos*

Os requisitos do desafio foram classificados como *funcionais (RF)* e *não funcionais (RNF)*.

### *✅ Requisitos Funcionais (RF)*

| ID       | Requisito                                                                                                  | Atende à História |
| -------- | ---------------------------------------------------------------------------------------------------------- | ----------------- |
| *RF01* | O backend deve receber uma imagem do sensor WFI e gerar uma máscara de nuvem.                              | *US06*          |
| *RF02* | O front-end deve exibir um mapa interativo com imagens WFI e permitir ativar a camada da máscara de nuvem. | *US04*          |
| *RF03* | O sistema deve permitir que o usuário selecione uma região e um período de interesse.                      | *US01*          |
| *RF04* | O sistema deve acessar as imagens do catálogo INPE no formato COG.                                         | *US02*          |
| *RF05* | O sistema deve permitir o download dos mapas de queimadas em formato vetorial.                             | *US05*          |
| *RF06* | A API deve processar automaticamente as imagens e gerar um mapa de queimadas.                              | *US03*          |
| *RF07* | O sistema deve armazenar e permitir a visualização do histórico de queimadas.                              | *US09*          |

---

### *✅ Requisitos Não Funcionais (RNF)*

| ID        | Requisito                                                                     | Atende à História |
| --------- | ----------------------------------------------------------------------------- | ----------------- |
| *RNF01* | A API deve estar bem documentada para integração com outras plataformas.      | *US07*          |
| *RNF02* | O sistema deve suportar formatos GeoJSON, SHP e CSV para exportação de dados. | *US10*          |
| *RNF03* | A interface deve seguir padrões de usabilidade e acessibilidade.              | *US04*          |

---

## *📌 3. Priorização das Histórias de Usuário*

| Prioridade    | Histórias de Usuário                     |
| ------------- | ---------------------------------------- |
| *A (Alta)*  | US01, US02, US03, US04, US05, US06, US07 |
| *M (Média)* | US08, US09, US10                         |
| *B (Baixa)* | US11, US12                               |

---

## 🔧 Tecnologias utilizadas

#### Backend
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-blue?style=for-the-badge&logo=jest&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-%2300B2A0.svg?style=for-the-badge&logo=swagger&logoColor=white)

#### Frontend
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/Jest-blue?style=for-the-badge&logo=jest&logoColor=white)
![React Leaflet](https://img.shields.io/badge/React_Leaflet-%2300A859.svg?style=for-the-badge&logo=react&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

#### IA/Deep Learning
![Python](https://img.shields.io/badge/Python-%2337769E.svg?style=for-the-badge&logo=python&logoColor=white)

<span id="equipe">

## :busts_in_silhouette: Equipe

|    Função     | Nome                           |                                                                                                                                                      LinkedIn & GitHub                                                                                                                                                      |
| :-----------: | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   Product Owner    | Abner Rodrigo       |   [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/abnercosta97) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/abnercosta97)   |
Scrum Master    | Claudia Nunes  |                              [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/claudia-nuness) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/Claudia-Nunes)         |
| Dev Team | Michael Morais      |                                               [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/michael-morais22/) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/itsmorais)                                               |
| Dev Team  |  Fernando Davi     |        [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/fernando-davi-492842276) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/fnddavi)                             |
|   Dev Team    | Juliana Maciel   |                                               [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/juliana-maciel-manso) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/Jummanso)                                               |
|   Dev Team    | Laura Gabriel   |                                               [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)]( https://www.linkedin.com/in/eulauragabriel/) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)]( https://github.com/eulauragabriel)                                               |



