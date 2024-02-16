class CustomNavbar extends HTMLElement {
    constructor() {
        super();

        // Define the HTML content
        this.innerHTML = `
            <style>
                /* CSS styles can be added here */
                /* Example style for demonstration purposes */
                nav {
                    background-color: #333;
                    color: #fff;
                    padding: 10px;
                }

                ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                }

                li {
                    display: inline;
                    margin-right: 20px;
                }

                a {
                    color: #fff;
                    text-decoration: none;
                }
            </style>
            <nav>
                <a href="/htmls/index.html"><img src="/photos/Logo.png" alt="Logo"></a>
                <ul class="main-menu">
                    <li><a href="/htmls/index.html">Нүүр</a></li>
                    <li><a href="/htmls/movie.html">Кино</a></li>
                </ul>
                <ul class="right">
                    <li class="search"><input type="text" class="search" placeholder="Хайх"></li>
                    <li><a href="/htmls/quiz.html">Таавар</a></li>
                    <li><a href="/htmls/login.html">Нэвтрэх</a></li>
                </ul>
                <label for="menu" class="menu"><i class="fa fa-bars"></i></label>
            </nav>
        `;
    }
}

// Define the custom element
customElements.define('custom-navbar', CustomNavbar);