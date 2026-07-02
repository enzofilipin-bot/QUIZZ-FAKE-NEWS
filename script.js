// Banco de dados melhorado com quizzes realistas e desafiadores
const quizDatabase = [
    { text: "Existe um tipo de fungo na Amazônia que consegue infectar formigas, assumir o controle de seus cérebros e transformá-las em 'zumbis'.", isFato: true },
    { text: "Carregar o celular usando o notebook ou a entrada USB da TV queima a bateria do smartphone duas vezes mais rápido.", isFato: false },
    { text: "A Coreia do Norte e a Finlândia são separadas geograficamente por apenas um único país: a Rússia.", isFato: true },
    { text: "Comer sementes de melancia faz com que elas nasçam e cresçam dentro do seu estômago devido aos ácidos do corpo.", isFato: false },
    { text: "O famoso 'estalo' que ouvimos ao puxar os dedos da mão não é o osso batendo, mas sim bolhas de gás explodindo nas articulações.", isFato: true },
    { text: "Uma nova inteligência artificial conseguiu traduzir perfeitamente latidos de cachorros para frases em inglês.", isFato: false },
    { text: "O mel de abelha legítimo é o único alimento do mundo que nunca estraga, podendo durar milhares de anos intacto.", isFato: true },
    { text: "O deserto do Saara passa por um ciclo natural e, a cada 20 mil anos, ele se transforma completamente em uma floresta verdejante.", isFato: true },
    { text: "Ler mensagens no celular no escuro antes de dormir emite uma radiação que altera permanentemente a cor da íris dos olhos.", isFato: false },
    { text: "As impressões digitais dos coalas são tão parecidas com as dos humanos que podem facilmente confundir peritos em cenas de crimes.", isFato: true }
];

// Competidores fictícios que simulam atividade ao vivo
let leaderboard = [
    { name: "Alok_Check", score: 14 },
    { name: "Bruna_Fatos", score: 11 },
    { name: "Davi_AntiFake", score: 8 },
    { name: "GamerVerdade", score: 5 }
];

let currentUser = "";
let currentScore = 0;
let currentQuestion = null;
let liveGameInterval = null; // Controla os bots jogando

window.onload = function() {
    renderRanking();
    simulateLiveStats();
    startFakePlayersAction(); // Ativa os "jogadores falsos" progredindo
};

function renderRanking() {
    const box = document.getElementById("ranking-box");
    if (!box) return;
    
    box.innerHTML = "";
    // Organiza do maior pontuador para o menor
    leaderboard.sort((a, b) => b.score - a.score);
    
    leaderboard.forEach((user, index) => {
        let medal = `${index + 1}º`;
        if (index === 0) medal = "🥇";
        if (index === 1) medal = "🥈";
        if (index === 2) medal = "🥉";

        box.innerHTML += `
            <div class="ranking-item" style="${user.name === currentUser ? 'color: var(--accent-cyan); font-weight: bold;' : ''}">
                <span>${medal} ${user.name}</span>
                <span style="color: gold;">${user.score} pts</span>
            </div>
        `;
    });
}

// Faz com que os outros competidores fiquem ganhando pontos sozinhos para simular realidade
function startFakePlayersAction() {
    liveGameInterval = setInterval(() => {
        // Escolhe um bot aleatório para subir de ponto de vez em quando
        const randomBotIndex = Math.floor(Math.random() * leaderboard.length);
        if (leaderboard[randomBotIndex].name !== currentUser) {
            // Chance de 60% de ganhar 1 ponto a cada ciclo
            if (Math.random() > 0.4) {
                leaderboard[randomBotIndex].score += 1;
                renderRanking();
            }
        }
    }, 4000); // Roda a simulação a cada 4 segundos
}

function simulateLiveStats() {
    let online = 247;
    let visitas = 8450;
    
    setInterval(() => {
        online += Math.floor(Math.random() * 9) - 4; 
        visitas += Math.floor(Math.random() * 4);     
        
        document.getElementById("online-count").innerText = online;
        document.getElementById("total-visitas").innerText = visitas.toLocaleString();
    }, 2500);
}

function startGame() {
    const input = document.getElementById("username");
    if (input.value.trim() === "") {
        alert("Por favor, digite um nome de usuário para iniciar!");
        return;
    }
    
    currentUser = input.value.trim();
    currentScore = 0;
    
    document.getElementById("display-name").innerText = currentUser;
    document.getElementById("score").innerText = currentScore;
    
    // Insere o jogador real na competição ativa
    leaderboard.push({ name: currentUser, score: 0 });
    
    document.getElementById("screen-login").classList.add("hidden");
    document.getElementById("screen-game").classList.remove("hidden");
    
    nextQuestion();
}

function nextQuestion() {
    document.getElementById("feedback-text").innerText = "";
    
    const randomIndex = Math.floor(Math.random() * quizDatabase.length);
    currentQuestion = quizDatabase[randomIndex];
    
    document.getElementById("question-text").innerText = currentQuestion.text;
}

function checkAnswer(playerChoice) {
    const feedback = document.getElementById("feedback-text");
    
    if (playerChoice === currentQuestion.isFato) {
        currentScore++;
        document.getElementById("score").innerText = currentScore;
        feedback.innerText = "✨ Resposta Correta! +1 Ponto.";
        feedback.style.color = "var(--correct-green)";
    } else {
        feedback.innerText = "❌ Errado! Essa afirmação não confere.";
        feedback.style.color = "var(--wrong-red)";
    }

    // Alinha os pontos do jogador no ranking global
    let userRecord = leaderboard.find(u => u.name === currentUser);
    if (userRecord) userRecord.score = currentScore;
    
    renderRanking();

    setTimeout(nextQuestion, 2000);
}
