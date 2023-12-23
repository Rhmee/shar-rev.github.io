const URL = "https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114";
const API_KEY = "$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW";

document.addEventListener("DOMContentLoaded", function () {
    const moviesSection = document.getElementById("movies");

    const headers = {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
    };

    fetch(URL, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data && data.record && Array.isArray(data.record.movies)) {
                displayMovies(data.record.movies, moviesSection);
            } else {
                console.error("Data.record.movies is not an array or is not present.");
            }
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

function formatViews(views) {
    if (views >= 1000000000) {
        return (views / 1000000000).toFixed(1) + 'B';
    } else if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    } else {
        return views.toString();
    }
}

function formatRate(rate) {
    return rate.toFixed(2);
}

function displayMovies(movies) {
    const moviesSection = document.getElementById("movies");
    moviesSection.innerHTML = "";
    movies.forEach(movie => {
        const movieArticle = document.createElement("article");
        movieArticle.classList.add("one_movies");

        movieArticle.innerHTML = `
            <a href="info.html?id=${movie.id}">
                <div class="imagee">
                    <img src="${movie.poster}" alt="${movie.ner}">
                    <p class="unelgee">
                        <span>${formatViews(movie.views)} <i class="fa fa-eye" aria-hidden="true"></i></span>
                        <span>${formatRate(movie.rate)} <i class="fa fa-star" style="color: #ffd747;"></i></span>
                        <span>${movie.rate} <i class="fa fa-heart" style="color:red"></i></span>
                    </p>
                </div>
                <h4>${movie.ner}</h4>
            </a>
        `;

        moviesSection.appendChild(movieArticle);
    });
}
