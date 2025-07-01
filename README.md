# 📁 Drawing Mapoteca — Consulta Ágil de Desenhos da Engenharia

Bem-vindo ao **Drawing Mapoteca**, uma aplicação simples e poderosa para acesso rápido aos projetos e desenhos da engenharia diretamente pelo navegador! 🚀

---

## ✨ O que é este projeto?

Este sistema permite buscar, visualizar e acessar **desenhos técnicos em PDF e DXF** organizados em uma pasta central (servidor da engenharia), utilizando um servidor Node.js rápido e uma interface web estática.  
Ideal para equipes que precisam de agilidade para localizar revisões, compartilhar arquivos ou simplesmente visualizar o conteúdo sem perder tempo! ⏱️

---

## ⚡ Principais Vantagens

- **Busca instantânea:** digite o início do código e veja todas as revisões disponíveis em tempo real.
- **Separação inteligente:** resultados de PDF e DXF são exibidos em áreas distintas.
- **Acesso histórico:** visualize rapidamente os últimos arquivos abertos para não perder produtividade.
- **Zero instalação no cliente:** basta acessar pelo navegador (Chrome, Edge, etc).
- **Integração com seu software CAD:** arquivos DXF abrem automaticamente no aplicativo padrão (ex: eDrawings).

## 🖼️ c  COMO FUNCIONA??

Pesquise pelo início do código (ex: 12345 R0) para listar todos os desenhos relacionados, independente da revisão.
Sim! Ele aceita espaço o código para separar a revisão.

Abra PDFs direto no navegador.
Clique em DXF para abrir no aplicativo de sua preferência.
O histórico sempre mostra os últimos 5 arquivos acessados de cada tipo, facilitando o acesso rápido aos projetos mais usados.

## 🖼️ c  COMO FUNCIONA??
Para rodar a aplicação, entre na pasta da aplicação no terminal com o comando:

//Onde você salvou a pasta.
Exemplo: cd C:\drawing-mapoteca

## 🛠️ **RODANDO DO BACK COM CMD FECHADO**

1 - Agora, para garantir que o servidor continue rodando mesmo se você fechar o CMD, você pode usar o pm2. Primeiro, instale o pm2 globalmente com o comando:
      npm install -g pm2

2- Depois, rode o servidor em background (em segundo plano) com:
      pm2 start server.js

3- Assim, seu Node.js continua ativo mesmo que a janela do terminal seja fechada.
      Para ver o status de execução do servidor, utilize:
         pm2 list

4- Se quiser parar o servidor, rode:
      pm2 stop server.js

5- E caso deseje que o servidor inicie automaticamente com o Windows, use:
      pm2 startup
      pm2 save

      Acesse a aplicação pelo navegador em http://localhost:8090.

---

## 🚀 Ganhe tempo, evite confusões e mantenha o fluxo da engenharia!
Simples, rápido e pronto para ser customizado conforme a rotina do seu setor.
Fale com o time de engenharia para dúvidas, melhorias ou sugestões!
Feito com ❤️ para tornar o acesso aos projetos mais fácil e ágil.






## 🛠️ **EXPERIMENTE**

**Clone este repositório:**
   ```bash
   git clone https://github.com/sua-empresa/drawing-mapoteca.git


