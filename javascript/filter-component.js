import { displayMovies } from "./movies-component.js";

class FilterFunctions extends HTMLElement {
    constructor() {
        super();
        this.moviesData = null;
        this.movies = null;
        this.API_URL = "https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114";
        this.API_KEY1 = "$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW";
        this.attachShadow({ mode: "open" });
        const container = document.createElement("div");
        container.id = "movies";
        this.shadowRoot.appendChild(container);
        this.showSkeletonLoading();
        this.fetchMovies();
    }

    filterMovies(filteredMovies) {
        const moviesUpdatedEvent = new CustomEvent('moviesUpdated', {
            detail: { movies: filteredMovies },
        });
        this.dispatchEvent(moviesUpdatedEvent);
    }

    formatRate(rate) {
        return rate.toFixed(1);
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

    connectedCallback() {
        document.getElementById("byPopularity").addEventListener("click", () => this.sortByPopularity());
        document.getElementById("byGenre").addEventListener("change", () => this.applyFilters());
        document.getElementById("byRating").addEventListener("change", () => this.applyFilters());
        document.getElementById("byYear").addEventListener("change", () => this.applyFilters());
        document.getElementById("A_Z").addEventListener("click", () => this.sortAlphabetically());
    }

    showSkeletonLoading() {
      const skeletonLoadingHTML = `
        <style>
          .movies-content {
            margin-top: 10%;
            margin-left: 5%;
            margin-right: 5%;
          }
          .skeleton {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 6rem));
            gap: 3rem;
            text-align: center;
            justify-content: center;
          }
          .image.loading {
            border-radius: 15px;
          }
          .image.loading,
          .text.loading {
            width: 175px; 
            height: 275px;
            background-color: #555; 
            margin-bottom: 10px; 
          }
          .text.loading {
            width: 155px;
            border-radius: 5px;
            height: 20px; 
            left: 10px;
            display: inline-block;
            position: relative;
          }
        </style>
        <script>
          const filter = document.getElementsByClassName("filter");
          filter.style.display = "none";
          console.log("filter duudagdav");
        </script>
        <section class="movies-content" id="movies">
          <div class="skeleton"> 
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div>
            <div class="article">
              <div class="image loading"></div>
              <div class="text loading"></div>
            </div><div class="article">
            <div class="image loading"></div>
            <div class="text loading"></div>
          </div>
          </div>
        </section>
      `;
      this.shadowRoot.innerHTML = skeletonLoadingHTML;
    }

    fetchMovies() {
        const headers = {
            "Content-Type": "application/json",
            "X-Master-Key": this.API_KEY1,
        };

        fetch(this.API_URL, { headers })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.record.movies)) {
                    this.moviesData = data.record.movies;
                    this.movies = data.record.movies;
                    displayMovies(data.record.movies);
                    this.hideSkeletonLoading();
                } else {
                    console.error("Data.record.movies is not an array.");
                }
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    }

    hideSkeletonLoading() {
        const skeletonLoading = this.shadowRoot.querySelector('.skeleton');
        if (skeletonLoading) {
            skeletonLoading.style.display = 'none';
        }
    }

    sortByPopularity() {
        const sortedMovies = [...this.movies].sort((a, b) => b.views - a.views);
        displayMovies(sortedMovies);
    }

    applyFilters() {
      console.log(this.applyFilters, "asdasd");
      const selectedGenre = document.getElementById("byGenre").value;
      const selectedRating = document.getElementById("byRating").value;
      const selectedYear = document.getElementById("byYear").value;
  
      let filteredMovies = [...movies];
      console.log(movies, "movies");    
  
  
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
  
      this.displayMovies(filteredMovies);
    }

    sortAlphabetically() {
        const sortedMovies = [...this.moviesData].sort((a, b) =>
            a.ner.localeCompare(b.ner, "en", { sensitivity: "base" })
        );
        displayMovies(sortedMovies);
    }
}

customElements.define("filter-functions", FilterFunctions);