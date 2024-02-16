let quiz = [];
let turul = '';

function showHint() {
    let hintElement = document.getElementById('hint');
    hintElement.style.display = hintElement.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    turul = urlParams.get('turul');
    if (turul) {
        fetchQuizData(turul);
    }
});

async function fetchQuizData(turul) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/movies/quiz', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch quiz');
        }
        const data = await response.json();
        this.quiz = data;
        this.loadQuizData(turul);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function loadQuizData(type) {
    let jsonData = this.quiz;
    
    const shuffledQuiz = shuffleArray(jsonData);
    const quizData = shuffledQuiz.find(item => item.Type === type);
    if (quizData) {
        document.getElementById('hint').textContent = quizData.hint;
        const contentContainer = document.getElementById('contentContainer');
        contentContainer.innerHTML = '';
        
        const btn = `<button onclick="answer('${quizData.name}')">Илгээх</button>`
        document.getElementById('answer').innerHTML = btn;

        if (quizData.turul === 'Poster') {
            const imgElement = document.createElement('img');
            imgElement.src = quizData.poster;
            imgElement.alt = 'Кино Постер';
            imgElement.classList.add('img');
            contentContainer.appendChild(imgElement);
        } 
        else if (quizData.turul === 'Bichleg') {
            const pElement = document.createElement('p');
            pElement.innerHTML = `<a href="${quizData.youtubeLink}" target="_blank">Watch on YouTube</a>`;
            contentContainer.appendChild(pElement);
        } else {
            const pElement = document.createElement('p');
            pElement.textContent = quizData.info;
            contentContainer.appendChild(pElement);
        }
    }
}

function answer(correct) {
    
    const answerField = document.getElementById('inputHere');
    if(answerField.value == correct) {
        const btn = `<button id="answer" onclick="next()">Зөв</button>`
        document.getElementById('answer').innerHTML = btn;
    } else {
        answerField.value = correct;
        const btn = `<button id="answer" onclick="next()">Буруу</button>`
        document.getElementById('answer').innerHTML = btn;
    }
    
}

function next() {
    const answerField = document.getElementById('inputHere');
    answerField.value = '';
    fetchQuizData(turul);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array)
    return array;
}
