"use strict";

// State
let allPostsDATA;

// Section
const preview = document.querySelector(".preview");

// Number of columns
const numberOfColumns = document.querySelector("#numberOfColumns");

// Card background color input
const cardBackgroundColor = document.getElementById("cardBackgroundColor");

// Card space between
const cardSpaceBetween = document.getElementById("cardSpaceBetween");

// heart svg
const heartsvg = `<img class='like-svg' src="../icons/heart.svg" alt='heart' />`;

// Choose theme
const lightTheme = document.querySelector("#lightTheme");
const darkTheme = document.querySelector("#darkTheme");

// Filter by source
const filterBy = document.querySelectorAll(".radio-group");
const radioButtons = document.querySelectorAll('input[name="filterBySource"]');

// Loader & Spinner
const loadingData = document.createElement("div");
loadingData.classList.add("loader");
const spiiner = document.createElement("div");
spiiner.classList.add("spinner");
loadingData.appendChild(spiiner);

preview.appendChild(loadingData);

// Card container
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");

preview.appendChild(cardContainer);

//  Load more button
const loadMore = document.createElement("div");
loadMore.classList.add("load-more");
const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Load More";
loadMoreBtn.classList.add("btn");
loadMore.appendChild(loadMoreBtn);

preview.appendChild(loadMore);

// RENDER & FUNCTIONS

// Fetch data
const getAllPosts = () => {
  return fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      allPostsDATA = data;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      // for loader spinner
      loadingData.style.display = "none";
    });
};

// Transform date format
const transformDateFormat = (date) => {
  const utcDate = new Date(date);

  const month = utcDate.toLocaleString("en-US", { month: "short" });
  const day = utcDate.toLocaleString("en-US", { day: "2-digit" });
  const year = utcDate.getFullYear();

  return `${day} ${month} ${year}`;
};

// Get social media icon
const getSocialMediaIcon = (iconType) => {
  switch (iconType) {
    case "facebook":
      return "../icons/facebook.svg";

    case "instagram":
      return "../icons/instagram-logo.svg";

    case "twitter":
      return "../icons/multiple-images-icon.svg";

    default:
      break;
  }
};

//  Text length function
const textLengthChecker = (text) => {
  const isLong = text.length > 110;

  if (isLong) {
    return text.substr(0, 110) + ` ...`;
  } else {
    return text;
  }
};

// Generate card
const generateCardPost = (cardData) => {
  const { profile_image, name, date, source_type, image, caption, likes } =
    cardData;

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
  <div class='profile'>
    <div class='user-info'>
      <img src=${profile_image} class='svg profile-picture'/>
      <div class="title-date"> 
        <h3 class="nickname">${name}</h3>
        <p class="date">${transformDateFormat(date)}</p>
      </div>
    </div>  
    <div class="social-media">
      <img src=${getSocialMediaIcon(source_type)} />
    </div>
  </div>
  <div class='post'>
    <img src=${image} />
  </div>
  <div class='des-hor-like'>
    <div class='description'>
      <p>${textLengthChecker(caption)}</p>
    </div>
    <div class='hor-like'>
      <div class='horizontal-line'>
      </div>
      <div class='likes-container'>
        <button class='like-btn'>${heartsvg}</button>
        <p class='like-value'>${likes}</p>
      </div>
    </div>
  </div>
`;
  cardContainer.appendChild(card);
};

// let firstEl = 0;
// let lastEl = 4;
// onInitialOpening(firstEl, lastEl);

let loadedData, renderedData;
// Render first 4 posts
async function onInitialOpening() {
  await getAllPosts();
  // for (let i = start; i < end; i++) {
  //   const cardData = allPostsDATA[i];
  //   generateCardPost(cardData);
  // }

  renderedData = allPostsDATA.slice(0, 4);
  allPostsDATA.splice(0, 4);
  renderedData.map((cardData) => {
    generateCardPost(cardData);
  });
}

onInitialOpening();

// Load more posts | button
loadMoreBtn.addEventListener("click", () => {
  if (!allPostsDATA.length) {
    loadMoreBtn.disabled = true;
    return;
  }

  renderedData = allPostsDATA.slice(0, 4);
  allPostsDATA.splice(0, 4);

  if (!allPostsDATA.length) {
    loadMoreBtn.disabled = true;
    return;
  }
});

// Filter by source
const loadMorePosts = (filterBy) => {
  if (filterBy) {
    renderedData = allPostsDATA
      .filter((data) => data.source_type === filterBy)
      .splice(0, 4);
    console.log(renderedData);
    renderedData.map((cardData) => {
      generateCardPost(cardData);
    });
  }
};

for (const radioSelector of radioButtons) {
  radioSelector.addEventListener("change", showSelected);
}

function showSelected() {
  let filterCheck;
}

// Number of columns
numberOfColumns.addEventListener("change", () => {
  cardContainer.style.gridTemplateColumns = +numberOfColumns.value;
});

// Card background color
cardBackgroundColor.addEventListener("input", () => {
  cardContainer.childNodes.forEach(
    (card) => (card.style.backgroundColor = cardBackgroundColor.value)
  );
});

// Card space between
cardSpaceBetween.addEventListener("input", () => {
  cardContainer.style.gap = cardSpaceBetween.value;
});

// Choose theme
darkTheme.addEventListener("click", () => {
  cardContainer.childNodes.forEach((card) => card.classList.add("dark-theme"));
});

lightTheme.addEventListener("click", () => {
  cardContainer.childNodes.forEach((card) =>
    card.classList.remove("dark-theme")
  );
});

// Like post
let likeBtns = document.getElementsByClassName("like-btn");

for (let i = 0; i < likeBtns.length; i++) {
  likeBtns[i].addEventListener("click", () => {
    console.log(`here`);
  });
}
