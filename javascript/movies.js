const API_URL = "http://localhost:3000/api/movies";

document.addEventListener("DOMContentLoaded", function () {
  const moviesSection = document.getElementById("movies");

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        displayMovies(data, moviesSection);
      } else {
        console.error("Data is not an array or is not present.");
      }
    })
    .catch((error) => console.error("Error fetching movies:", error));
});

function formatViews(views) {
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

function formatRate(rate) {
  return rate.toFixed(1);
}

export const displayMovies = async (movies) => {
  const moviesSection = document.getElementById("movies");
  movies.forEach((movie) => {
    const movieArticle = document.createElement("article");
    movieArticle.classList.add("one_movies");

    movieArticle.innerHTML = `
            <a href="info.html?id=${movie.id}">
                <div class="imagee">
                    <img src="${movie.poster}" alt="${movie.name}">
                    <p class="unelgee">
                        <span>${formatViews(
                          movie.views
                        )} <i class="fa fa-eye" aria-hidden="true"></i></span>
                        <span>${formatRate(
                          movie.rate
                        )} <i class="fa fa-star" style="color: #ffd747;"></i></span>
                        <span>${
                          movie.like
                        } <i class="fa fa-heart" style="color:red"></i></span>
                    </p>
                </div>
                <h4>${movie.name}</h4>
            </a>
        `;

    moviesSection.appendChild(movieArticle);
  });
};