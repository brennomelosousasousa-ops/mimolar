/* =====================================================
   MIMOLAR
   SCRIPT.JS
   ===================================================== */


/* ================= ELEMENTOS ================= */

const searchInput =
    document.getElementById("searchInput");

const productCards =
    document.querySelectorAll(".product-card");

const categoryButtons =
    document.querySelectorAll(".category-button");

const emptyState =
    document.getElementById("emptyState");

const clearSearch =
    document.getElementById("clearSearch");

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");


/* ================= ESTADO ================= */

let currentCategory = "todos";

let currentSearch = "";


/* =====================================================
   FILTRAR PRODUTOS
   ===================================================== */

function filterProducts() {

    let visibleProducts = 0;


    productCards.forEach(card => {

        const category =
            card.dataset.category || "";

        const name =
            card.dataset.name || "";


        const matchesCategory =
            currentCategory === "todos" ||
            category === currentCategory;


        const matchesSearch =
            name
                .toLowerCase()
                .includes(
                    currentSearch.toLowerCase()
                );


        if (
            matchesCategory &&
            matchesSearch
        ) {

            card.classList.remove("hidden");

            visibleProducts++;

        } else {

            card.classList.add("hidden");

        }

    });


    /* EMPTY STATE */

    if (visibleProducts === 0) {

        emptyState.classList.add("show");

    } else {

        emptyState.classList.remove("show");

    }

}


/* =====================================================
   CATEGORIAS
   ===================================================== */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            filterProducts();

        }
    );

});


/* =====================================================
   BUSCA
   ===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            currentSearch =
                event.target.value;

            filterProducts();

        }
    );

}


/* =====================================================
   LIMPAR BUSCA
   ===================================================== */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            currentCategory = "todos";

            currentSearch = "";


            if (searchInput) {

                searchInput.value = "";

            }


            categoryButtons.forEach(button => {

                button.classList.remove("active");

            });


            const allButton =
                document.querySelector(
                    '[data-category="todos"]'
                );


            if (allButton) {

                allButton.classList.add("active");

            }


            filterProducts();

        }
    );

}


/* =====================================================
   MENU MOBILE
   ===================================================== */

if (menuButton && nav) {

    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );


    nav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("open");

                }
            );

        });

}


/* =====================================================
   ANIMAÇÃO DOS PRODUTOS
   ===================================================== */

productCards.forEach(
    (card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(15px)";


        setTimeout(
            () => {

                card.style.transition =
                    "opacity 0.45s ease, transform 0.45s ease";

                card.style.opacity = "1";

                card.style.transform =
                    "translateY(0)";

            },
            80 + (index * 50)
        );

    }
);


/* =====================================================
   CARROSSEL
   ===================================================== */

const carouselTrack =
    document.querySelector(".carousel-track");


const carouselDots =
    document.querySelectorAll(".carousel-dots i");


const carouselItems =
    document.querySelectorAll(".carousel-item");


if (
    carouselTrack &&
    carouselDots.length &&
    carouselItems.length
) {

    function updateCarouselDots() {

        const scrollLeft =
            carouselTrack.scrollLeft;

        const firstItem =
            carouselItems[0];

        const itemWidth =
            firstItem.offsetWidth + 15;


        let activeIndex =
            Math.round(
                scrollLeft / itemWidth
            );


        if (
            activeIndex < 0
        ) {
            activeIndex = 0;
        }


        if (
            activeIndex >= carouselDots.length
        ) {
            activeIndex =
                carouselDots.length - 1;
        }


        carouselDots.forEach(
            (dot, index) => {

                dot.style.opacity =
                    index === activeIndex
                        ? "1"
                        : "0.3";

            }
        );

    }


    carouselTrack.addEventListener(
        "scroll",
        updateCarouselDots,
        {
            passive: true
        }
    );


    updateCarouselDots();

}


/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

filterProducts();
