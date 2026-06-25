const perguntas = [
  {q:"O que são Fake News?", o:["Notícias verdadeiras","Notícias falsas","Livros","Vídeos educativos"], a:1},
  {q:"Fake News podem causar?", o:["Nada","Confusão e medo","Alegria","Sono"], a:1},
  {q:"Qual rede espalha mais Fake News?", o:["Redes sociais","Bibliotecas","Escolas","Museus"], a:0},
  {q:"Deve compartilhar tudo que vê?", o:["Sim","Não"], a:1},
  {q:"Fake News são sempre fáceis de identificar?", o:["Sim","Não"], a:1},

  {q:"Qual é um sinal de Fake News?", o:["Fonte desconhecida","Site oficial","Jornal confiável","Livro didático"], a:0},
  {q:"O que fazer antes de compartilhar?", o:["Verificar fonte","Compartilhar rápido","Ignorar","Apagar internet"], a:0},
  {q:"Fake News podem afetar saúde?", o:["Sim","Não"], a:0},
  {q:"Qual é um exemplo de Fake News?", o:["Cura milagrosa sem prova","Notícia científica","Relatório oficial","Livro escolar"], a:0},
  {q:"É importante checar datas?", o:["Sim","Não"], a:0},

  {q:"Fake News existem só na internet?", o:["Sim","Não"], a:1},
  {q:"Qual atitude correta?", o:["Compartilhar sem ler","Checar fontes","Ignorar tudo","Criar boatos"], a:1},
  {q:"Fake News podem influenciar eleições?", o:["Sim","Não"], a:0},
  {q:"Quem pode criar Fake News?", o:["Qualquer pessoa","Só jornalistas","Só professores","Só cientistas"], a:0},
  {q:"Fake News sempre parecem falsas?", o:["Sim","Não"], a:1},

  {q:"O que é desinformação?", o:["Informação falsa","Livro","Notícia oficial","Estudo"], a:0},
  {q:"Fake News podem viralizar?", o:["Sim","Não"], a:0},
  {q:"Fontes confiáveis são importantes?", o:["Sim","Não"], a:0},
  {q:"Compartilhar sem ler é seguro?", o:["Sim","Não"], a:1},
  {q:"Fake News podem causar pânico?", o:["Sim","Não"], a:0},

  {q:"Qual é uma boa prática?", o:["Verificar fatos","Espalhar rápido","Ignorar tudo","Criar boatos"], a:0},
  {q:"Fake News podem ser imagens falsas?", o:["Sim","Não"], a:0},
  {q:"Deepfakes são?", o:["Vídeos falsos","Livros","Sites oficiais","Jornais"], a:0},
  {q:"Fake News são crime em alguns casos?", o:["Sim","Não"], a:0},
  {q:"É importante checar autores?", o:["Sim","Não"], a:0},

  {q:"Fake News podem manipular opinião?", o:["Sim","Não"], a:0},
  {q:"Notícia sem fonte confiável é segura?", o:["Sim","Não"], a:1},
  {q:"Fake News podem causar prejuízo financeiro?", o:["Sim","Não"], a:0},
  {q:"Sempre devemos duvidar de tudo?", o:["Sim","Não"], a:1},
  {q:"Checar fatos ajuda a combater Fake News?", o:["Sim","Não"], a:0},
];

let nivel = 0;
let acertos = 0;
let respostaSelecionada = null;

function carregarPergunta() {
  if (nivel >= perguntas.length) {
    mostrarResultado();
    return;
  }

  const atual = perguntas[nivel];

  document.getElementById("nivel").innerText = `Nível: ${nivel+1} / 30`;
  document.getElementById("pergunta").innerText = atual.q;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  atual.o.forEach((op, i) => {
    const btn = document.createElement("div");
    btn.classList.add("opcao");
    btn.innerText = op;

    btn.onclick = () => {
      respostaSelecionada = i;

      if (i === atual.a) {
        acertos++;
      }

      // trava resposta
      document.querySelectorAll(".opcao").forEach(b => b.style.pointerEvents = "none");
      btn.style.background = "#16a34a";
    };

    opcoesDiv.appendChild(btn);
  });
}

function proximaPergunta() {
  nivel++;
  carregarPergunta();
}

function mostrarResultado() {
  document.querySelector(".quiz-box").style.display = "none";

  const resultado = document.getElementById("resultadoFinal");
  resultado.classList.remove("hidden");

  let msg = "";

  if (acertos >= 25) msg = "🔥 Excelente! Você domina Fake News!";
  else if (acertos >= 15) msg = "👍 Bom! Mas ainda pode melhorar.";
  else msg = "⚠️ Você precisa treinar mais sobre Fake News.";

  resultado.innerHTML = `
    <h2>🎯 RESULTADO FINAL</h2>
    <p>Você acertou <b>${acertos}</b> de <b>30</b> perguntas</p>
    <p>${msg}</p>
    <button onclick="location.reload()">Jogar novamente</button>
  `;
}

carregarPergunta();
