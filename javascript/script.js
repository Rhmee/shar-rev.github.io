const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const URL = "https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114";
const API_KEY = "$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW";

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function formatRate(rate) {
    return rate.toFixed(1);
}

fetch(URL, {
    method: 'GET',
    headers: {
        'X-Master-Key': API_KEY,
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})    
.then(data => {
    const movie = data.record.movies.find((i) => i.id == movieId);
    const movieDetailsElement = document.getElementById('movie-details');
    movieDetailsElement.innerHTML = generateMovieDetailsHTML(movie);
})
.catch(error => {
    console.error('Error fetching movie details:', error);
});

function generateMovieDetailsHTML(movie) {
    return `
        <article class="heseg">
            <img id="Poster_zurag" src="${movie.poster}" alt="${movie.ner} Poster">
        </article>
        <article class="heseg">
            <h2>${movie.ner}</h2>
            <p class="unelgee">
                <span>${formatNumberWithCommas(movie.views)}<i class="fa fa-eye" aria-hidden="true"></i></span>
                <span style="color: #ffd747;">&#124;</span>
                <span>${formatRate(movie.rate)}<i class="fa fa-star" style="color: #ffd747;"></i></span>
                <span style="color: #ffd747;">&#124;</span>
                <span>${movie.rate}<i class="fa fa-heart" style="color:red"></i></span>
            </p>
            <p><i id="icon" onclick="likebtn()" class="far fa-heart"></i></p>
            <p>Tөрөл: <span>${movie.genre}</span></p>
            <p>Үргэжлэх хугацаа: <span>${movie.urgeljleh_hugatsaa}</span></p>
            <p>Гарсан огноо: <span>${movie.release_date}</span></p>
            <p>Насны ангилал: <span>${movie.nasnii_angilal}</span></p>
            <p>${movie.tovch_aguulga}</p>
            <p>Найруулагч: <span class="medeelel">${movie.nairuulagch}</span></p>
            <p>Продюсер: <span>${movie.producer}</span></p>
            <p>Гол дүр: <span>${movie.jujigchid.join(', ')}</span></p>
            <h3>Шүүмж бичих</h3>
            <rating-component count="0"></rating-component>
        </article>`;
}

