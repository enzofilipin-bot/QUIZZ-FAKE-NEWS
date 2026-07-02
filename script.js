// Banco de dados com 15 perguntas de curiosidades sobre Fake News
const questions = [
    {
        question: "Em qual século surgiu o termo 'Fake News' na imprensa escrita em inglês?",
        options: [
            { text: "No século XXI, com o avanço do Facebook.", correct: false },
            { text: "No século XIX, por volta do final de 1890.", correct: true },
            { text: "No século XV, logo após a invenção da imprensa de Gutenberg.", correct: false }
        ]
    },
    {
        question: "De acordo com um estudo do MIT, as notícias falsas se espalham com qual velocidade em relação às verdadeiras no Twitter?",
        options: [
            { text: "A mesma velocidade.", correct: false },
            { text: "Duas vezes mais devagar.", correct: false },
            { text: "Até seis vezes mais rápido.", correct: true }
        ]
    },
    {
        question: "Qual emoção humana as Fake News mais costumam despertar para viralizar tão rápido?",
        options: [
            { text: "Alegria e otimismo.", correct: false },
            { text: "Surpresa e indignação/raiva.", correct: true },
            { text: "Tristeza e melancolia.", correct: false }
        ]
    },
    {
        question: "O que significa o termo 'Deepfake'?",
        options: [
            { text: "Vídeos ou áudios alterados por Inteligência Artificial que parecem reais.", correct: true },
            { text: "Textos jornalísticos extremamente longos e falsos.", correct: false },
            { text: "Sites antigos que foram hackeados por criminosos.", correct: false }
        ]
    },
    {
        question: "Qual o nome dado a contas automatizadas que fingem ser pessoas reais para espalhar boatos na internet?",
        options: [
            { text: "Spammers.", correct: false },
            { text: "Haters.", correct: false },
            { text: "Bots (ou robôs).", correct: true }
        ]
    },
    {
        question: "Historicamente, qual imperador romano usou 'propaganda falsa' em moedas para difamar seu rival Marco Antônio?",
        options: [
            { text: "Otávio Augusto.", correct: true },
            { text: "Nero.", correct: false },
            { text: "Júlio César.", correct: false }
        ]
    },
    {
        question: "Qual dessas áreas costuma ser o maior alvo de desinformação no mundo?",
        options: [
            { text: "Saúde e Política.", correct: true },
            { text: "Esportes e Entretenimento.", correct: false },
            { text: "Cinema e Moda.", correct: false }
        ]
    },
    {
        question: "Em 1938, uma transmissão de rádio sobre uma 'invasão alienígena' gerou pânico nos EUA. Qual era o nome da obra?",
        options: [
            { text: "Guerra dos Mundos.", correct: true },
            { text: "O Dia em que a Terra Parou.", correct: false },
            { text: "Contatos Imediatos.", correct: false }
        ]
    },
    {
        question: "O que são as chamadas 'Agências de Fact-Checking'?",
        options: [
            { text: "Empresas que criam anúncios patrocinados.", correct: false },
            { text: "Organizações focadas em checar e verificar se um boato é real ou falso.", correct: true },
            { text: "Redes sociais focadas em imagens.", correct: false }
        ]
    },
    {
        question: "Qual o perigo da 'Bolha de Filtros' gerada pelos algoritmos das redes sociais?",
        options: [
            { text: "Mostrar apenas visões de mundo parecidas com a sua, facilitando a crença em Fake News.", correct: true },
            { text: "Apagar fotos antigas do seu perfil.", correct: false },
            { text: "Bloquear o acesso à internet em computadores públicos.", correct: false }
        ]
    },
    {
        question: "Qual termo técnico descreve a criação intencional de conteúdo falso para causar danos ou obter lucros?",
        options: [
            { text: "Misinformação.", correct: false },
            { text: "Desinformação.", correct: true },
            { text: "Malformação.", correct: false }
        ]
    },
    {
        question: "Por que as Fake News costumam imitar o design visual de portais de notícias famosos?",
        options: [
            { text: "Para confundir o leitor e parecerem fontes legítimas e confiáveis.", correct: true },
            { text: "Porque os layouts são de código aberto.", correct: false },
            { text: "Para economizar dinheiro com designers gráficos.", correct: false }
        ]
    },
    {
        question: "O fenômeno psicológico em que as pessoas tendem a acreditar em informações que confirmam suas próprias crenças chama-se:",
        options: [
            { text: "Efeito Amnésia.", correct: false },
            { text: "Viés de Confirmação.", correct: true },
            { text: "Dissonância Temporal.", correct: false }
        ]
    },
    {
        question: "Qual a melhor forma de combater a proliferação de boatos na internet?",
        options: [
            { text: "Ler apenas o título e repassar para os grupos.", correct: false },
            { text: "Não compartilhar nada sem verificar a fonte e a data da publicação.", correct: true },
            { text: "Discutir agressivamente nos comentários da publicação.", correct: false }
        ]
    },
    {
        question: "Sites satíricos (de humor) que inventam piadas em formato de notícias são considerados Fake News?",
        options: [
            { text: "Sim, porque mentir na internet é sempre crime.", correct: false },
            { text: "Não, desde que fique claro o caráter humorístico, embora pessoas desatentas possam cair.", correct: true },
            { text: "Sim, pois a comédia não é permitida no jornalismo.", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizScreen.style.display = 'block';
    scoreScreen.style.display = 'none';
    nextButton.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    // Exibe também o número da pergunta atual (ex: 1/15)
    questionElement.innerHTML = `<span style="color: #777; font-size: 0.9rem; display: block; margin-bottom: 5px;">Pergunta ${currentQuestionIndex + 1} de ${questions.length}</span>${currentQuestion.question}`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        if (option.correct) {
            button.dataset.correct = option.correct;
        }
        button.addEventListener('click', selectOption);
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
    }

    Array.from(optionsContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    quizScreen.style.display = 'none';
    scoreScreen.style.display = 'block';
    
    // Mensagem personalizada dependendo do rendimento do jogador
    let mensagem = "";
    if (score === questions.length) {
        mensagem = "👑 Impressionante! Você é um mestre da checagem de fatos!";
    } else if (score >= 10) {
        mensagem = "🧠 Muito bem! Você conhece bastante sobre o assunto.";
    } else if (score >= 5) {
        mensagem = "⚠️ Atenção. Você conhece o básico, mas cuidado para não cair em boatos!";
    } else {
        mensagem = "🚨 Perigo! Você precisa se informar melhor para não ser enganado.";
    }

    finalScoreElement.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br><br><span style="font-size: 1.1rem; color: #555;">${mensagem}</span>`;
}

restartButton.addEventListener('click', startQuiz);

// Inicia o quiz automaticamente
startQuiz();
