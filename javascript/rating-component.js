class RatingComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._count = 0;
    }
  
    static get observedAttributes() {
      return ['count'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'count') {
        this._count = parseInt(newValue, 10) || 0;
      }
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const template = `
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
                /* height: 50px; */
                padding-left: 22px;
                padding-right: 5px;
            }
            .rating-container label{
                width: 20px;
                height: 20px;
            }
        }
        </style>
        <div class="reviewing" id="review">
          <fieldset class="rating-container">
            ${generateStarRatingHTML(0)}
            <div class="rating-value">0</div>
          </fieldset>
          <input type="text" id="inputRev">
        </div>
      `;
      this.shadowRoot.innerHTML = template;
    }
  }
  
  customElements.define('rating-component', RatingComponent);
  
  function generateStarRatingHTML(count) {
    let starsHTML = '';
    for (let i = 10; i >= 1; i--) {
      starsHTML += `
        <input type="radio" name="rating" id="rate${i}">
        <label for="rate${i}">
          <!-- Replace the SVG code for each star here -->
          <svg id="Object" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1122 1122">
            <path class="cls-2" d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.428-3.564,6.124-2.798,9.704l35.69,209.543c1.62,9.523-8.466,16.69-16.498,11.846l-186.883-98.43c-3.441-1.816-7.536-1.816-10.977,0l-186.883,98.43c-8.032,4.844-17.118-2.323-16.498-11.846l35.69-209.543c0.766-3.581-0.302-7.276-2.798-9.704l-151.724-147.895c-6.287-6.127-2.818-16.803,5.87-18.065l209.678-30.468c3.449-0.502,6.431-2.668,7.974-5.794l93.771-190c4.139-8.381,14.392-8.381,18.531,0z" fill="#010002"/>
          </svg>
        </label>`;
    }
    return starsHTML;
  }
  