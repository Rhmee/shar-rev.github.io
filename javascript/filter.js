let moviesData;

document.addEventListener("DOMContentLoaded", function () {
    const moviesSection = document.getElementById("movies");

    fetch("/javascript/movies.json")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.movies)) {
                moviesData = data.movies;
                displayMovies(moviesData);

                document.getElementById("byPopularity").addEventListener("click", sortByPopularity);
                document.getElementById("byGenre").addEventListener("change", applyFilters);
                document.getElementById("byRating").addEventListener("change", applyFilters);
                document.getElementById("byYear").addEventListener("change", applyFilters);
                document.getElementById("A_Z").addEventListener("click", sortAlphabetically);
            } else {
                console.error("Data.movies is not an array.");
            }
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

function sortByPopularity() {
    const sortedMovies = [...moviesData].sort((a, b) => b.views - a.views);
    displayMovies(sortedMovies);
}

function applyFilters() {
    const selectedGenre = document.getElementById("byGenre").value;
    const selectedRating = document.getElementById("byRating").value;
    const selectedYear = document.getElementById("byYear").value;

    const filteredMovies = moviesData.filter(movie =>
        (selectedGenre === "AllMovie" || movie.genre === selectedGenre) &&
        (selectedRating === "AllRate" || (selectedRating === "5" ? movie.rate <= 5.99 : (movie.rate >= parseInt(selectedRating) && movie.rate < parseInt(selectedRating) + 1))) &&
        (selectedYear === "AllYear" || (new Date(movie.release_date).getFullYear() === parseInt(selectedYear)))
    );

    displayMovies(filteredMovies);
}


function sortAlphabetically() {
    const sortedMovies = [...moviesData].sort((a, b) => a.ner.localeCompare(b.ner, 'en', { sensitivity: 'base' }));
    displayMovies(sortedMovies);
}