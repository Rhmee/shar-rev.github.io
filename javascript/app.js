import { Network } from './network.js';

class App {
    constructor() {
        this.newMoviesSection = document.querySelector('.section-new .new-movies');
        this.topMoviesSection = document.querySelector('.section-new .top-movies');
        this.network = new Network(
            'https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114',
            '$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW'
        );
        this.slideIndex = 0;

        this.init();
    }

    async init() {
        this.showSkeletonLoading();
        const newMovies = await this.network.fetchMovies();
        const topMovies = await this.network.fetchMovies();
        this.hideSkeletonLoading();
        if (newMovies) {
            const sortedNewMovies = this.sortMoviesByReleaseDate(newMovies);
            this.displayMoviesNew(this.newMoviesSection, sortedNewMovies);
        }

        if (topMovies) {
            const sortedTopMovies = this.sortMoviesByRateAndPopularity(topMovies);
            this.displayMoviesTop(this.topMoviesSection, sortedTopMovies);
        }

        this.showSlides();
        this.setupSlideEvents();
        this.startAutoSlide(); 
    }


    showSkeletonLoading() {
        const skeletonLoadingHTML = `
        <style>
        .slide {
            display: none;
        }

        .section-new .next {
            display: none;
        }

        .section-review,
        .news,
        h2 {
            display: none;
        }


        .movies-content {
            // margin-left: 10%;
            // margin-right: 10%;
            background-color: #333333;
            color: rgb(255, 255, 255);
            position: relative;
            z-index: -1;
            min-width: 1400px;
            margin: auto;
        }

        .slidee {
            position: relative;
            top: -30px;
            width: 100%;
            height: 500px;
            background-color: #555;
        }

        .section-neww .ug {
            display: inline-block;
        }

        .section-neww,
        .section-revieww {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .neg {
            width: 175px;
            height: 275px;
            background-color: #555;
            border-radius: 15px;
            margin-bottom: 10px;
        }

        .img {
            width: 95px;
            height: 140px;
            background-color: #555;
            border-radius: 15px;
        }

        .new-movies {
            display: flex;
            gap: 20px;
            justify-content: center;
        }

        .ug {
            width: 175px;
            height: 20px;
            background-color: #555;
            border-radius: 5px;
            /* margin-right: 200px; */
        }
    
        .review .article {
            margin-top: 10px;
            display: grid;
            grid-template-columns: auto auto;
        }

        .h3 {
            width: 180px;
            height: 20px;
            background-color: #555;
            border-radius: 5px;
        }

        .jijigimg {
            width: 50px;
            height: 50px;
            background-color: #555;
            border-radius: 50%;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .rev {
            width: 100px;
            height: 20px;
            background-color: #555;
            border-radius: 5px;
            position: absolute;
        }

        .text {
            width: 140px;
            height: 50px;
            background-color: #555;
            border-radius: 5px;
        }

        .rev-info {
            margin-left: 10px;
        }

        .section-neww {
            margin-top: 20px;
        }

        .section-revieww {
            margin-left: 20px;
            margin-top: 20px;
        }
        .egnee{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
        .next .ug:first-child{
            margin-right: 200px;
        }
        .next .ug:last-child{
            margin-left: 200px;
        }
    </style>
    <section class="movies-content" id="movies">
        <div class="slidee"></div>
        <div class="egnee">
            <section class="section-neww">
                <div class="new-movies">
                    <div class="neg"></div>
                    <div class="neg"></div>
                    <div class="neg"></div>
                </div>
            </section>

            <div class="section-revieww">
                <div class="review">
                    <div class="article">
                        <div class="img"></div>
                        <div class="rev-info">
                            <div class="h3"></div>
                            <div class="jijigimg"></div>
                            <div class="text"></div>
                        </div>
                    </div>
                    <div class="article">
                        <div class="img"></div>
                        <div class="rev-info">
                            <div class="h3"></div>
                            <div class="jijigimg"></div>
                            <div class="text"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `;
    
        this.newMoviesSection.innerHTML = skeletonLoadingHTML;
    }
    
      hideSkeletonLoading() {
        const skeletonLoading = this.newMoviesSection.querySelector('.skeleton-loading');
        if (skeletonLoading) {
            skeletonLoading.remove();
        }
    }

    displayMoviesNew(container, movies) {
        this.displayMovies(container, movies, container.classList.contains('new-movies') ? 4 : movies.length);
    }

    displayMoviesTop(container, movies) {
        this.displayMovies(container, movies, container.classList.contains('top-movies') ? 6 : movies.length);
    }

    formatViews(views) {
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
    
    formatRate(rate) {
        return rate.toFixed(1);
    }

    displayMovies(container, movies, numberOfMovies) {
        container.innerHTML = "";

        const displayedMovies = movies.slice(0, numberOfMovies);

        displayedMovies.forEach(movie => {
            const movieArticle = document.createElement("article");
            movieArticle.classList.add("one_movies");

            movieArticle.innerHTML = `
            <a href="/htmls/info.html?id=${movie.id}">
                <div class="imagee">
                    <img src="${movie.poster}" alt="${movie.ner}">
                    <p class="unelgee">
                        <span>${this.formatViews(movie.views)} <i class="fa fa-eye" aria-hidden="true"> </i></span>
                        <span>${this.formatRate(movie.rate)} <i class="fa fa-star" style="color: #ffd747;"> </i></span>
                        <span>${movie.rate} <i class="fa fa-heart" style="color:red"></i> </span>
                    </p>
                </div>
                <h4>${movie.ner}</h4>
            </a>
            `;

            container.appendChild(movieArticle);
        });
    }

    sortMoviesByReleaseDate(movies) {
        return movies.slice().sort((a, b) => {
            const dateA = new Date(a.release_date);
            const dateB = new Date(b.release_date);

            return dateB - dateA;
        });
    }

    sortMoviesByRateAndPopularity(movies) {
        return movies.slice().sort((a, b) => {
            if (b.rate === a.rate) {
                return b.views - a.views; 
            }
            return b.rate - a.rate; 
        });
    }

    showSlides() {
        const slides = document.querySelectorAll(".slidepic");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        this.slideIndex++;

        if (this.slideIndex > slides.length) {
            this.slideIndex = 1;
        }

        slides[this.slideIndex - 1].style.display = "block";
    }

    setupSlideEvents() {
        document.querySelector('.prev').addEventListener('click', () => {
            this.plusSlides(-1);
        });

        document.querySelector('.next').addEventListener('click', () => {
            this.plusSlides(1);
        });
    }

    plusSlides(n) {
        this.showSlides();
    }

    startAutoSlide() {
        setInterval(() => {
            this.plusSlides(1);
        }, 3000); 
    }
}

const app = new App();
