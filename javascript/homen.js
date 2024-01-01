class MovieComponent extends HTMLElement {
    connectedCallback() {
      this.showSkeletonLoading();
    }
  
    hideSkeletonLoading() {
      const skeletonLoading = this.shadowRoot.querySelector('.skeleton');
      if (skeletonLoading) {
        skeletonLoading.style.display = 'none';
      }
    }
  
    showSkeletonLoading() {
      const skeletonLoadingHTML = `
        <style>
          .movies-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 10% 5%;
          }
          .skeleton {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 6rem));
            gap: 3rem;
            text-align: center;
          }
          .article {
            margin-bottom: 10px;
          }
          .image.loading,
          .text.loading {
            width: 175px;
            height: 275px;
            background-color: #555;
          }
          .text.loading {
            width: 155px;
            border-radius: 5px;
            height: 20px;
            display: inline-block;
            position: relative;
          }
        </style>
        <section class="movies-content" id="movies">
          <div class="skeleton">
            ${Array(12)
              .fill()
              .map(
                () => `
                <div class="article">
                  <div class="image loading"></div>
                  <div class="text loading"></div>
                </div>
              `
              )
              .join('')}
          </div>
        </section>
      `;
  
      this.attachShadow({ mode: 'open' }).innerHTML = skeletonLoadingHTML;
    }
  }
  
  customElements.define('movie-component', MovieComponent);
  