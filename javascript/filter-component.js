const template = document.createElement('template');
template.innerHTML = `
<style>
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
</style>

<section class="filter">
<ul>
  <li>
    <select name="genre" id="byGenre">
      <option value="AllMovie">Жанраар</option>
      <option value="Инээдэм">Инээдэм</option>
      <option value="Адал явдалт">Адал явдалт</option>
      <option value="Романтик">Романтик</option>
      <option value="Уран зөгнөлт">Уран зөгнөлт</option>
      <option value="Гэр бүл">Гэр бүл</option>
      <option value="Түгшүүрт">Түгшүүрт</option>
      <option value="Драма">Драма</option>
      <option value="Түүхэн">Түүхэн</option>
    </select>
  </li>
  <li>
    <select name="rating" id="byRating">
      <option value="AllRate">Үнэлгээгээр</option>
      <option value="9">9</option>
      <option value="8">8</option>
      <option value="7">7</option>
      <option value="6">6</option>
      <option value="5">5-c доош</option>
    </select>
  </li>
  <li><button id="byPopularity">Алдартайгаар</button></li>
  <li>
    <select name="year" id="byYear">
      <option value="AllYear">Оноор</option>
      <option value="2020">2020</option>
      <option value="2010">2010</option>
      <option value="2000">2000</option>
      <option value="1990">1990</option>
      <option value="1980">1980</option>
    </select>
  </li>
  <li><button id="A_Z">А-Я</button></li>
</ul>
</section>
`;

class RatingComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  
      this._ratingValue = 0;
      this._reviewComment = '';
  
      this.ratingValueElement = this.shadowRoot.querySelector('.rating-value');
      this.textareaElement = this.shadowRoot.getElementById('inputRev');
      this.sendButton = this.shadowRoot.getElementById('ilgeeh');
  
      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.handleSendButtonClick = this.handleSendButtonClick.bind(this);
  
      this.attachEventListeners();
  
      this.loadState();
    }
  
    static get observedAttributes() {
      return ['rating', 'review'];
    }
  
    connectedCallback() {
      this._ratingValue = parseInt(this.getAttribute('rating')) || 0;
      this._reviewComment = this.getAttribute('review') || '';
      this.render();
    }
  
    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (attributeName === 'rating') {
          this._ratingValue = parseInt(newValue) || 0;
          this.render();
        } else if (attributeName === 'review') {
          this._reviewComment = newValue || '';
        }
      }
    }
  
    attachEventListeners() {
      const ratingInputs = this.shadowRoot.querySelectorAll('input[name="rating"]');
      ratingInputs.forEach((input) => {
        input.addEventListener('change', this.handleRatingChange);
      });
  
      this.textareaElement.addEventListener('input', this.handleCommentChange);
  
      this.sendButton.addEventListener('click', this.handleSendButtonClick);
  
      this.textareaElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          this.handleSendButtonClick();
        }
      });
  
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.shadowRoot.host.classList.toggle('dark-mode', e.matches);
      });
    }
  
    handleRatingChange(event) {
      this._ratingValue = parseInt(event.target.id.replace('rate', '')) || 0;
      this.render();
    }
  
    handleCommentChange() {
      this._reviewComment = this.textareaElement.value;
    }
  
    handleSendButtonClick() {
      this.dispatchEvent(
        new CustomEvent('submit', {
          detail: {
            rating: this._ratingValue,
            review: this._reviewComment,
          },
        })
      );
      this.saveState();
    }
  
    render() {
      // Update the UI based on the current state
      // ...
      // For example, update the rating stars' appearance
  
      // Save state
      this.saveState();
    }
  
    saveState() {
      localStorage.setItem('ratingComponentState', JSON.stringify({ rating: this._ratingValue, review: this._reviewComment }));
    }
  
    loadState() {
      const savedState = JSON.parse(localStorage.getItem('ratingComponentState')) || {};
      this._ratingValue = savedState.rating || 0;
      this._reviewComment = savedState.review || '';
      this.render();
    }
  }
  
  customElements.define('rating-component', RatingComponent);
  
  function generateStarRatingHTML() {
    let starsHTML = '';
    for (let i = 10; i >= 1; i--) {
      starsHTML += `
        <input type="radio" name="rating" id="rate${i}">
        <label for="rate${i}">
          <svg id="Object" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1122 1122">
            <path class="cls-2" d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.428-3.564,6.124-2.798,9.704l35.69,209.543c1.62,9.523-8.466,16.69-16.498,11.846l-186.883-98.43c-3.441-1.816-7.536-1.816-10.977,0l-186.883,98.43c-8.032,4.844-17.118-2.323-16.498-11.846l35.69-209.543c0.766-3.581-0.302-7.276-2.798-9.704l-151.724-147.895c-6.287-6.127-2.818-16.803,5.87-18.065l209.678-30.468c3.449-0.502,6.431-2.668,7.974-5.794l93.771-190c4.139-8.381,14.392-8.381,18.531,0z" fill="#010002"/>
          </svg>
        </label>`;
    }
    return starsHTML;
  }