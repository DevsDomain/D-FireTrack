# **📌 Product Backlog - Mapeamento de Cicatrizes de Queimadas (CBERS4, CBERS4A, Amazônia-1)**

O backlog segue o padrão abaixo para priorização:

- **A** Alta
- **M** Média
- **B** Baixa

---

## **📋 1. Backlog de Produto (Histórias de Usuário)**

| ID       | História do Usuário                                                                                                                               | Prioridade | Tipo    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| **US01** | Como **usuário**, quero **selecionar uma região e período de interesse**, para obter dados específicos da área desejada.                          | **A**      | **RF**  |
| **US02** | Como **usuário**, quero **visualizar imagens dos satélites CBERS-4, CBERS-4A e Amazônia-1**, para analisar áreas queimadas.                       | **A**      | **RF**  |
| **US03** | Como **usuário**, quero **executar o mapeamento automático de cicatrizes de queimadas** com base nas imagens selecionadas.                        | **A**      | **RF**  |
| **US04** | Como **usuário**, quero **visualizar os resultados do mapeamento em uma interface de mapas interativa**.                                          | **A**      | **RF**  |
| **US05** | Como **usuário**, quero **baixar os mapas de cicatrizes de queimadas em formato vetorial**, para utilizá-los em análises externas.                | **A**      | **RF**  |
| **US06** | Como **sistema**, preciso **gerar uma máscara de nuvens automaticamente** para melhorar a precisão do mapeamento.                                 | **M**      | **RF**  |
| **US07** | Como **desenvolvedor**, preciso que a **API suporte o formato COG (Cloud Optimized GeoTIFF)**, para otimizar o processamento de imagens em nuvem. | **M**      | **RNF** |
| **US08** | Como **usuário**, quero **ter acesso aos metadados das imagens**, para entender a origem e qualidade dos dados utilizados.                        | **M**      | **RF**  |
| **US09** | Como **usuário**, quero **poder visualizar o histórico de queimadas por período selecionado**, para monitoramento de longo prazo.                 | **B**      | **RF**  |
| **US10** | Como **usuário**, quero **exportar os dados do mapeamento em diferentes formatos (GeoJSON, SHP, CSV)**, para análises avançadas.                  | **B**      | **RF**  |

---

## **📋 2. Classificação dos Requisitos**

Os requisitos do desafio foram classificados como **funcionais (RF)** e **não funcionais (RNF)**.

### **✅ Requisitos Funcionais (RF)**

| ID       | Requisito                                                                                                  | Atende à História |
| -------- | ---------------------------------------------------------------------------------------------------------- | ----------------- |
| **RF01** | O backend deve receber uma imagem do sensor WFI e gerar uma máscara de nuvem.                              | **US06**          |
| **RF02** | O front-end deve exibir um mapa interativo com imagens WFI e permitir ativar a camada da máscara de nuvem. | **US04**          |
| **RF03** | O sistema deve permitir que o usuário selecione uma região e um período de interesse.                      | **US01**          |
| **RF04** | O sistema deve acessar as imagens do catálogo INPE no formato COG.                                         | **US02**          |
| **RF05** | O sistema deve permitir o download dos mapas de queimadas em formato vetorial.                             | **US05**          |
| **RF06** | A API deve processar automaticamente as imagens e gerar um mapa de queimadas.                              | **US03**          |
| **RF07** | O sistema deve armazenar e permitir a visualização do histórico de queimadas.                              | **US09**          |

---

### **✅ Requisitos Não Funcionais (RNF)**

| ID        | Requisito                                                                     | Atende à História |
| --------- | ----------------------------------------------------------------------------- | ----------------- |
| **RNF01** | A API deve estar bem documentada para integração com outras plataformas.      | **US07**          |
| **RNF02** | O sistema deve suportar formatos GeoJSON, SHP e CSV para exportação de dados. | **US10**          |
| **RNF03** | A interface deve seguir padrões de usabilidade e acessibilidade.              | **US04**          |

---

## **📌 3. Priorização das Histórias de Usuário**

| Prioridade    | Histórias de Usuário                     |
| ------------- | ---------------------------------------- |
| **A (Alta)**  | US01, US02, US03, US04, US05, US06, US07 |
| **M (Média)** | US08, US09, US10                         |
| **B (Baixa)** | US11, US12                               |

---

## **🎯 Conclusão**

- O **Product Backlog** define todas as histórias necessárias para o **mapeamento automático de queimadas**.
- **Os requisitos foram classificados** entre funcionais (RF) e não funcionais (RNF).
