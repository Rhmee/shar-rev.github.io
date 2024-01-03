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
                <span>127K <i class="fa fa-eye" aria-hidden="true"></i></span>
                <span class="spacer"></span>
                <span>8 <i class="fa fa-star" style="color: #ffd747;"></i></span>
                <span class="spacer"></span>
                <span class="like-count" id="likeCount">0</span>    
                <span><i class="fa fa-heart" style="color:red"></i></span>
            </p>
            <p class="like-button" id="likeButton" >
                <i id="icon" class="fas fa-heart like-icon" onclick="toggleLike()"></i>
            </p>
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
                <article class="jijigReview">
                    <img class="proff" src="/photos/posters/tushig.jpg" alt="">
                    <div>
                        <h4 class="rewInfo">Гарчиг 1</h2>
                        <p class="rewInfo">Товч тайлбар</p>
                        <p class="yDay">2020/10/20</p>
                    </div>
                </article>
                <article class="jijigReview">
                    <img class="proff" src="/photos/posters/narrrrr.png" alt="">
                    <div>
                        <h4 class="rewInfo">Гарчиг 1</h2>
                        <p class="rewInfo">Товч тайлбар</p>
                        <p class="yDay">2020/10/20</p>
                    </div>
                </article>
            </section>
            <article>
                <h4>Трейлер</h4>
                <video src="youtube.com"></video>
            </article>
        </aside>  `;
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
