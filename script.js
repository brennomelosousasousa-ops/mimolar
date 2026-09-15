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


/* ================= FILTRAR PRODUTOS ================= */

function filterProducts() {

    let visibleProducts = 0;


    productCards.forEach(card => {

        const category =
            card.dataset.category;

        const name =
            card.dataset.name;


        const matchesCategory =
            currentCategory === "todos" ||
            category === currentCategory;


        const matchesSearch =
            name.includes(
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


    /* Mostra mensagem caso não encontre */

    if (visibleProducts === 0) {

        emptyState.classList.add("show");

    } else {

        emptyState.classList.remove("show");

    }

}


/* ================= BOTÕES DE CATEGORIA ================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            /* Remove ativo de todos */

            categoryButtons.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            /* Ativa botão clicado */

            button.classList.add("active");


            /* Atualiza categoria */

            currentCategory =
                button.dataset.category;


            filterProducts();

        }
    );

});


/* ================= PESQUISA ================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            currentSearch =
                event.target.value
                    .toLowerCase()
                    .trim();


            filterProducts();

        }
    );

}


/* ================= LIMPAR PESQUISA ================= */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            currentSearch = "";

            currentCategory = "todos";


            if (searchInput) {

                searchInput.value = "";

            }


            categoryButtons.forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            const allButton =
                document.querySelector(
                    '[data-category="todos"]'
                );


            if (allButton) {

                allButton.classList.add(
                    "active"
                );

            }


            filterProducts();

        }
    );

}


/* ================= MENU MOBILE ================= */

if (menuButton && nav) {

    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );


    /* Fecha menu ao clicar em um link */

    nav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "open"
                    );

                }
            );

        });

}


/* ================= ANIMAÇÃO DOS PRODUTOS ================= */

productCards.forEach(
    (card, index) => {

        card.animate(

            [
                {
                    opacity: 0,
                    transform:
                        "translateY(15px)"
                },

                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],

            {
                duration: 400,

                delay: index * 60,

                easing: "ease-out",

                fill: "forwards"
            }

        );

    }
);


/* ================= INICIALIZAÇÃO ================= */

filterProducts();
