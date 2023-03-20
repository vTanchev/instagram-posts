"use strict";

// state
let allPostsDATA;

// Section
const preview = document.querySelector(".preview");

// Number of columns
const numberOfColumns = document.querySelector("#numberOfColumns");

// Card background color input
const cardBackgroundColor = document.getElementById("cardBackgroundColor");

// Card space between
const cardSpaceBetween = document.getElementById("cardSpaceBetween");

// Choose theme
const lightTheme = document.querySelector("#lightTheme");
const darkTheme = document.querySelector("#darkTheme");

// Filter by source
const allPosts = document.querySelector("#all");
const instagramPosts = document.querySelector("#instagram");
const facebookPosts = document.querySelector("#facebook");
const twitterPosts = document.querySelector("#twitter");

// loader & spinner
const loadingData = document.createElement("div");
loadingData.classList.add("loader");
const spiiner = document.createElement("div");
spiiner.classList.add("spinner");
loadingData.appendChild(spiiner);

preview.appendChild(loadingData);

// cart container & cart
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");

preview.appendChild(cardContainer);

//  load more button
const loadMore = document.createElement("div");
loadMore.classList.add("load-more");
const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Load More";
loadMoreBtn.classList.add("btn");
loadMore.appendChild(loadMoreBtn);

preview.appendChild(loadMore);

// RENDER & FUNCTIONS

// fetch data
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

// transform date format
const transformDateFormat = (date) => {
  const utcDate = new Date(date);

  const month = utcDate.toLocaleString("en-US", { month: "short" });
  const day = utcDate.toLocaleString("en-US", { day: "2-digit" });
  const year = utcDate.getFullYear();

  return `${day} ${month} ${year}`;
};

// get social media icon
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

const textLengthChecker = (text) => {
  const isLong = text.length > 110;

  if (isLong) {
    return text.substr(0, 110) + ` ...`;
  } else {
    return text;
  }
};

// generate cart
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
        <img class='svg like-svg' src='../icons/heart.svg' />
        <p class='like-value'>${likes}</p>
      </div>
    </div>
  </div>
`;
  cardContainer.appendChild(card);
};

// first 4 posts
let firstEl = 0;
let lastEl = 4;

onInitialOpening(firstEl, lastEl);

async function onInitialOpening(start, end) {
  await getAllPosts();
  for (let i = start; i < end; i++) {
    const cardData = allPostsDATA[i];
    generateCardPost(cardData);
  }

  // const firstFourPosts = allPostsDATA.slice(start, end);
  // firstFourPosts.map((cardData) => {
  //   generateCardPost(cardData);
  // });
}

// load more btn
loadMoreBtn.addEventListener("click", () => {
  console.log("load button");

  firstEl += 4;
  lastEl += 4;

  if (firstEl < allPostsDATA.length) {
    onInitialOpening(firstEl, lastEl);
  } else {
    loadMoreBtn.disabled = true;
  }
});

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

//Card space between
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

// Filter by source
