const API_KEY = "8d7888bf997a46118d2ad6e4f0675208";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

// Reload Function
function reload() {
    window.location.reload();
}

// JavaScript function to toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('show');
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    // Making clones of card and appending data in it
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        // If an article does not have any image skip the news
        if (!article.urlToImage) return;

        // To clone everything inside of template-news-card id
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);

        // Now appending the clones into cardContainer
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    // getting details from the API
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    // Will fetch the use and bind the data
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Searching
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

// Function to perform the search
function performSearch() {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}

// clicking on the button
// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// });

// clicking on the button
searchButton.addEventListener("click", () => {
    performSearch();
});


// Adding the enter functionality
// Add event listener for Enter key press in the input field
searchText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});

