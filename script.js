// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

// Fetch the specific movie details from JSON
fetch('movies.json')  // Adjust the path based on your file structure
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const movie = data.movies[movieId]; // Adjusting for array index
        const movieDetailsElement = document.getElementById('movie-details');
        movieDetailsElement.innerHTML = `
            <li>${movie.ner}</li>
            <li>Төрөл: ${movie.genre}</li>
            <li>Гарсан огноо: ${movie.release_date}</li>
            <li>Үргэлжлэх хугацаа: ${movie.urgeljleh_hugatsaa}</li>
            <li>Насны ангилал: ${movie.nasnii_angilal}</li>
            <li>Товч агуулга: ${movie.tovch_aguulga}</li>
            <li>Найруулагч: ${movie.nairuulagch}</li>
            <li>Продюсер: ${movie.producer}</li>
            <li>Жүжигчид: ${movie.jujigchid.join(', ')}</li>
        `;
    })
    .catch(error => console.error('Error fetching data:', error));
