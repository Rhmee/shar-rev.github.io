export default class FilterFunctions extends HTMLElement {
    constructor(movieList) {
        super();
        this.moviesData = movieList;
        console.log(this.moviesData)
        this.API_URL = "https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114";
        this.API_KEY1 = "$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW";
        this.attachShadow({ mode: "open" });
        const container = document.createElement("div");
        container.id = "movies";
        this.shadowRoot.appendChild(container);
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

    sortByPopularity() {
      console.log(this.moviesData)
        const sortedMovies = [...this.moviesData.getMovies()].sort((a, b) => b.views - a.views);
        this.moviesData.setMovies(sortedMovies);
        this.moviesData.render();
    }

    applyFilters() {
      const selectedGenre = document.getElementById("byGenre").value;
      const selectedRating = document.getElementById("byRating").value;
      const selectedYear = document.getElementById("byYear").value;
  
      let filteredMovies = [...this.moviesData.getMovies()];
  
  
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
  
      this.moviesData.setMovies(filteredMovies);
      this.moviesData.render();
    }

    sortAlphabetically() {
        const sortedMovies = [...this.moviesData.getMovies()].sort((a, b) =>
            a.ner.localeCompare(b.ner, "en", { sensitivity: "base" })
        );
        this.moviesData.setMovies(sortedMovies);
        this.moviesData.render();
    }
}

customElements.define("filter-functions", FilterFunctions);