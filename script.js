const searchInput = document.getElementById("searchInput");

const productCards = document.querySelectorAll(".product-card");

const categoryButtons = document.querySelectorAll(".category-button");

const emptyState = document.getElementById("emptyState");

const clearSearch = document.getElementById("clearSearch");

const menuButton = document.getElementById("menuButton");

const nav = document.getElementById("nav");


let currentCategory = "todos";

let currentSearch = "";


/* ================= FILTROS ================= */

function filterProducts() {

    let visibleProducts = 0;

    productCards.forEach(card => {

        const category = card.dataset.category || "";

        const name = card.dataset.name || "";

        const matchesCategory =
            currentCategory === "todos" ||
            category === currentCategory;

        const matchesSearch =
            name.toLowerCase().includes(
                currentSearch.toLowerCase()
            );

        if (matchesCategory && matchesSearch) {

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


/* ================= CATEGORIAS ================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory =
            button.dataset.category;

        filterProducts();

    });

});


/* ================= BUSCA ================= */

if (searchInput) {

    searchInput.addEventListener("input", event => {

        currentSearch =
            event.target.value.trim();

        filterProducts();

    });

}


/* ================= LIMPAR BUSCA ================= */

if (clearSearch) {

    clearSearch.addEventListener("click", () => {

        currentSearch = "";

        currentCategory = "todos";

        if (searchInput) {
            searchInput.value = "";
        }

        categoryButtons.forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.category === "todos"
            ) {
                button.classList.add("active");
            }

        });

        filterProducts();

    });

}


/* ================= MENU MOBILE ================= */

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("open");

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

        });

    });

}


/* ================= ANIMAÇÃO DOS PRODUTOS ================= */

productCards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(15px)";

    setTimeout(() => {

        card.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, Math.min(index * 50, 600));

});


/* ================= INICIAR ================= */

filterProducts();
