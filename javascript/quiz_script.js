function showHint() {
    let hintElement = document.getElementById('hint');
    hintElement.style.display = hintElement.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const turul = urlParams.get('turul');
    if (turul) {
        loadQuizData(turul);
    }
});

function loadQuizData(turul) {
    const jsonData = {
        "quiz": [
            {
                "turul": "Ner",
                "id": "1",
                "medeelel": "Taavar end bn",
                "ner": "Кино1",
                "hint": "Кино1 байна шдэээ"
            },
            {
                "turul": "Eshlel",
                "id": "1",
                "medeelel": "Mash sonin",
                "ner": "Кино2",
                "hint": "Кино2 байна шдэээ"
            },
            {
                "turul": "Bichleg",
                "id": "1",
                "Link": "https://www.youtube.com/watch?v=tdmVnJY2Kr8&list=RDtdmVnJY2Kr8&start_radio=1",
                "ner": "Кино3",
                "hint": "Кино3 байна шдэээ"
            },
            {
                "turul": "Poster",
                "id": "1",
                "poster": "/photos/posters/quiz_poster.jpg",
                "ner": "Кино4",
                "hint": "Кино4 байна шдэээ"
            },
            {
                "turul": "Poster",
                "id": "2",
                "poster": "/photos/posters/bayn_bool.jpg",
                "ner": "Кино5",
                "hint": "Кино5 байна шдэээ"
            },
            {
                "turul": "Poster",
                "id": "3",
                "poster": "/photos/posters/etgeed.jpg",
                "ner": "Кино6",
                "hint": "Кино6 байна шдэээ"
            }
        ]
    };
    // if (quizData) {
    //     document.getElementById('poster').src = quizData.poster;
    //     document.getElementById('hint').textContent = quizData.hint;
    // }
    const shuffledQuiz = shuffleArray(jsonData.quiz);
    const quizData = shuffledQuiz.find(item => item.turul === turul);

    if (quizData) {
        document.getElementById('hint').textContent = quizData.hint;
        const contentContainer = document.getElementById('contentContainer');
        const hintElement = document.getElementById('hint');

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
            pElement.textContent = quizData.medeelel;
            contentContainer.appendChild(pElement);
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
