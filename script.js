let slideIndex = 0;
showSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

document.querySelector('.prev').addEventListener('click', function () {
    plusSlides(-1);
});

document.querySelector('.next').addEventListener('click', function () {
    plusSlides(1);
});


function showSlides() {
    const slides = document.getElementsByClassName("slidepic");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 5000);
}

