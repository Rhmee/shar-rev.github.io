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
        const newMovies = await this.network.fetchMovies();
        const topMovies = await this.network.fetchMovies();

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

    displayMoviesNew(container, movies) {
        this.displayMovies(container, movies, container.classList.contains('new-movies') ? 3 : movies.length);
    }

    displayMoviesTop(container, movies) {
        this.displayMovies(container, movies, container.classList.contains('top-movies') ? 6 : movies.length);
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
