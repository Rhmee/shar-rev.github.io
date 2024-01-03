const template = document.createElement('template');
template.innerHTML = `
  <style>
    /*Кино хэсэг*/
/*Зурагт хэмжээг нь өгч тохируулж байна*/
.one_movies a div img{
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
.movies-content .one_movies a{
    color: white;
    text-decoration: none;
    text-align: center;
}
section{
    margin: 0 auto;
    padding: 2rem;
}
.one_movies{
    width: 175px; 
}
/*Нийт кинонуудыг мөр үүсгэж байна*/
.movies-content{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 6rem));
    gap: 3rem;
    text-align: center;
    justify-content: center;
}
/*Zurh*/
a{
    position: relative;
}
.unelgee{
    position: absolute; 
    top: 225px;
    background: rgba(0, 0, 0, 0.5); 
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: #f1f1f1; 
    width: 175px;
    opacity:0;
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
  <article class="one_movies">
    <a id="movieLink" href="#">
      <slot name="before-content"></slot>
      <div class="imagee">
        <img id="movieImage" alt="Movie Poster">
        <p class="unelgee">
          <span id="views"><i class="fa fa-eye" aria-hidden="true"></i></span>
          <span id="rate"><i class="fa fa-star" style="color: #ffd747;"></i></span>
          <span id="like"><i class="fa fa-heart" style="color:red"></i></span>
        </p>
      </div>
      <h4 id="movieTitle"><slot name="movie-title"></slot></h4>
      <slot name="after-content"></slot>
    </a>
  </article>
`;

class MovieComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._movieData = null;

    const movieLink = this.shadowRoot.getElementById('movieLink');
    movieLink.addEventListener('click', this.handleDetailsClick.bind(this));
  }

  static get observedAttributes() {
    return ['movie-id', 'movie-title'];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === 'movie-id') {
      this.setAttribute('aria-labelledby', `movieTitle_${newValue}`);
    }

    if (attributeName === 'movie-title') {
      const movieTitle = this.shadowRoot.getElementById('movieTitle');
      movieTitle.textContent = newValue;
    }
  }

  get movieData() {
    return this._movieData;
  }

  set movieData(value) {
    this._movieData = value;
    this.render();
  }

  render() {
    if (!this._movieData) return;

    const movieImage = this.shadowRoot.getElementById('movieImage');
    const views = this.shadowRoot.getElementById('views');
    const rate = this.shadowRoot.getElementById('rate');
    const like = this.shadowRoot.getElementById('like');
    const movieTitle = this.shadowRoot.getElementById('movieTitle');

    movieImage.src = this._movieData.poster;
    views.textContent = formatViews(this._movieData.views);
    rate.textContent = formatRate(this._movieData.rate);
    like.textContent = this._movieData.like;
    movieTitle.textContent = this._movieData.name;
  }

  handleDetailsClick() {
    this.dispatchEvent(new CustomEvent('details-clicked', { detail: this._movieData }));
  }
}

customElements.define('movie-component', MovieComponent);

function formatViews(views) {
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

function formatRate(rate) {
  return rate.toFixed(1);
}
