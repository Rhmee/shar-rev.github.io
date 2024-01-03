class DarkMode extends HTMLElement {
    constructor() {
        super();
        this.#render();
    }
 
    connectedCallback() {
    }
 
    #render() {
        this.innerHTML = `
    <script>
        let menu = document.querySelector('.menu');
        let mainMenu = document.querySelector('.main-menu');
        let rightMenu = document.querySelector('.right');

        menu.onclick = function () {
            mainMenu.classList.toggle('active');
            rightMenu.classList.toggle('active');
        };
    </script>
    <section class="slide">
        <div class="slidepic">
            <img src="/photos/a18a260114305d56df092d23e9c468fb.png" alt="">
        </div>
        <div class="slidepic">
            <img src="/photos/381021904_884453346371227_5100381853655530084_n.jpg" alt="">
        </div>  
        <a class="prev">&#10094;</a>
        <a class="next">&#10095;</a>
    </section>
    <!-- <script src="/javascript/slide.js"></script> -->

    <section class="section-new">
        <div class="next">
            <h2>Шинээр гарсан</h2>
            <p>Цааш үзэх</p>
        </div>
        <div class="new-movies">
        </div>
    </section>
    <!-- <script src="/javascript/new-movies.js"></script> -->

    <aside class="section-review">
        <h2>Reviews</h2>
        <div class="review">
          <article>
            <a href="/htmls/info.html"><img src="/photos/posters/37_r_tochka_season_1.jpg" alt="Review 1"></a>
            <div class="rev-info">
              <h3>37-р точка 1-р бүлэг</h3>
              <img class="profile" src="/photos/posters/red_bur.jpg" alt="User 1">
              <div class="rev">
                <h4>Red burger</h4>
                <h4>10⭐</h4>
              </div>
              <h4 class="ygReview">Love it</h4>
            </div>
          </article>
          <article>
            <a href="/htmls/info.html"><img src="/photos/posters/37_r_tochka_season_1.jpg" alt="Review 1"></a>
            <div class="rev-info">
              <h3>37-р точка 1-р бүлэг</h3>
              <img class="profile" src="/photos/posters/red_bur.jpg" alt="User 1">
              <div class="rev">
                <h4>Red burger</h4>
                <h4>10⭐</h4>
              </div>
              <h4 class="ygReview">Love it</h4>
            </div>
          </article>
        </div>
      </aside>


    <section class="section-new">
        <div class="next">
            <h2>Онцлох кино</h2>
            <p>Цааш үзэх</p>
        </div>
        <div class="top-movies">

        </div>
    </section>
    <!-- <script src="/javascript/top-movies.js"></script> -->
    <script type="module" src="/javascript/app.js"></script>
    <h2>Мэдээ мэдээлэл</h2>
    <section class="news">
        <article>
            <img src="/photos/posters/medee.jpg" alt="News 1">
            <div>
                <h2>Гарчиг 1</h2>
                <p>Монголын найруулагч П.Золжаргал "Баавгай болохсон" киногоороо нэр дэвшлээ.  </p>
                <time>2020/10/20</time>
            </div>
        </article>
        <article>
            <img src="/photos/posters/medee.jpg" alt="News 1">
            <div>
                <h2>Гарчиг 1</h2>
                <p>Монголын найруулагч П.Золжаргал "Баавгай болохсон" киногоороо нэр дэвшлээ.  </p>
                <time>2020/10/20</time>
            </div>
        </article>
        <article>
            <img src="/photos/posters/medee.jpg" alt="News 1">
            <div>
                <h2>Гарчиг 1</h2>
                <p>Монголын найруулагч П.Золжаргал "Баавгай болохсон" киногоороо нэр дэвшлээ.  </p>
                <time>2020/10/20</time>
            </div>
        </article>
        <article>
            <img src="/photos/posters/medee.jpg" alt="News 1">
            <div>
                <h2>Гарчиг 1</h2>
                <p>Монголын найруулагч П.Золжаргал "Баавгай болохсон" киногоороо нэр дэвшлээ.  </p>
                <time>2020/10/20</time>
            </div>
        </article>
    </section>
    <footer>
        <a href="facebook.com"><img src="/photos/fb.png" alt=""></a>
        <a href="instagram.com"><img src="/photos/igg.jpg" alt=""></a>
        <a href="gmail.com"><img src="/photos/gma.jpg" alt=""></a>
        <a href="tel:+976 99999999"><i class="fas fa-phone-alt"></i></a>
    </footer>
 
        <style scope>
        :root {
            --background-color-light: #333333;
            --text-color-light: #ffffff;
            --background-color-dark: #fafafa;
            --text-color-dark: #000000;
            --title-text-light:  #ffffff;
            --title-text-dark: #000000;
        }
        @media (prefers-color-scheme: dark) {
            body {
                color: var(--text-color-dark);
                background-color: var(--background-color-dark);
            }
            div .one_movies a{
                color: var(--title-text-dark)
            }  
            .movies-content .one_movies a{
                color: var(--title-text-dark);
            } 
        }
        </style>
        `
    }
}
 
window.customElements.define('home-with-dark-mode', DarkMode);