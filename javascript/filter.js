let moviesData;
const API_URL = "https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114";
const API_KEY1 = "$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW";

document.addEventListener("DOMContentLoaded", function () {
    const moviesSection = document.getElementById("movies");

    const headers = {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY1,
    };

    fetch(API_URL, {headers})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (Array.isArray(data.record.movies)) {
            moviesData = data.record.movies;
            displayMovies(moviesData);

            document.getElementById("byPopularity").addEventListener("click", sortByPopularity);
            document.getElementById("byGenre").addEventListener("change", applyFilters);
            document.getElementById("byRating").addEventListener("change", applyFilters);
            document.getElementById("byYear").addEventListener("change", applyFilters);
            document.getElementById("A_Z").addEventListener("click", sortAlphabetically);
        } else {
            console.error("Data.record.movies is not an array.");
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

    let filteredMovies = moviesData;

    if (selectedGenre !== "AllMovie") {
        filteredMovies = filteredMovies.filter(movie => movie.genre === selectedGenre);
    }

    if (selectedRating !== "AllRate") {
        filteredMovies = filteredMovies.filter(movie => {
            if (selectedRating === "5") {
                return movie.rate <= 5.99;
            } else {
                const lowerBound = parseInt(selectedRating);
                const upperBound = lowerBound + 1;
                return movie.rate >= lowerBound && movie.rate < upperBound;
            }
        });
    }

    if (selectedYear !== "AllYear") {
        filteredMovies = filteredMovies.filter(movie =>
            new Date(movie.release_date).getFullYear() === parseInt(selectedYear)
        );
    }

    if (selectedRating === "AllRate") {
        filteredMovies = filteredMovies.sort((a, b) => b.rate - a.rate);
    }

    displayMovies(filteredMovies);
}


function sortAlphabetically() {
    const sortedMovies = [...moviesData].sort((a, b) => a.ner.localeCompare(b.ner, 'en', { sensitivity: 'base' }));
    displayMovies(sortedMovies);
}