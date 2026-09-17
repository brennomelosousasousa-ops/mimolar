const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

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


let currentCategory = "todos";
let currentSearch = "";


/* FILTROS */

function filterProducts() {

    let visibleProducts = 0;

    productCards.forEach(card => {

        const category =
            card.dataset.category;

        const name =
            card.dataset.name.toLowerCase();

        const categoryMatch =
            currentCategory === "todos" ||
            category === currentCategory;

        const searchMatch =
            name.includes(currentSearch);

        if (categoryMatch && searchMatch) {

            card.classList.remove("hidden");

            visibleProducts++;

        } else {

            card.classList.add("hidden");

        }

    });


    if (visibleProducts === 0) {

        emptyState.classList.add("show");

    } else {

        emptyState.classList.remove("show");

    }

}


/* CATEGORIAS */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory =
            button.dataset.category;

        filterProducts();

    });

});


/* BUSCA */

searchInput.addEventListener("input", event => {

    currentSearch =
        event.target.value
            .toLowerCase()
            .trim();

    filterProducts();

});


/* LIMPAR BUSCA */

clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    currentSearch = "";

    currentCategory = "todos";

    categoryButtons.forEach(button => {

        button.classList.remove("active");

    });

    document
        .querySelector('[data-category="todos"]')
        .classList.add("active");

    filterProducts();

});


/* MENU MOBILE */

menuButton.addEventListener("click", () => {

    nav.classList.toggle("open");

});


/* FECHAR MENU AO CLICAR */

nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});


/* ANIMAÇÃO DOS PRODUTOS */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.08
        }
    );


productCards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(15px)";

    card.style.transition =
        `opacity .5s ease ${index * 0.025}s,
         transform .5s ease ${index * 0.025}s`;

    observer.observe(card);

});


/* INICIALIZA */

filterProducts();
