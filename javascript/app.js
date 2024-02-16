import { Network } from './network.js';

class App {
    constructor() {
        this.newMoviesSection = document.querySelector('.section-new .new-movies');
        this.topMoviesSection = document.querySelector('.section-new .top-movies');
        this.network = new Network('http://localhost:3000/api/v1/movies/kino');
        this.slideIndex = 0;

        this.init();
    }

    async init() {
        try {
            this.showSkeletonLoading();
        const newMovies = await this.network.fetchMoviesData();
        const topMovies = await this.network.fetchMoviesData();

        console.log("New Movies:", newMovies);
        console.log("Top Movies:", topMovies);


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
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    showSkeletonLoading() {
        const skeletonLoadingHTML = `
        <style>
        .slide {
            max-width: 100%;
            position: relative;
            margin: auto;
            overflow: hidden;
            padding: 0 !important;
        }
        
        .slidepic {
            display: none;
        }
        .slide img {
            width: 100%;
            height: 500px;
            object-fit: cover;
        }
        section.slide a.prev, .slide a.next {
            position:absolute;
            top: 40%;
            width: auto;
            padding: 16px;
            margin: -22px;
            color: yellow;
            font-size: 100px;
            cursor: pointer;
            transition: 0.5s;
        }
        .slide a.prev {
            left: 10px;
        }
        .slide a.prev:hover, .slide a.next:hover {
            transform: scale(1.25);
        }
        .slide a.next {
            right: 10px;
        }
        
        /*Зурагт хэмжээг нь өгч тохируулж байна*/
        .one_movies a div img{
            border-radius: 15px;
        }
        /*Hover хийх зурагт хэмжээг нь өгч тохируулж байна*/
        div article a div{
            overflow: hidden; 
        }
        /* Зургийн hover хийх үед шар хүрээ үүсгэх */
        div article a div:hover {
            border-radius: 15px;
            box-shadow: 0 0 20px #ffd474;
        }
        /*Зургийн hover хийх үед томруулна */
        div article a div:hover img {
            transform: scale(1.1); /* Зургийг 1.1 удаа томруулах */
        }
        div article a div:hover .unelgee {
            opacity: 1;
          }
        /*h4 доторх тохиргоог өгч байна*/
        div .one_movies a{
            color: white;
            text-decoration: none;
            text-align: center;
        }   
        div .one_movies a{
            position: relative;
        }
        .imagee {
            position: relative;
            overflow: hidden;
        }
        .unelgee{
            position: absolute; 
            bottom: 0px;
            left: 0;
            background: rgba(0, 0, 0, 0.5); 
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
            color: #f1f1f1; 
            width: 100%;
            opacity:0;
            color: white;
            font-size: 1rem;
            margin: 0;
            padding-top: 1rem;
            padding-bottom: 1rem;
            text-align: center;
          }
        /**/
        
        .one_movies{
            width: 175px; 
        }
        .new-movies {
            display: flex; 
            grid-template-columns: repeat(3, 1fr) ; 
            gap: 67.9px;
            flex-wrap: wrap;
            width: auto;
        }
        .section-new .next p{
            margin-top: 0;
            margin-bottom: 0.5rem;
        }
        .next h2{
            margin: 0;
        }
        /* .section-new .next p {
            float: right;
            margin-top: 30px;
        } */
        .section-new h2, p {
            display: inline-block;
        }
        article {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .section-top {
            margin-right: 120px;
            margin-top: 30px;
        }
        
        .section-top h2, p {
            display: inline-block;
        }
        
        .next p {
            color: #ffd474;
            float: right;
            margin-top: 30px;
        }
        h2{
            margin-left: 5%;
            margin-top: 0;
            margin-bottom: 0;
        }
        .top-movies {
            display: flex; 
            align-items: center;
            grid-template-columns: repeat(6, 1fr) ; 
            gap: 67.9px;
            flex-wrap: wrap;
        }
        .news article img {
            height: 125px;
            width: 150px;
            object-fit: cover;
            border-radius: 10px;
        }
        .news {
            display: flex;
            justify-content: space-around;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            flex-wrap: wrap;
            margin: 5%;
            margin-top: 1%;
        }
        .news article {
            display: grid;
            grid-template-columns: auto auto;
            width: 480px;
            justify-content: flex-start;
            background-color:  #555555;
            border-radius: 10px;
            padding: 10px 20px 20px 20px;
        }
        .section-new, .section-review {
            display: inline-flex;
            flex-direction: column;
        }
        .section-review{
            margin-left: 5%;
        }
        .news div h2{
            margin-top: 0;
            margin-bottom: 10px;
        } 
        .news div p{
            margin-top: 0;
            margin-bottom: 10px;
            text-align: justify;
        } 
        .news div {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            margin-top: 0;
        }
        .news article div time {
            color: lightgray;
            font: italic;
            margin-left: auto;
        }
        .one_movies a div img{
            border-radius: 15px;
            max-width: 100%;
            aspect-ratio: 2/3;
            object-fit: cover;
        }
        
        /*hailt*/
        .modal {
            display: none;
            position: fixed;
            top: 150px;
            right: 180px;
            width: 300px;
            height: 200px;
            justify-content: center;
            align-items: center;
            z-index: 1;
        }
        
        .modal-content {
            background-color: blue;
            padding: 20px;
            border-radius: 10px;
            position: relative;
            z-index: 2;
        }
        
        .close-button {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }
        
        .result_img img {
            border-radius: 15px;
            width: 80px; /* Set the width */
            height: 120px; /* Set the height */
            object-fit: cover;
            display: block;
        }
        
        .result_img {
            width: 80px; /* Set the width */
            height: 120px; /* Set the height */
            overflow: hidden;
            display: inline-block;
            margin-right: 10px;
        }
        
        .result_link {
            color: white;
            text-decoration: none;
            text-align: center;
            display: inline-block;
            vertical-align: top;
        }
        
        .result_container {
            width: 80px; /* Set the width */
            max-width: 100%;
            margin-bottom: 10px;
        }
        @media(max-width: 430px){
            .slide{
                margin-top: 3.7rem;
                text-align: center;
                justify-content: center;
            } 
            .slide img {
                max-width: 100%;
                height: 200px;
                aspect-ratio: 3/1;
                object-fit: cover;
            }
            section.slide a.prev, section.slide a.next {
                top: 35%;
                width: auto;
                font-size: 40px;
            }
            h2 {
                font-size: 1rem;
        
            }
            .section-new p{
                margin-top: 10px;
            }
            .section-new{
                margin: 0;
                padding: 5%;
            }
            article h4 {
                margin: 5px 0;
            }
            /**/
            .one_movies {
                width: 30% !important;
            }
            .unelgee {
                display: none;
            }
            .section-new{
                max-width: 100%;
            }
        
            div article a div{
                overflow: hidden; 
            }
            .new-movies {
                display: flex; 
                grid-template-columns: repeat(3, 1fr) ; 
                gap: 10px;
                flex-wrap: wrap;
                width: auto;
            }
            aside{
                max-width: 100%;
            }
            .section-review{
                margin: 0;
                padding: 5%;
            }
            .section-top{
                width: 100%;
            }
            .top-movies {
                display: flex; 
                grid-template-columns: repeat(3, 1fr) ; 
                gap: 10px;
                flex-wrap: wrap;
                width: auto;
            }
            .news article img {
                height: 100px;
                width: 120px;
                object-fit: cover;
                border-radius: 10px;
            }
        }
        @media (min-width: 431px) and (max-width: 999px){
            body{
                margin-left: 0;
                margin-right: 0;
            }
            .slide{
                max-width: 90%;
                margin-top: 4rem;
                text-align: center;
                justify-content: center;
            } 
            .slide img {
                max-width: 100%;
                height: 50%;
                object-fit: cover;
                text-align: center;
            }
            .slide a.next {
                right: 1%;
            }
            section.slide a.prev, section.slide a.next {
                top: 40%;
                width: auto;
                font-size: 50px;
            }
            .section-new{
                margin-left: 5%;
                margin-right: 5%;
            }
            .one_movies{
                width: 150px; 
            }
            .new-movies {
                display: flex; 
                grid-template-columns: repeat(3, 1fr) ; 
                gap: 20px;
                flex-wrap: wrap;
                width: auto;
            }
            .section-review{
                margin-left: 5%;
            }
            .review article a img {
                height: 150px;
                width: 100px;
            }
            .rev-info {
                margin-top: 20px;
            }
        }
        @media(max-height: 430px){
            .slide{
                margin-top: 5rem;
                text-align: center;
                justify-content: center;
                margin-left: 5%;
                margin-right: 5%;
            } 
            .slide img {
                max-width: 100%;
                height: 200px;
                aspect-ratio: 3/1;
                object-fit: cover;
            }
            section.slide a.prev, section.slide a.next {
                top: 35%;
                width: auto;
                font-size: 40px;
            }
            h2 {
                font-size: 1rem;
        
            }
            .section-new p{
                margin-top: 10px;
            }
            .section-new{
                margin: 0;
                padding: 5%;
            }
            article h4 {
                margin: 5px 0;
            }
            .one_movies {
                width: 30% !important;
            }
            .unelgee {
                display: none;
            }
            .section-new{
                max-width: 100%;
            }
        
            div article a div{
                overflow: hidden; 
            }
            .new-movies {
                display: flex; 
                grid-template-columns: repeat(3, 1fr) ; 
                gap: 30px;
                flex-wrap: wrap;
                width: auto;
            }
            aside{
                max-width: 100%;
            }
            .section-review{
                margin: 0;
                padding: 5%;
            }
            .section-top{
                width: 100%;
            }
            .top-movies {
                display: flex; 
                grid-template-columns: repeat(3, 1fr) ; 
                gap: 30px;
                flex-wrap: wrap;
                width: auto;
            }
            .news article img {
                height: 100px;
                width: 120px;
                object-fit: cover;
                border-radius: 10px;
            }
        }

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
        this.displayMovies(container, movies, container.classList.contains('new-movies') ? 3 : movies.length);

    }

    displayMoviesTop(container, movies) {
        this.displayMovies(container, movies, container.classList.contains('top-movies') ? 6 : movies.length);
    }

    displayMovies(container, movies, numberOfMovies) {
        container.innerHTML = "";
    
        for (let i = 0; i < numberOfMovies; i++) {
            const movie = movies[i];
            if (!movie) continue; // Check if movie exists
    
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
                    <h4>${movie.name}</h4>
                </a>
            `;
    
            container.appendChild(movieArticle);
        }
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