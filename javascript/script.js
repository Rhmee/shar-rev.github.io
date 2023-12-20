const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

fetch('/javascript/movies.json')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})    
.then(data => {
        const movie = data.movies.find((i) => i.id == movieId);
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
            <p><i id="icon" onclick="likebtn()" class="far fa-heart"></i></p>
            <p>Tөрөл: <span>${movie.genre}</span></p>
            <p>Үргэжлэх хугацаа: <span>${movie.urgeljleh_hugatsaa}</span></p>
            <p>Гарсан огноо: <span>${movie.release_date}</span></p>
            <p>Насны ангилал: <span>${movie.nasnii_angilal}</span></p>
            <p>${movie.tovch_aguulga}</p>
            <p>Найруулагч: <span class="medeelel">${movie.nairuulagch}</span></p>
            <p>Продюсер <span>${movie.producer}</span></p>
            <p>Гол дүр: <span>${movie.jujigchid.join(', ')}</span></p>
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
    </aside>
        `;
    })
    .catch(error => console.error('Error fetching data:', error));        