export default class MovieList extends HTMLElement {
  moviesData = null;

  constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.moviesData = null;
      this.movies = null;
  }

sortByPopularity() {
    const sortedMovies = [...this.movies].sort((a, b) => b.views - a.views);
    this.moviesData = (sortedMovies);
    this.render();
}

applyFilters() {
  const selectedGenre = document.getElementById("byGenre").value;
  const selectedRating = document.getElementById("byRating").value;
  const selectedYear = document.getElementById("byYear").value;

  let filteredMovies = [...this.movies];


  if (selectedGenre !== "AllMovie") {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.genre === selectedGenre
    );
  }

  if (selectedRating !== "AllRate") {
    filteredMovies = filteredMovies.filter((movie) => {
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
    filteredMovies = filteredMovies.filter(
      (movie) =>
        new Date(movie.release_date).getFullYear() === parseInt(selectedYear)
    );
  }

  if (selectedRating === "AllRate") {
    filteredMovies = filteredMovies.sort((a, b) => b.rate - a.rate);
  }

  this.moviesData = (filteredMovies);
  this.render();
}

sortAlphabetically() {
    const sortedMovies = [...this.movies].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );
    this.moviesData = (sortedMovies);
    this.render();
}

  connectedCallback() {
      this.fetchMoviesData();
      document.getElementById("byPopularity").addEventListener("click", () => this.sortByPopularity());
      document.getElementById("byGenre").addEventListener("change", () => this.applyFilters());
      document.getElementById("byRating").addEventListener("change", () => this.applyFilters());
      document.getElementById("byYear").addEventListener("change", () => this.applyFilters());
      document.getElementById("A_Z").addEventListener("click", () => this.sortAlphabetically());
  }

  getMovies() {
    return this.moviesData;
  }

  setMovies(movies) {
    this.moviesData = movies;
  }

  async fetchMoviesData() {
      try {
          const response = await fetch('http://localhost:3000/api/v1/movies/kino', {
              method: 'GET'
          });
          if (!response.ok) {
              throw new Error('Failed to fetch movies');
          }
          const data = await response.json();
          this.moviesData = data;
          this.movies = data;
          this.render();
      } catch (error) {
          console.error("Error fetching movies:", error);
      }
  }

  render() {
      this.shadowRoot.innerHTML = `
        <style>
        /*Сонголтын хэсэг*/
        .filter {
            padding: 0;
            margin-bottom: 0;
            text-align: center;
        }
        
        .filter ul {
            list-style-type: none;
        }
        
        .filter ul li {
            display: inline-flex;
            width: 8rem;
            height: 50px;
            margin: 0;
            padding: 0;
        }
        
        select {
            background-color: #E6E6E6;
            width: 100%;
            text-align: center;
        }
        
        #byGenre {
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
        }
        
        #A_Z {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        
        button {
            background-color: #E6E6E6;
            width: 100%;
        }
        
        /*Кино хэсэг*/
        /*Зурагт хэмжээг нь өгч тохируулж байна*/
        .one_movies a div img {
            border-radius: 15px;
            max-width: 100%;
            aspect-ratio: 2/3;
            object-fit: cover;
        }
        
        /*Hover хийх зурагт хэмжээг нь өгч тохируулж байна*/
        .imagee {
            width: 175px; 
            height: 275px;
            overflow: hidden; 
        }
        
        /* Зургийн hover хийх үед шар хүрээ үүсгэх */
        .imagee:hover {
            border-radius: 15px;
            box-shadow: 0 0 20px #ffd474;
        }
        
        /*Зургийн hover хийх үед томруулна */
        .imagee:hover img {
            transform: scale(1.1); /* Зургийг 1.1 удаа томруулах */
        }
        
        .imagee:hover .unelgee {
            opacity: 1;
        }
        
        /*h4 доторх тохиргоог өгч байна*/
        .movies-content .one_movies a {
            color: white;
            text-decoration: none;
            text-align: center;
        }
        
        section {
            margin: 0 auto;
        }
        
        .one_movies {
            width: 175px; 
        }
        
        /*Нийт кинонуудыг мөр үүсгэж байна*/
        .movies-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 6rem));
            gap: 3rem;
            text-align: center;
            justify-content: center;
        }
        
        /*Zurh*/
        a {
            position: relative;
        }
        
        .unelgee {
            position: absolute; 
            top: 225px;
            background: rgba(0, 0, 0, 0.5); 
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
            color: #f1f1f1; 
            width: 175px;
            opacity: 0;
            color: white;
            font-size: 1rem;
            margin: 0;
            padding-top: 1rem;
            padding-bottom: 1rem;
            text-align: center;
        }
        
        @media(max-width: 500px){
            .unelgee{
                display: none;
            }
            .one_movies{
                max-width: 100%;
            }
            .filter{
                max-width:  100%;
                margin-top: 5rem;
            }
            .filter ul{
                padding: 0;
            }
            #byPopularity{
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }
            #byYear{
                border-bottom-left-radius: 10px;
                border-top-left-radius: 10px; 
            }
            .filter ul li {
                width: 25%;
                height: 50px;
            }
        }
        
        @media (min-width: 430px) and (max-width: 999px){
            body{
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
            #byPopularity{
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }
            #byYear{
                border-bottom-left-radius: 10px;
                border-top-left-radius: 10px; 
            }
            .filter{
                margin-top: 7rem;
            }
            .filter ul li {
                width: 30%;
                height: 50px;
            }
        
        }
        
        @media(max-height: 430px){
            .filter{
                margin-top: 10%;
            }
            .filter ul li {
                width: 18%;
                height: 50px;
            }
        }

        
        
        </style>
          <section class="movies-content" id="movies"></section>
      `;
      this.displayMovies(this.moviesData);
  }

  formatViews(views) {
      if (views >= 1000000000) {
          return (views / 1000000000).toFixed(1) + "B";
      } else if (views >= 1000000) {
          return (views / 1000000).toFixed(1) + "M";
      } else if (views >= 1000) {
          return (views / 1000).toFixed(1) + "K";
      } else {
          return views.toString();
      }
  }

  displayMovies(movies) {
    const moviesSection = this.shadowRoot.getElementById("movies");
    moviesSection.innerHTML = "";
    movies.forEach((movie) => {
        const movieArticle = document.createElement("article");
        movieArticle.classList.add("one_movies");

        if (movie.id !== undefined && movie.id !== null) { // Check if movie ID is defined and not null
            // Construct the link with movie id
            movieArticle.addEventListener('click', () => {
                fetch(`http://localhost:3000/api/v1/movies/kino/${movie.id}`)
                    .then(response => response.json())
                    .then(movieData => {
                        window.location.href = `info.html?id=${movieData.id}`;
                    })
                    .catch(error => {
                        console.error('Error fetching movie data:', error);
                    });
            });

            movieArticle.innerHTML = `
                <a href="info.html?id=${movie.id}">
                    <div class="imagee">
                        <img src="${movie.poster}" alt="${movie.ner}">
                        <p class="unelgee">
                            <span>${this.formatViews(movie.views)} <i class="fa fa-eye" aria-hidden="true"></i></span>
                            <span>${movie.rate} <i class="fa fa-star" style="color: #ffd747;"></i></span>
                            <span>${movie.likes} <i class="fa fa-heart" style="color:red"></i></span>
                        </p>
                    </div>
                    <h4>${movie.name}</h4>
                </a>
            `;
        } else {
            console.error("Movie ID is undefined or null:", movie);
        }

        moviesSection.appendChild(movieArticle);
    });
}

}

customElements.define("movie-list", MovieList);