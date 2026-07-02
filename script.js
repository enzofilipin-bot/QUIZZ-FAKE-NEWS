// Banco de dados base de perguntas (Serão sorteadas infinitamente)
const quizDatabase = [
    { text: "Cientistas criaram um tomate que brilha no escuro usando DNA de vaga-lume para facilitar a colheita noturna.", isFato: false },
    { text: "A Grande Muralha da China não pode ser vista do espaço a olho nu por astronautas orbitando a Terra.", isFato: true },
    { text: "A NASA confirmou que um asteroide feito inteiramente de ouro passará perto da Terra este ano.", isFato: false },
    { text: "O WhatsApp passará a ser pago a partir do próximo mês se você não repassar uma mensagem para 20 contatos.", isFato: false },
    { text: "Existe um lago no Senegal, chamado Lago Retba, que possui águas naturalmente cor-de-rosa devido a uma alga.", isFato: true },
    { text: "Tomar banho gelado logo após comer causa congestão cerebral instantânea e fatal.", isFato: false },
    { text: "Os camelos não guardam água em suas corcovas, mas sim gordura que serve como reserva de energia.", isFato: true },
    { text: "Mastigar chiclete permanece no seu estômago por sete anos se você engoli-lo.", isFato: false },
    { text: "Bananas são ligeiramente radioativas porque contêm altos níveis de potássio.", isFato: true },
    { text: "A rede de fast-food McDonald's originalmente vendia cachorros-quentes, não hambúrgueres.", isFato: true }
];

// Ranking inicial padrão exibido na tela inicial
let leaderboard = [
    { name: "CyberGamer", score: 25 },
    { name: "FatoCheck", score: 18 },
    { name: "Anti_Fake", score: 12 },
    { name: "NerdMaster", score: 9 }
];

let currentUser = "";
let currentScore = 0;
let currentQuestion = null;

// Executa assim que a página termina de carregar
window.onload = function() {
    renderRanking();
    simulateLiveStats();
};

// Renderiza e ordena o Ranking na tela inicial
function renderRanking() {
    const box = document.getElementById("ranking-box");
    if (!box) return;
    
    box.innerHTML = "";
    // Ordena do maior para o menor placar
    leaderboard.sort((a, b) => b.score - a.score);
    
    leaderboard.forEach((user, index) => {
        box.innerHTML += `
            <div class="ranking-item">
                <span>${index + 1}º ${user.name}</span>
                <span style="color: gold;">${user.score} pts</span>
            </div>
        `;
    });
}

// Simula quantidade de usuários online e acessos ativos mudando dinamicamente
function simulateLiveStats() {
    let online = 142;
    let visitas = 3410;
    
    setInterval(() => {
        online += Math.floor(Math.random() * 7) - 3; // Oscila os usuários online
        visitas += Math.floor(Math.random() * 3);     // Aumenta os acessos totais
        
        document.getElementById("online-count").innerText = online;
        document.getElementById("total-visitas").innerText = visitas.toLocaleString();
    }, 3000);
}

// Inicia o Jogo após validação do nome
function startGame() {
    const input = document.getElementById("username");
    if (input.value.trim() === "") {
        alert("Por favor, digite um nome de usuário para jogar!");
        return;
    }
    
    currentUser = input.value.trim();
    currentScore = 0;
    
    document.getElementById("display-name").innerText = currentUser;
    document.getElementById("score").innerText = currentScore;
    
    // Altera a exibição das telas
    document.getElementById("screen-login").classList.add("hidden");
    document.getElementById("screen-game").classList.remove("hidden");
    
    nextQuestion();
}

// Sorteia perguntas infinitas do banco de dados
function nextQuestion() {
    document.getElementById("feedback-text").innerText = "";
    
    // Escolhe um índice aleatório do banco de questões
    const randomIndex = Math.floor(Math.random() * quizDatabase.length);
    currentQuestion = quizDatabase[randomIndex];
    
    document.getElementById("question-text").innerText = currentQuestion.text;
}

// Verifica se a resposta clicada está certa ou errada
function checkAnswer(playerChoice) {
    const feedback = document.getElementById("feedback-text");
    
    if (playerChoice === currentQuestion.isFato) {
        currentScore++;
        document.getElementById("score").innerText = currentScore;
        feedback.innerText = "✨ Correto! Você somou +1 ponto.";
        feedback.style.color = "var(--correct-green)";
    } else {
        feedback.innerText = "❌ Errado! Fique mais atento.";
        feedback.style.color = "var(--wrong-red)";
    }

    // Atualiza o ranking em tempo real caso o jogador alcance novas posições
    updateLiveLeaderboard();

    // Aguarda 2 segundos exibindo o resultado antes de mandar a próxima pergunta
    setTimeout(nextQuestion, 2000);
}

// Atualiza ou insere a pontuação do jogador atual na lista de líderes
function updateLiveLeaderboard() {
    let userRecord = leaderboard.find(u => u.name === currentUser);
    if (userRecord) {
        userRecord.score = currentScore;
    } else {
        leaderboard.push({ name: currentUser, score: currentScore });
    }
    renderRanking();
}
