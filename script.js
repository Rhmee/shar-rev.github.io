let slideIndex = 0;
showSlides();

function plusSlides(n) {
    showSlides();
}

document.querySelector('.prev').addEventListener('click', function () {
    plusSlides(-1);
});

document.querySelector('.next').addEventListener('click', function () {
    plusSlides(1);
});


function showSlides() {
    const slides = document.getElementsByClassName("slidepic");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 5000);
}


// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Fetch the specific movie details from JSON
fetch('movies.json')  // Adjust the path based on your file structure
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})    
.then(data => {
        const movie = data.movies.find((i) => i.id == movieId); // Adjusting for array index
        const movieDetailsElement = document.getElementById('movie-details');
        movieDetailsElement.innerHTML = `
        <article class="heseg">
            <img id="Poster_zurag" src="${movie.poster}" alt="${movie.ner} Poster">
        </article>
        <article class="heseg">
            <h2>${movie.ner}</h2>
            <p class="unelgee">
                <span>127K <i class="fa fa-eye" aria-hidden="true"></i></span>
                <span style="color: #ffd747;">&#124;</span>
                <span>8 <i class="fa fa-star" style="color: #ffd747;"></i></span>
                <span style="color: #ffd747;">&#124;</span>
                <span>10 <i class="fa fa-heart" style="color:red"></i></span>
            </p>
            <p>Tөрөл: <span>${movie.genre}</span></p>
            <p>Үргэжлэх хугацаа: <span>${movie.urgeljleh_hugatsaa}</span></p>
            <p>Насны ангилал: <span>${movie.nasnii_angilal}</span></p>
            <p>${movie.tovch_aguulga}</p>
            <p>Найруулагч: <span class="medeelel">${movie.nairuulagch}</span></p>
            <p>Продюсер <span>${movie.producer}</span></p>
            <p>Гол дүр: <span>${movie.jujigchid.join(', ')}</span></p>
        </article>
        <aside style="background-color: rgb(236, 214, 71)" class="heseg">
            <input type="text" class="search" placeholder="Хайх">
            <article>
                <img src="./photos/posters/tushig.jpg" alt="">
                <div>
                    <h2>Гарчиг 1</h2>
                    <p>Товч тайлбар</p>
                    <p>2020/10/20</p>
                </div>
            </article>
            <article>
                <img src="./photos/posters/narrrrr.png" alt="">
                <h2>Гарчиг 1</h2>
                <p>Товч тайлбар</p>
                <p>2020/10/20</p>
            </article>
            <article>
                <h4>Трейлер</h4>
                <video src="youtube.com"></video>
            </article>
        </aside>    
        `;
    })
    .catch(error => console.error('Error fetching data:', error));
