const template = document.createElement('template');
template.innerHTML = `
    <style>
        .rating-container input {
            display: none;
        }
        
        .rating-container {
            margin-left: 50px;
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row-reverse;
            padding: 1em 1em 1em 2em;
            gap: 5px;
            border-top-right-radius: 25px;
            border: none;
            position: relative;
            background: #2b2b2b;
            box-shadow: 0 1px 1px hsl(0deg 0% 0%/0.075), 0 2px 2px hsl(0deg 0% 0%/0.075),
                0 4px 4px hsl(0deg 0% 0%/0.075), 0 8px 8px hsl(0deg 0% 0%/0.075),
                0 16px 16px hsl(0deg 0% 0%/0.075);
            .rating-value {
                position: absolute;
                top: -10px;
                left: -59px;
                border-radius: 50%;
                height: 80px;
                width: 80px;
                background: #ffbb00;
                box-shadow: 0 1px 1px hsl(0deg 0% 0%/0.075), 0 2px 2px hsl(0deg 0% 0%/0.075),
                    0 4px 4px hsl(0deg 0% 0%/0.075), 0 8px 8px hsl(0deg 0% 0%/0.075),
                    0 16px 16px hsl(0deg 0% 0%/0.075), inset 0 0 10px #f7db5e, 0 0 10px #f7db5e;
                &:before {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    text-align: center;
                    line-height: 80px;
                    font-size: 1.5em;
                    color: #2b2b2b;
                    content: "0";
                    transform-origin: "center center";
                    transition: all 0.25s ease 0s;
                }
                &:after {
                    content: "";
                    position: absolute;
                    height: 80px;
                    width: 80px;
                    top: -1px;
                    left: -1px;
                    
                    margin: auto;
                    border: 1px solid #ffbb00;
                    border-radius: 50%;
                    transition: all 0.4s ease-in;
                }
            }
            input {
                display: none;
            }
            label {
                height: 30px;
                width: 30px;
                transform-origin: "center center";
                svg {
                    transition: transform 0.4s ease-in-out;
                    opacity: 0.5;
                }
                &:hover {
                    svg {
                        transform: scale(1.5) rotate(10deg);
                    }
                }
            }
        }
        
        input:checked ~ label svg {
            opacity: 1;
            transform: scale(1.25) rotate(10deg);
        }
        
        label:hover {
            svg,
            ~ label svg {
                opacity: 1;
                transform: scale(1.5) rotate(10deg);
            }
        }
        
        input:checked {
            + label:hover svg {
                opacity: 1;
            }
        
            ~ label:hover {
                svg,
                ~ label svg {
                    opacity: 1;
                }
            }
        }
        
        label:hover ~ input:checked ~ label svg {
            opacity: 1;
        }
        
        #rate1:checked ~ .rating-value:before {
            content: "1";
            font-size: 1.75em;
        }
        
        label[for="rate1"]:hover ~ .rating-value:before {
            content: "1" !important;
            font-size: 1.75em !important;
        }
        
        #rate2:checked ~ .rating-value:before {
            content: "2";
            font-size: 2em;
        }
        
        label[for="rate2"]:hover ~ .rating-value:before {
            content: "2" !important;
            font-size: 2em !important;
        }
        
        #rate3:checked ~ .rating-value:before {
            content: "3";
            font-size: 2em;
        }
        
        label[for="rate3"]:hover ~ .rating-value:before {
            content: "3" !important;
            font-size: 2em !important;
        }
        
        #rate4:checked ~ .rating-value:before {
            content: "4";
            font-size: 2.25em;
        }
        
        label[for="rate4"]:hover ~ .rating-value:before {
            content: "4" !important;
            font-size: 2.25em !important;
        }
        
        #rate5:checked ~ .rating-value:before {
            content: "5";
            font-size: 2.25em;
        }
        
        @keyframes pulse {
            0% {
                height: 80px;
                width: 80px;
                top: 0;
                left: 0;
                opacity: 1;
            }
            100% {
                height: 120px;
                width: 120px;
                top: -23px;
                left: -23px;
                opacity: 0;
            }
        }
        
        #rate10:checked ~ .rating-value:after {
            animation: pulse 0.4s ease-out 1;
        }
        
        label[for="rate5"]:hover ~ .rating-value:before {
            content: "5" !important;
            font-size: 2.25em !important;
        }
        
        #rate6:checked ~ .rating-value:before {
            content: "6";
            font-size: 2.5em;
        }
        
        label[for="rate6"]:hover ~ .rating-value:before {
            content: "6" !important;
            font-size: 2.5em !important;
        }
        
        label[for="rate7"]:hover ~ .rating-value:before {
            content: "7" !important;
            font-size: 2.5em !important;
        }
        
        #rate7:checked ~ .rating-value:before {
            content: "7";
            font-size: 2.5em;
        }
        
        label[for="rate8"]:hover ~ .rating-value:before {
            content: "8" !important;
            font-size: 2.75em !important;
        }
        
        #rate8:checked ~ .rating-value:before {
            content: "8";
            font-size: 2.75em;
        }
        
        label[for="rate9"]:hover ~ .rating-value:before {
            content: "9" !important;
            font-size: 2.75em !important;
        }
        
        #rate9:checked ~ .rating-value:before {
            content: "9";
            font-size: 2.75em;
        }
        
        #rate10:checked ~ .rating-value:before {
            content: "10";
            font-size: 3em;
        }
        
        label[for="rate10"]:hover ~ .rating-value:before {
            content: "10" !important;
            font-size: 3em !important;
        }
        
        .cls-1 { fill: #f7db5e; }
        .cls-2 { fill: #f3cc30; }
        .cls-3 { fill: #edbd31; }
        svg { width: 30px; height: 30px; }
        
        @media (max-width: 430px)
        {
            .rating-container {
                margin-left: 0px;
            }
        
            svg {
                width: 20px;
                height: 20px;
            }
        
            label {
                width: 20px;
                height: 20px;
            }
        
            .rating-container {
                border-top-right-radius: 20px;
                margin: auto;
                padding-left: 22px;
                padding-right: 5px;
            }
            .rating-container label{
                width: 20px;
                height: 20px;
            }
        }

        #inputRev {
            display: inline-block;
            position: absolute;
            right: 25%;
            width: 70%;
            height: 75px;
            border-bottom-left-radius: 25px;
            font-size: 18px;
            word-wrap: break-word;
            white-space: pre-line;
            padding: 10px; 
            box-sizing: border-box;
            resize: none;
        }
        
        #ilgeeh {
            display: inline-block;
            position: absolute;
            background-color: #ffd747;
            border-bottom-right-radius: 25px;
            height: 75px;
            width: 75px;
            right: 10%;
            border: 2px solid #ffd747;
            box-sizing: border-box; 
        }
        
        #ilgeeh:hover {
            background-color: #ffcc00;
        }
        
        .rating-value {
            z-index: 1;
        }
        </style>
        <div class="reviewing" id="review">
            <fieldset class="rating-container">
                ${generateStarRatingHTML()}
                <div class="rating-value"></div>
            </fieldset>
            <textarea id="inputRev" placeholder="Шүүмж/Сэтгэгдэл бичнэ үү..."></textarea>
            <button id="ilgeeh"><i class="fas fa-send"></i></button>
        </div>
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

// Function to generate star rating HTML
function generateStarRatingHTML() {
    let starsHTML = '';
    for (let i = 10; i >= 1; i--) {
        starsHTML += `
            <input type="radio" name="rating" id="rate${i}" value="${i}">
            <label for="rate${i}">
                <svg id="Object" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1122 1122">
                    <path class="cls-2" d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.428-3.564,6.124-2.798,9.704l35.69,209.543c1.62,9.523-8.466,16.69-16.498,11.846l-186.883-98.43c-3.441-1.816-7.536-1.816-10.977,0l-186.883,98.43c-8.032,4.844-17.118-2.323-16.498-11.846l35.69-209.543c0.766-3.581-0.302-7.276-2.798-9.704l-151.724-147.895c-6.287-6.127-2.818-16.803,5.87-18.065l209.678-30.468c3.449-0.502,6.431-2.668,7.974-5.794l93.771-190c4.139-8.381,14.392-8.381,18.531,0z" fill="#010002"/>
                </svg>
            </label>`;
    }
    return starsHTML;
}

// Function to get the current date in "YYYY-MM-DD" format
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to handle form submission
function handleFormSubmission() {
    // Get the review text
    const review = document.getElementById('inputRev').value;
    
    // Get the rating value
    let rate;
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    for (const input of ratingInputs) {
        if (input.checked) {
            rate = input.value;
            break;
        }
    }

    // Get the current system date
    const currentDate = getCurrentDate();

    // You can now use 'review', 'rate', and 'currentDate' to send data to your server via AJAX or fetch
    console.log('Review:', review);
    console.log('Rating:', rate);
    console.log('Date:', currentDate);

    // Example of sending data using fetch
    fetch('/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            review: review,
            rate: rate,
            reviewed_date: currentDate
            // You may need to get user_id and movie_id from somewhere
            // user_id: <user_id>,
            // movie_id: <movie_id>
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        // Handle response if needed
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
    });
}

function setupReviewForm() {
    const submitButton = document.getElementById('ilgeeh');
    if (submitButton) {
        submitButton.addEventListener('click', handleFormSubmission);
    } else {
        console.error("Submit button not found!");
    }
}

// Initialize the review form setup
setupReviewForm();
