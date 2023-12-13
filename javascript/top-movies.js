document.addEventListener("DOMContentLoaded", function () {
    const topMoviesSection = document.querySelector('.section-new .top-movies');

    fetch("/javascript/movies.json")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.movies)) {
                const sortedMovies = data.movies.sort((a, b) => {
                    if (b.rate === a.rate) {
                        return b.views - a.views; 
                    }
                    return b.rate - a.rate; 
                });
                const topMovies = sortedMovies.slice(0, 6);

                displayTopRatedMovies(topMoviesSection, topMovies);
            } else {
                console.error("Data.movies is not an array.");
            }
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

function displayTopRatedMovies(container, movies) {
    container.innerHTML = ""; 

    movies.forEach(movie => {
        const movieArticle = document.createElement("article");
        movieArticle.classList.add("one_movies");

        movieArticle.innerHTML = `
            <a href="/htmls/info.html?id=${movie.id}">
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

        container.appendChild(movieArticle);
    });
}
