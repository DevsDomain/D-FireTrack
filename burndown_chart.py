import requests
import datetime
import matplotlib.pyplot as plt

# Configurações do GitHub
GITHUB_REPO = "usuario/repositorio"  # Substitua pelo seu repositório
GITHUB_TOKEN = "seu_token_de_acesso"  # Gere um token no GitHub (Settings > Developer Settings)

# Obtendo número de Issues abertas
url = f"https://api.github.com/repos/{GITHUB_REPO}/issues?state=open"
headers = {"Authorization": f"token {GITHUB_TOKEN}"}
response = requests.get(url, headers=headers)
issues_abertas = len(response.json())

# Configuração do Burndown Chart
dias_sprint = 14  # Número total de dias da Sprint
total_issues = 20  # Número inicial de tarefas

# Gerando dados do gráfico
dias = list(range(1, dias_sprint + 1))
ideal = [total_issues - (i * (total_issues / dias_sprint)) for i in dias]
real = [total_issues - issues_abertas] + [None] * (dias_sprint - 1)

# Criar gráfico
plt.figure(figsize=(8, 5))
plt.plot(dias, ideal, label="Ideal", linestyle="dashed", color="blue")
plt.plot(dias, real, label="Real", marker="o", color="red")
plt.xlabel("Dias da Sprint")
plt.ylabel("Tarefas Restantes")
plt.title("Burndown Chart - GitHub Issues")
plt.legend()
plt.grid(True)

# Salvando o gráfico como uma imagem no repositório
plt.savefig("burndown_chart.png")
