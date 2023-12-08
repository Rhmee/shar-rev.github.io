document.addEventListener("DOMContentLoaded", function () {
    const moviesSection = document.getElementById("movies");
    fetch("/javascript/movies.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);s
            if (Array.isArray(data.movies)) {
                displayMovies(data.movies);
            } else {
                console.error("Data.movies is not an array.");
            }
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

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
                        <span>${movie.views} <i class="fa fa-eye" aria-hidden="true"></i></span>
                        <span>${movie.rate} <i class="fa fa-star" style="color: #ffd747;"></i></span>
                        <span>${movie.rate} <i class="fa fa-heart" style="color:red"></i></span>
                    </p>
                </div>
                <h4>${movie.ner}</h4>
            </a>
        `;

        moviesSection.appendChild(movieArticle);
    });
}
