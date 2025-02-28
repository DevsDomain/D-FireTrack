import os
import requests
import datetime
import matplotlib.pyplot as plt

# Configurações do GitHub
GITHUB_REPO = "DevsDomain/D-FireTrack"  # Substitua pelo seu repositório
GITHUB_TOKEN = "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"

# Verifica se o Token foi carregado corretamente
if not GITHUB_TOKEN:
    raise ValueError("Erro: O token de autenticação GITHUB_TOKEN não foi encontrado. Configure-o no GitHub Secrets ou no ambiente local.")

# Obtendo número de Issues abertas
url = f"https://api.github.com/repos/{GITHUB_REPO}/issues?state=open"
headers = {"Authorization": f"token {GITHUB_TOKEN}"}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Levanta erro se a requisição falhar (404, 403, etc.)
    issues_abertas = len(response.json())
except requests.exceptions.RequestException as e:
    raise SystemExit(f"Erro ao acessar API do GitHub: {e}")

# Configuração do Burndown Chart
dias_sprint = 14  # Número total de dias da Sprint
total_issues = 20  # Número inicial de tarefas

# Gerando dados do gráfico
dias = list(range(1, dias_sprint + 1))
ideal = [total_issues - (i * (total_issues / dias_sprint)) for i in dias]

# Garante que a linha real sempre tenha valores válidos
real = [max(0, total_issues - issues_abertas)] + [None] * (dias_sprint - 1)

# Criar gráfico
plt.figure(figsize=(8, 5))
plt.plot(dias, ideal, label="Ideal", linestyle="dashed", color="blue")
plt.plot(dias, real, label="Real", marker="o", color="red")

# Melhorias visuais
plt.xlabel("Dias da Sprint")
plt.ylabel("Tarefas Restantes")
plt.title("Burndown Chart - GitHub Issues")
plt.xticks(dias, rotation=45)
plt.legend()
plt.grid(True)

# Salvando o gráfico como uma imagem no repositório
plt.savefig("burndown_chart.png", dpi=300)
print("Burndown Chart gerado com sucesso: burndown_chart.png")
