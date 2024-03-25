
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
console.log("Movie ID:", movieId);
localStorage.setItem("movieId", movieId);

const fetchMoviesData = async (movieId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/movies/kino/${movieId}`, {
            method: 'GET'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch movies: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return null;
    }
}

const fetchReviewsData = async (movieId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/movies/review/${movieId}`, {
            method: 'GET'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch movies: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return null;
    }
}

function generateMovieDetailsHTML(movie) {
    if (!movie) {
        return "<p>Movie details not available</p>";
    }

    const jujigchidList = Array.isArray(movie.actors) ? movie.actors : [];

    const jujigchidString = jujigchidList.join(', ');

    const views = movie.views !== undefined ? movie.views : "Views not available";

    const movieDetailsHTML = `
        <style>
            
        </style>
        <article class="heseg">
            <img id="Poster_zurag" src="${movie.poster}" alt="${movie.name} Poster">
        </article>
        <article class="heseg">
            <h2>${movie.name || 'Unknown'}</h2>
            <p class="unelgee">
                <span>${formatViews(views)} <i class="fa fa-eye" aria-hidden="true"></i></span>
                <span>${movie.rate} <i class="fa fa-star" style="color: #ffd747;"></i></span>
                <span>${movie.likes} <i class="fa fa-heart" style="color:red"></i></span>
            </p>
            <p>Tөрөл: <span>${movie.genre || 'Genre not available'}</span></p>
            <p>Үргэжлэх хугацаа: <span>${movie.duration || 'Duration not available'}</span></p>
            <p>Гарсан огноо: <span>${movie.date || 'Date not available'}</span></p>
            <p>Насны ангилал: <span>${movie.pg || 'PG not available'}</span></p>
            <p>${movie.summary || "No summary available"}</p>
            <p>Найруулагч: <span class="medeelel">${movie.director || 'Director not available'}</span></p>
            <p>Продюсер: <span>${movie.producer || 'Producer not available'}</span></p>
            <p>Гол дүр: <span>${jujigchidString}</span></p>
            <h3>Шүүмж бичих</h3>
            <rating-component count="0"></rating-component>
            <script>
                let likeCount = 0;
                let isLiked = false;
        
                function toggleLike() {
                    isLiked = !isLiked;
                    likeCount += isLiked ? 1 : -1;
                    updateLike();
                }
        
                function updateLike() {
                    const likeIcon = document.querySelector('.like-icon');
                    const likeCountElement = document.querySelector('#likeCount');
                    likeIcon.classList.toggle('liked', isLiked);
                    likeCountElement.textContent = likeCount;
                }
            </script>
        </article>
        <aside class="hesegbish">
            <input type="text" class="search" placeholder="Хайх">
            <section>
                <!-- Your review articles go here -->
            </section>
            <article>
                <h4>Трейлер</h4>
                <video src="${movie.trailerUrl || ''}"></video>
            </article>
        </aside>
    `;
    return movieDetailsHTML;
}

function formatViews(views) {
    if (views >= 1000000000) {
        return (views / 1000000000).toFixed(1) + "B";
    } else if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + "K";
    } else {
        return views;
    }
}

function generateStarRatingHTML() {
    let starsHTML = '';
    for (let i = 10; i >= 1; i--) {
        starsHTML += `
            <input type="radio" name="rating" id="rate${i}">
            <label for="rate${i}">
                <!-- Replace the SVG code for each star here -->
                <svg id="Object" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1122 1122">
                    <path class="cls-2" d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.428-3.564,6.124-2.798,9.704l35.69,209.543c1.62,9.523-8.466,16.69-16.498,11.846l-186.883-98.43c-3.441-1.816-7.536-1.816-10.977,0l-186.883,98.43c-8.032,4.844-17.118-2.323-16.498-11.846l35.69-209.543c0.766-3.581-0.302-7.276-2.798-9.704l-151.724-147.895c-6.287-6.127-2.818-16.803,5.87-18.065l209.678-30.468c3.449-0.502,6.431-2.668,7.974-5.794l93.771-190c4.139-8.381,14.392-8.381,18.531,0z" fill="#010002"/>
                </svg>
            </label>`;
    }
    return starsHTML;
}

fetchMoviesData(movieId)
    .then(movieArray => {
        if (Array.isArray(movieArray) && movieArray.length > 0) {
            const movie = movieArray[0];
            console.log("Fetched movie data:", movie); 
            
            const movieDetailsHTML = generateMovieDetailsHTML(movie);
            document.getElementById("movie-details").innerHTML = movieDetailsHTML;
        } else {
            console.error("Empty or invalid movie data received.");
        }
    })
    .catch(error => {
        console.error("Error fetching movie data:", error);
    });


    function loginButton() {
        let user = localStorage.getItem("user");
        let login = '';
        if (user) {
            login += `
                <input type="radio" name="rating" id="rate${i}">
                <label for="rate${i}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1122 1122">
                        <path d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.428-3.564,6.124-2.798,9.704l35.69,209.543c1.62,9.523-8.466,16.69-16.498,11.846l-186.883-98.43c-3.441-1.816-7.536-1.816-10.977,0l-186.883,98.43c-8.032,4.844-17.118-2.323-16.498-11.846l35.69-209.543c0.766-3.581-0.302-7.276-2.798-9.704l-151.724-147.895c-6.287-6.127-2.818-16.803,5.87-18.065l209.678-30.468c3.449-0.502,6.431-2.668,7.974-5.794l93.771-190c4.139-8.381,14.392-8.381,18.531,0z" fill="#010002"/>
                    </svg>
                </label>`;
        } else {
            login += ``
        }
        return starsHTML;
    }

    