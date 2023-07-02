//BASE VARIABLES
let API_URL_PARAMS = "";
let API_URL = `http://localhost:3000/sneakers?${API_URL_PARAMS}`;
const navApp = document.getElementById("nav");
const contentApp = document.getElementById("content");
const footerApp = document.getElementById("footer");
let positionsOfMainCarouselContents = [0, -600, -1200, -1800, -2400];
let dotCountMainCarousel = 0;
let xPositionsOfNewArrivalCarouselContents = [0, -400, -800, -1200];
let yPositionsOfNewArrivalCarouselContents = [0, -400, -800, -1200];
let countNewArrival = 0;
let dataFromFilterBox = {
  minPrice: 75,
  maxPrice: 225,
  brands: ["nike", "adidas", "jordan"],
  colors: [
    "red",
    "green",
    "blue",
    "gray",
    "black",
    "white",
    "colorful",
    "red",
    "green",
    "blue",
    "gray",
    "black",
    "white",
    "colorful",
  ],
  date: null,
  popularity: false,
};
let filteredData;
let priceFilteredData;
let showFilterkey = false;
let backUpData;
let cartCountNum = 0;
let myCart = [];
let selectedProduct = [];
let willPushToCart;
const views = {
  "/": "./views/homePageView.html",
  "/store": "./views/storePageView.html",
  "/contacts": "./views/contactsPageView.html",
};
let prices = [];
let count = [];
let total;
let willDelete = [];
let totalPrice = 0;
let deliveryPrice = 20;
//BASE VARIABLES

//NAVICON CLICKED
const navIconEvent = () => {
  const navIconPart = document.querySelectorAll(".navIcon-part");
  const scaledCircle = document.querySelector(".scaledCircle");
  const navIcon = document.querySelector(".navIcon");
  const smallNavBar = document.querySelector(".smallNavBar");
  const smallNavBarContainer = document.querySelector(
    ".smallNavBar__container"
  );
  navIconPart.forEach((iconPart) => {
    iconPart.classList.toggle("active");
  });
  navIcon.classList.toggle("active");
  smallNavBar.classList.toggle("active");
  setTimeout(() => {
    scaledCircle.classList.toggle("active");
  }, 100);
  smallNavBarContainer.classList.toggle("active");
};
//NAVICON CLICKED

setTimeout(() => {
  const smallNavBar = document.querySelector(".smallNavBar");
  smallNavBar.classList.remove("active");
}, 1000);

//MAIN CAROUSEL
const toNextMainCarousel = () => {
  const mainCarouselContents = document.querySelectorAll(".carouselContent");
  const mainCarouselNextButton = document.querySelector(".mainCarouselNextBtn");
  const mainCarouselPrevButton = document.querySelector(".mainCarouselPrevBtn");
  mainCarouselNextButton.style.pointerEvents = "none";
  mainCarouselPrevButton.style.pointerEvents = "none";
  dotCountMainCarousel++;
  mainCarouselDotsHandler();
  positionsOfMainCarouselContents = positionsOfMainCarouselContents.map(
    (pos) => {
      pos += 600;
      return pos;
    }
  );
  for (let i = 0; i < positionsOfMainCarouselContents.length; i++) {
    mainCarouselContents[
      i
    ].style.left = `${positionsOfMainCarouselContents[i]}px`;
  }
  setTimeout(() => {
    mainCarouselNextButton.style.pointerEvents = "painted";
    mainCarouselPrevButton.style.pointerEvents = "painted";
  }, 1000);
};
const toPrevMainCarousel = () => {
  const mainCarouselContents = document.querySelectorAll(".carouselContent");
  const mainCarouselNextButton = document.querySelector(".mainCarouselNextBtn");
  const mainCarouselPrevButton = document.querySelector(".mainCarouselPrevBtn");
  mainCarouselNextButton.style.pointerEvents = "none";
  mainCarouselPrevButton.style.pointerEvents = "none";
  dotCountMainCarousel--;
  mainCarouselDotsHandler();
  positionsOfMainCarouselContents = positionsOfMainCarouselContents.map(
    (pos) => {
      pos -= 600;
      return pos;
    }
  );
  for (let i = 0; i < positionsOfMainCarouselContents.length; i++) {
    mainCarouselContents[
      i
    ].style.left = `${positionsOfMainCarouselContents[i]}px`;
  }
  setTimeout(() => {
    mainCarouselNextButton.style.pointerEvents = "painted";
    mainCarouselPrevButton.style.pointerEvents = "painted";
  }, 1000);
};
const mainCarouselDotsHandler = () => {
  const mainCarouselNextButton = document.querySelector(".mainCarouselNextBtn");
  const mainCarouselPrevButton = document.querySelector(".mainCarouselPrevBtn");
  const mainCarouselDots = document.querySelectorAll(".mainCarouselDots");
  dotCountMainCarousel === 4
    ? (mainCarouselNextButton.style.visibility = "hidden")
    : (mainCarouselNextButton.style.visibility = "visible");
  dotCountMainCarousel === 0
    ? (mainCarouselPrevButton.style.visibility = "hidden")
    : (mainCarouselPrevButton.style.visibility = "visible");
  mainCarouselDots.forEach((dot) => {
    dot.classList.remove("active");
  });
  mainCarouselDots[dotCountMainCarousel].classList.add("active");
};
const mainCarouselDotsEvent = (num) => {
  const mainCarouselContents = document.querySelectorAll(".carouselContent");
  dotCountMainCarousel = num;
  mainCarouselDotsHandler();
  if (num === 0) {
    positionsOfMainCarouselContents = [0, -600, -1200, -1800, -2400];
  }
  if (num === 1) {
    positionsOfMainCarouselContents = [600, 0, -600, -1200, -1800];
  }
  if (num === 2) {
    positionsOfMainCarouselContents = [1200, 600, 0, -600, -1200];
  }
  if (num === 3) {
    positionsOfMainCarouselContents = [1800, 1200, 600, 0, -600];
  }
  if (num === 4) {
    positionsOfMainCarouselContents = [2400, 1800, 1200, 600, 0];
  }
  for (let i = 0; i < mainCarouselContents.length; i++) {
    mainCarouselContents[
      i
    ].style.left = `${positionsOfMainCarouselContents[i]}px`;
  }
};
//MAIN CAROUSEL

//NEWARRIVAL CAROUSEL
const toNextNewArrivalCarousel = () => {
  const newArrivalCarouselNextBtn = document.querySelectorAll(
    ".newArrivalCarouselNextBtn"
  );
  const newArrivalCarouselPrevBtn = document.querySelectorAll(
    ".newArrivalCarouselPrevBtn"
  );
  newArrivalCarouselPrevBtn.forEach((btn) => {
    btn.style.visibility = "visible";
  });
  if (countNewArrival === 3) {
    newArrivalCarouselNextBtn.forEach((btn) => {
      btn.style.visibility = "hidden";
    });
    return;
  }
  countNewArrival++;
  console.log(countNewArrival);
  const newArrivalCarouselContent = document.querySelectorAll(
    ".newArrivalCarouselContent"
  );
  const newArrivalCarouselContentImage = document.querySelectorAll(
    ".newArrivalCarouselContent__image"
  );
  xPositionsOfNewArrivalCarouselContents =
    xPositionsOfNewArrivalCarouselContents.map((pos) => {
      pos += 400;
      return pos;
    });
  yPositionsOfNewArrivalCarouselContents =
    yPositionsOfNewArrivalCarouselContents.map((pos) => {
      pos += 400;
      return pos;
    });
  for (let i = 0; i < newArrivalCarouselContent.length; i++) {
    newArrivalCarouselContent[
      i
    ].style.transform = `translateX(${xPositionsOfNewArrivalCarouselContents[i]}px) translateY(${yPositionsOfNewArrivalCarouselContents[i]}px)`;
    newArrivalCarouselContent[i].style.rotate = "0deg";
    newArrivalCarouselContentImage[i].style.rotate = "0deg";
  }
};
const toPrevNewArrivalCarousel = () => {
  const newArrivalCarouselNextBtn = document.querySelectorAll(
    ".newArrivalCarouselNextBtn"
  );
  const newArrivalCarouselPrevBtn = document.querySelectorAll(
    ".newArrivalCarouselPrevBtn"
  );
  newArrivalCarouselNextBtn.forEach((btn) => {
    btn.style.visibility = "visible";
  });
  if (countNewArrival === 0) {
    newArrivalCarouselPrevBtn.forEach((btn) => {
      btn.style.visibility = "hidden";
    });
    return;
  }
  countNewArrival--;
  const newArrivalCarouselContent = document.querySelectorAll(
    ".newArrivalCarouselContent"
  );
  const newArrivalCarouselContentImage = document.querySelectorAll(
    ".newArrivalCarouselContent__image"
  );
  xPositionsOfNewArrivalCarouselContents =
    xPositionsOfNewArrivalCarouselContents.map((pos) => {
      pos -= 400;
      return pos;
    });
  yPositionsOfNewArrivalCarouselContents =
    yPositionsOfNewArrivalCarouselContents.map((pos) => {
      pos -= 400;
      return pos;
    });
  for (let i = 0; i < newArrivalCarouselContent.length; i++) {
    newArrivalCarouselContent[
      i
    ].style.transform = `translateX(${xPositionsOfNewArrivalCarouselContents[i]}px) translateY(${yPositionsOfNewArrivalCarouselContents[i]}px)`;
    newArrivalCarouselContent[i].style.rotate = "90deg";
    newArrivalCarouselContentImage[i].style.rotate = "-90deg";
  }
};
//NEWARRIVAL CAROUSEL

//DRAGABLE CAROUSEL
const DraggableCarousel = () => {
  const embla = EmblaCarousel(document.getElementById("embla"), { loop: true });
  const prevButtonEmbalCarousel = document.querySelector(".embla__prev");
  const nextButtonEmbalCarousel = document.querySelector(".embla__next");
  prevButtonEmbalCarousel.addEventListener("click", embla.scrollPrev, false);
  nextButtonEmbalCarousel.addEventListener("click", embla.scrollNext, false);
};
//DRAGABLE CAROUSEL

//PRODUCTS SCALE HANDLER
const productScaleHandler = () => {
  const productCard = document.querySelectorAll(".product-cards");
  productCard.forEach((el) => {
    el.style.scale = 1;
  });
};
//PRODUCTS SCALE HANDLER

//COMPONENTS TO RENDER
const renderNavBar = async () => {
  await fetch("./components/navbar.html")
    .then((response) => response.text())
    .then((fetchedData) => (navApp.innerHTML = fetchedData));
};
const renderProductCards = async () => {
  const homePageNewArrival = document.querySelector(
    ".homePageNewArrival__container"
  );
  let data;
  await fetch(API_URL)
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData;
      backUpData = fetchedData;
    });
  await fetch("./components/productCard.html")
    .then((response) => response.text())
    .then((fetchedData) => {
      data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      for (let i = 0; i < data.length - 18; i++) {
        homePageNewArrival.innerHTML += fetchedData;
        const unFlipedProductImage = document.querySelectorAll(
          ".unfliped-product-image"
        );
        unFlipedProductImage[i].src = data[i].image;
        const flipedProductImage = document.querySelectorAll(
          ".fliped-product-image"
        );
        flipedProductImage[i].src = data[i].image;
        const productCardShoeName =
          document.querySelectorAll(".shoe-name__text");
        productCardShoeName[i].innerHTML = data[i].name;
        const productCardShoePrice =
          document.querySelectorAll(".shoe-price__text");
        productCardShoePrice[i].innerHTML = "$" + data[i].price;
        const productCardShoeRate = document.querySelectorAll(
          ".product-rate__container__text"
        );
        productCardShoeRate[i].innerHTML = data[i].rate;
      }
      for (let i = 0; i < data.length - 18; i++) {
        const productCardButton = document.querySelectorAll(
          ".button-section__btn"
        );
        productCardButton[i].addEventListener("click", () => {
          showSelectorPage(data[i].id);
        });
      }
    });
};
const renderFooter = async () => {
  await fetch("./components/footer.html")
    .then((response) => response.text())
    .then((fetchedData) => {
      footerApp.innerHTML = fetchedData;
    });
};
const renderProductCardsToStorePage = async () => {
  const notFoundStorePage = document.querySelector(
    ".storePage__container__products__notFound"
  );
  notFoundStorePage.classList.remove("active");
  const productsContainer = document.querySelector(
    ".storePage__container__products__container"
  );
  productsContainer.innerHTML = "";
  await fetch(API_URL)
    .then((response) => response.json())
    .then((fetchedData) => {
      backUpData = fetchedData;
      filteredData = fetchedData;
    });
  await fetch("./components/productCard.html")
    .then((response) => response.text())
    .then((fetchedData) => {
      for (let i = 0; i < backUpData.length; i++) {
        productsContainer.innerHTML += fetchedData;
        const unFlipedProductImage = document.querySelectorAll(
          ".unfliped-product-image"
        );
        unFlipedProductImage[i].src = backUpData[i].image;
        const flipedProductImage = document.querySelectorAll(
          ".fliped-product-image"
        );
        flipedProductImage[i].src = backUpData[i].image;
        const productCardShoeName =
          document.querySelectorAll(".shoe-name__text");
        productCardShoeName[i].innerHTML = backUpData[i].name;
        const productCardShoePrice =
          document.querySelectorAll(".shoe-price__text");
        productCardShoePrice[i].innerHTML = "$" + backUpData[i].price;
        const productCardShoeRate = document.querySelectorAll(
          ".product-rate__container__text"
        );
        productCardShoeRate[i].innerHTML = backUpData[i].rate;
      }
      const productCard = document.querySelectorAll(".product-cards");
      productCard.forEach((el) => {
        el.style.scale = 1;
      });
    });
  for (let i = 0; i < backUpData.length; i++) {
    const productCardButton = document.querySelectorAll(".button-section__btn");
    productCardButton[i].addEventListener("click", () => {
      showSelectorPage(backUpData[i].id);
    });
  }
};
const renderFilterBoxToStorePage = async () => {
  const storePageFilter = document.querySelector(
    ".storePage__container__filters__container"
  );
  await fetch("./components/filtersBox.html")
    .then((response) => response.text())
    .then((fetchedData) => {
      storePageFilter.innerHTML = "";
      storePageFilter.innerHTML = fetchedData;
    });
};
renderFooter();
renderNavBar();
//COMPONENTS TO RENDER

//VIEW PAGES TO RENDER
const renderHomePage = async () => {
  await fetch("./views/homePageView.html")
    .then((response) => response.text())
    .then((fetchedData) => (contentApp.innerHTML = fetchedData));
  renderProductCards();
};
//VIEW PAGES TO RENDER

//FILTERS
const showFilterBox = (key) => {
  showFilterkey = key;
  const filterBoxToggleIcon = document.querySelectorAll(
    ".filterBox__toggle__icon"
  );
  const filterBox = document.querySelector(".filterBox");
  const productContainerStorePage = document.querySelector(
    ".storePage__container__products__container"
  );
  if (showFilterkey === true) {
    productContainerStorePage.classList.add("active");
    filterBox.classList.add("active");
    filterBoxToggleIcon[0].style.visibility = "hidden";
    filterBoxToggleIcon[1].style.visibility = "visible";
  }
  if (key === false) {
    productContainerStorePage.classList.remove("active");
    filterBox.classList.remove("active");
    filterBoxToggleIcon[0].style.visibility = "visible";
    filterBoxToggleIcon[1].style.visibility = "hidden";
    renderProductCardsToStorePage();
    setTimeout(() => {
      renderFilterBoxToStorePage();
      filterHandler();
    }, 500);
  }
  if (key === null) {
    filterBox.classList.remove("active");
    productContainerStorePage.classList.remove("active");
    filterBoxToggleIcon[0].style.visibility = "visible";
    filterBoxToggleIcon[1].style.visibility = "hidden";
  }
};
if (window.matchMedia("(max-width:1000px)")) {
} else {
}
const filterHandler = () => {
  setTimeout(() => {
    const accordionOptionsBtn = document.querySelectorAll(
      ".accordionOptions-header"
    );
    const accordionOptionsContent = document.querySelectorAll(
      ".accordionOptions-content"
    );
    const dateFilterBtn = document.querySelectorAll(".dateFilterBtn");
    const brandsInputSwitchBtn = document.querySelectorAll(
      ".brandsInputSwitchBtn"
    );
    const cheapestToMostExpensive = document.querySelectorAll(
      ".cheapestToMostExpensive"
    );
    const colorsIcon = document.querySelectorAll(".colorsIcon");
    const range = document.querySelectorAll(".priceRange");
    const progress = document.querySelectorAll(".progressBar");
    const valuesInput = document.querySelectorAll(".priceValues");
    range.forEach((el) => {
      el.addEventListener("input", () => {
        let gap =
          parseInt(range[1].value) - 40 || parseInt(range[2].value) - 40;
        if (parseInt(range[0].value) >= gap || range[2].value >= gap) {
          range[0].value = range[1].value - 40;
          range[2].value = range[3].value - 40;
        }
        let minRange = parseInt(range[0].value) || parseInt(range[2].value);
        let maxRange = parseInt(range[1].value) || parseInt(range[3].value);
        console.log(minRange, maxRange);
        valuesInput[0].value = range[0].value;
        valuesInput[1].value = range[1].value;
        valuesInput[2].value = range[2].value;
        valuesInput[3].value = range[3].value;
        progress[0].style.left = (minRange / range[0].max) * 100 + "%";
        progress[0].style.right = 100 - (maxRange / range[1].max) * 100 + "%";
        progress[1].style.left = (minRange / range[2].max) * 100 + "%";
        progress[1].style.right = 100 - (maxRange / range[3].max) * 100 + "%";
        dataFromFilterBox.minPrice = minRange;
        dataFromFilterBox.maxPrice = maxRange;
      });
    });
    const accordionOptionsExpand = (index) => {
      if (index === 3) {
        popularityFilterBtn();
        return;
      }
      accordionOptionsBtn[index].classList.toggle("active");
      accordionOptionsContent[index].classList.toggle("active");
    };
    let brandNumKey = 3;
    const brandsOptionClick = (index) => {
      let defaultBrandValues = ["nike", "adidas", "jordan"];
      if (brandsInputSwitchBtn[index].classList.contains("active")) {
        brandNumKey++;
      } else {
        brandNumKey--;
      }
      if (brandNumKey >= 1) {
        brandsInputSwitchBtn[index].classList.toggle("active");
        brandsInputSwitchBtn[index].classList.contains("active")
          ? (dataFromFilterBox.brands[index] = null)
          : (dataFromFilterBox.brands[index] = defaultBrandValues[index]);
      } else {
        brandNumKey++;
        brandsInputSwitchBtn[index].classList.remove("active");
        Toastify({
          text: "You should select at least one brand!!",
          className: "error",
          style: {
            background: " rgb(255, 0, 55)",
            fontFamily: "trakya",
          },
        }).showToast();
      }
      filterProducts();
    };
    let numKey = 0;
    const colorsFilterBtn = (index) => {
      console.log(index);
      let defaultColorValues = [
        "red",
        "green",
        "blue",
        "gray",
        "black",
        "white",
        "colorful",
        "red",
        "green",
        "blue",
        "gray",
        "black",
        "white",
        "colorful",
      ];
      const dropLetHandler = document.querySelectorAll(".dropLetHandler");
      colorsIcon[index].classList.toggle("active");
      const checkHandler = document.querySelectorAll(".checkHandler");
      checkHandler[index].classList.toggle("active");
      dropLetHandler[index].classList.toggle("active");
      for (let i = 0; i < colorsIcon.length; i++) {
        if (!colorsIcon[i].classList.contains("active")) {
          dataFromFilterBox.colors[i] = "";
        }
      }
      colorsIcon[index].classList.contains("active")
        ? (dataFromFilterBox.colors[index] = defaultColorValues[index])
        : (dataFromFilterBox.colors[index] = null);
      if (colorsIcon[index].classList.contains("active")) {
        dataFromFilterBox.colors[index] = defaultColorValues[index];
        numKey++;
      } else {
        numKey--;
      }
      if (numKey === 0) {
        for (let i = 0; i < defaultColorValues.length; i++) {
          dataFromFilterBox.colors[i] = defaultColorValues[i];
        }
      }
      filterProducts();
    };
    const dateFilterBtnEvent = (index) => {
      const dateTracker = document.querySelectorAll(
        ".calendarProgressBar__tracker"
      );
      if (index === 0 || index === 3) {
        dateTracker.forEach((el) => {
          el.classList.remove("newest");
          el.classList.add("oldest");
        });
        dataFromFilterBox.date = false;
      }
      if (index === 1 || index === 4) {
        dateTracker.forEach((el) => {
          el.classList.remove("oldest");
          el.classList.remove("newest");
        });
        dataFromFilterBox.date = null;
      }
      if (index === 2 || index === 5) {
        dateTracker.forEach((el) => {
          el.classList.add("newest");
          el.classList.remove("oldest");
        });
        dataFromFilterBox.date = true;
      }
      filterProducts();
    };
    const popularityFilterBtn = () => {
      const thumbHandler = document.querySelector(".thumbHandler");
      thumbHandler.classList.toggle("active");
      thumbHandler.classList.contains("active")
        ? (dataFromFilterBox.popularity = true)
        : (dataFromFilterBox.popularity = false);
      filterProducts();
    };
    //EVENT LISTENERS
    accordionOptionsBtn[0].addEventListener("click", () => {
      accordionOptionsExpand(0);
    });
    accordionOptionsBtn[1].addEventListener("click", () => {
      accordionOptionsExpand(1);
    });
    accordionOptionsBtn[2].addEventListener("click", () => {
      accordionOptionsExpand(2);
    });
    accordionOptionsBtn[3].addEventListener("click", () => {
      accordionOptionsExpand(3);
    });
    brandsInputSwitchBtn[0].addEventListener("click", () => {
      brandsOptionClick(0);
    });
    brandsInputSwitchBtn[1].addEventListener("click", () => {
      brandsOptionClick(1);
    });
    brandsInputSwitchBtn[2].addEventListener("click", () => {
      brandsOptionClick(2);
    });
    brandsInputSwitchBtn[3].addEventListener("click", () => {
      brandsOptionClick(3);
    });
    brandsInputSwitchBtn[4].addEventListener("click", () => {
      brandsOptionClick(4);
    });
    brandsInputSwitchBtn[5].addEventListener("click", () => {
      brandsOptionClick(5);
    });
    dateFilterBtn[0].addEventListener("click", () => {
      dateFilterBtnEvent(0);
    });
    dateFilterBtn[1].addEventListener("click", () => {
      dateFilterBtnEvent(1);
    });
    dateFilterBtn[2].addEventListener("click", () => {
      dateFilterBtnEvent(2);
    });
    dateFilterBtn[3].addEventListener("click", () => {
      dateFilterBtnEvent(3);
    });
    dateFilterBtn[4].addEventListener("click", () => {
      dateFilterBtnEvent(4);
    });
    dateFilterBtn[5].addEventListener("click", () => {
      dateFilterBtnEvent(5);
    });
    for (let i = 0; i < colorsIcon.length; i++) {
      colorsIcon[i].addEventListener("click", () => {
        colorsFilterBtn(i);
      });
    }
    for (let i = 0; i < cheapestToMostExpensive.length; i++) {
      cheapestToMostExpensive[i].addEventListener("click", () => {
        dateFilterBtn(i);
      });
    }
    //EVENT LISTENERS
  }, 100);
};
const filterProducts = async () => {
  await fetch(API_URL)
    .then((response) => response.json())
    .then((fetchedData) => {
      filteredData = fetchedData;
    });
  filteredData = backUpData.filter((product) => {
    const passBrandsFilter =
      product.brand == dataFromFilterBox.brands[0] ||
      product.brand == dataFromFilterBox.brands[1] ||
      product.brand == dataFromFilterBox.brands[2];
    const passColorFilter =
      product.color == dataFromFilterBox.colors[0] ||
      product.color == dataFromFilterBox.colors[1] ||
      product.color == dataFromFilterBox.colors[2] ||
      product.color == dataFromFilterBox.colors[3] ||
      product.color == dataFromFilterBox.colors[4] ||
      product.color == dataFromFilterBox.colors[5] ||
      product.color == dataFromFilterBox.colors[6] ||
      product.color == dataFromFilterBox.colors[7] ||
      product.color == dataFromFilterBox.colors[8] ||
      product.color == dataFromFilterBox.colors[9] ||
      product.color == dataFromFilterBox.colors[10] ||
      product.color == dataFromFilterBox.colors[11] ||
      product.color == dataFromFilterBox.colors[12] ||
      product.color == dataFromFilterBox.colors[13] ||
      product.color == dataFromFilterBox.colors[14] ||
      product.color == dataFromFilterBox.colors[15] ||
      product.color == dataFromFilterBox.colors[16] ||
      product.color == dataFromFilterBox.colors[17];
    return passBrandsFilter && passColorFilter;
  });
  if (dataFromFilterBox.popularity === true) {
    filteredData = filteredData.filter((product) => {
      return product.rate[0] >= 4;
    });
  } else {
  }
  if (dataFromFilterBox.date === true) {
    filteredData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }
  if (dataFromFilterBox.date === false) {
    filteredData.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }
  if (dataFromFilterBox.date === null) {
  }
  const productsContainer = document.querySelector(
    ".storePage__container__products__container"
  );
  productsContainer.innerHTML = "";
  await fetch("./components/productCard.html")
    .then((response) => response.text())
    .then((fetchedData) => {
      for (let i = 0; i < filteredData.length; i++) {
        productsContainer.innerHTML += fetchedData;
        const unFlipedProductImage = document.querySelectorAll(
          ".unfliped-product-image"
        );
        unFlipedProductImage[i].src = filteredData[i].image;
        const flipedProductImage = document.querySelectorAll(
          ".fliped-product-image"
        );
        flipedProductImage[i].src = filteredData[i].image;
        const productCardShoeName =
          document.querySelectorAll(".shoe-name__text");
        productCardShoeName[i].innerHTML = filteredData[i].name;
        const productCardShoePrice =
          document.querySelectorAll(".shoe-price__text");
        productCardShoePrice[i].innerHTML = "$" + filteredData[i].price;
        const productCardShoeRate = document.querySelectorAll(
          ".product-rate__container__text"
        );
        productCardShoeRate[i].innerHTML = filteredData[i].rate;
      }
    });
  filterByPrice();
  productScaleHandler();
};
const filterByPrice = async (key) => {
  const searchInput = document.querySelector(".searchInput");
  searchInput.value = "";
  priceFilteredData = filteredData.filter((product) => {
    const passPriceFilter =
      product.price >= dataFromFilterBox.minPrice &&
      product.price <= dataFromFilterBox.maxPrice;
    return passPriceFilter;
  });
  const productsContainer = document.querySelector(
    ".storePage__container__products__container"
  );
  productsContainer.innerHTML = "";
  await fetch("./components/productCard.html")
    .then((response) => response.text())
    .then((fetchedData) => {
      for (let i = 0; i < priceFilteredData.length; i++) {
        productsContainer.innerHTML += fetchedData;
        const unFlipedProductImage = document.querySelectorAll(
          ".unfliped-product-image"
        );
        unFlipedProductImage[i].src = priceFilteredData[i].image;
        const flipedProductImage = document.querySelectorAll(
          ".fliped-product-image"
        );
        flipedProductImage[i].src = priceFilteredData[i].image;
        const productCardShoeName =
          document.querySelectorAll(".shoe-name__text");
        productCardShoeName[i].innerHTML = priceFilteredData[i].name;
        const productCardShoePrice =
          document.querySelectorAll(".shoe-price__text");
        productCardShoePrice[i].innerHTML = "$" + priceFilteredData[i].price;
        const productCardShoeRate = document.querySelectorAll(
          ".product-rate__container__text"
        );
        productCardShoeRate[i].innerHTML = priceFilteredData[i].rate;
      }
    });
  setTimeout(() => {
    if (priceFilteredData.length <= 0) {
      const notFoundStorePage = document.querySelector(
        ".storePage__container__products__notFound"
      );
      notFoundStorePage.classList.add("active");
    } else {
      const notFoundStorePage = document.querySelector(
        ".storePage__container__products__notFound"
      );
      notFoundStorePage.classList.remove("active");
    }
    for (let i = 0; i < priceFilteredData.length; i++) {
      const productCardButton = document.querySelectorAll(
        ".button-section__btn"
      );
      productCardButton[i].addEventListener("click", () => {
        showSelectorPage(priceFilteredData[i].id);
      });
    }
  }, 100);
  productScaleHandler();
  rateHandler(priceFilteredData);
  if (document.querySelector(".filterSmBox") && key === true) {
    document.querySelector(".filterSmBox").style.visibility = "hidden";
  }
};
const showSmFilterBox = () => {
  document.querySelector(".filterSmBox").style.visibility = "visible";
};
const hideSmFilterBox = () => {
  document.querySelector(".filterSmBox").style.visibility = "hidden";
};
const showSmSearchBox = () => {
  document.querySelector(".searchBox__container").style.display = "flex";
};
const hideSmSearchBox = () => {
  document.querySelector(".searchBox__container").style.display = "none";
};
//FILTERS

//ELEMENTS INTRO
const introHomePage = () => {
  const observerHeaderTitle = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document
          .querySelector(".homePageHeaderTitle__text")
          .classList.add("fadeIn");
        document
          .querySelector(".homePageHeaderDescription__text")
          .classList.add("fadeIn");
        document
          .querySelector(".homePageHeaderButton__btn")
          .classList.add("fadeIn");
      } else {
        if (document.querySelector(".homePageHeaderTitle__text")) {
          document
            .querySelector(".homePageHeaderTitle__text")
            .classList.remove("fadeIn");
          document
            .querySelector(".homePageHeaderDescription__text")
            .classList.remove("fadeIn");
          document
            .querySelector(".homePageHeaderButton__btn")
            .classList.remove("fadeIn");
        }
      }
    });
  });
  observerHeaderTitle.observe(document.querySelector(".homePageHeaderTitle"));
  const observerHeaderCarousel = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document
          .querySelector(".homePageHeaderCarousel__container")
          .classList.add("fadeIn");
        document.querySelector(".mainCarouselNextBtn").classList.add("fadeIn");
        document
          .querySelector(".homePageHeaderCarousel__dots__container")
          .classList.add("fadeIn");
      } else {
        if (document.querySelector(".homePageHeaderCarousel__container")) {
          document
            .querySelector(".homePageHeaderCarousel__container")
            .classList.remove("fadeIn");
          document
            .querySelector(".mainCarouselNextBtn")
            .classList.remove("fadeIn");
          document
            .querySelector(".homePageHeaderCarousel__dots__container")
            .classList.remove("fadeIn");
        }
      }
    });
  });
  observerHeaderCarousel.observe(
    document.querySelector(".homePageHeaderCarousel__container")
  );
  const observerHeaderBrands = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".brandsImageBox").forEach((el) => {
          el.classList.add("fadeIn");
        });
      } else {
        document.querySelectorAll(".brandsImageBox").forEach((el) => {
          el.classList.remove("fadeIn");
        });
      }
    });
  });
  observerHeaderBrands.observe(
    document.querySelector(".homePageHeaderBrandSupports")
  );
  const observerHeader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document
          .querySelector(".homePageHeaderBackground")
          .classList.add("fadeIn");
      } else {
        if (document.querySelector(".homePageHeaderBackground")) {
          document
            .querySelector(".homePageHeaderBackground")
            .classList.remove("fadeIn");
        }
      }
    });
  });
  observerHeader.observe(document.querySelector(".homePageHeader"));
  const observerNewArrivalHeader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document
          .querySelector(".homePageNewArrivalHeaderTitle")
          .classList.add("fadeIn");
      } else {
        document
          .querySelector(".homePageNewArrivalHeaderTitle")
          .classList.remove("fadeIn");
      }
    });
  });
  observerNewArrivalHeader.observe(
    document.querySelector(".homePageNewArrivalHeaderTitle")
  );
  const observerNewArrivalDescription = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document
          .querySelector(".homePageNewArrivalHeaderDescription")
          .classList.add("fadeIn");
      } else {
        document
          .querySelector(".homePageNewArrivalHeaderDescription")
          .classList.remove("fadeIn");
      }
    });
  });
  observerNewArrivalDescription.observe(
    document.querySelector(".homePageNewArrivalHeaderDescription")
  );
  const observerNewArrivalProductCards = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".product-cards").forEach((el) => {
          el.classList.add("fadeIn");
        });
      } else {
        document.querySelectorAll(".product-cards").forEach((el) => {
          el.classList.remove("fadeIn");
        });
      }
    });
  });
  observerNewArrivalProductCards.observe(
    document.querySelector(".homePageNewArrival__container")
  );
  const observerBestSellerHeader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document
          .querySelectorAll(".bestSellerHeader-title__text")
          .forEach((el) => {
            el.classList.add("fadeIn");
          });
      } else {
        document
          .querySelectorAll(".bestSellerHeader-title__text")
          .forEach((el) => {
            el.classList.remove("fadeIn");
          });
      }
    });
  });
  document.querySelectorAll(".bestSellerHeader-title__text").forEach((el) => {
    observerBestSellerHeader.observe(el);
  });
  const observerBestSellerCarousel = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelector(".draggableCarousel").classList.add("fadeIn");
        document
          .querySelector(".bestSellerHeader-description__text")
          .classList.add("fadeIn");
        document.querySelector(".embla__prev").classList.add("fadeIn");
        document.querySelector(".embla__next").classList.add("fadeIn");
      } else {
        document.querySelector(".draggableCarousel").classList.remove("fadeIn");
        document
          .querySelector(".bestSellerHeader-description__text")
          .classList.remove("fadeIn");
        document.querySelector(".embla__prev").classList.remove("fadeIn");
        document.querySelector(".embla__next").classList.remove("fadeIn");
      }
    });
  });
  observerBestSellerCarousel.observe(
    document.querySelector(".draggableCarousel")
  );
};
//ELEMENTS INTRO

//SEARCH PRODUCTS STORE PAGE
const searchProducts = async () => {
  setTimeout(() => {
    const searchInput = document.querySelector(".searchInput");
    searchInput.addEventListener("input", async (e) => {
      if (searchInput.value === "") {
        filterByPrice();
      }
      const productsContainer = document.querySelector(
        ".storePage__container__products__container"
      );
      const result = filteredData.filter((item) => {
        const searchItem = item.name
          .toLowerCase()
          .includes(searchInput.value.toLowerCase().trim());
        let inputLength = searchInput.value;
        if (inputLength.length === 0) {
          productsContainer.innerHTML = "";
        } else {
          return searchItem;
        }
      });
      productsContainer.innerHTML = "";
      if (result.length === 0) {
        productsContainer.innerHTML = "";
        return;
      }
      await fetch("./components/productCard.html")
        .then((response) => response.text())
        .then((fetchedData) => {
          for (let i = 0; i < result.length; i++) {
            productsContainer.innerHTML += fetchedData;
            const unFlipedProductImage = document.querySelectorAll(
              ".unfliped-product-image"
            );
            unFlipedProductImage[i].src = result[i].image;
            const flipedProductImage = document.querySelectorAll(
              ".fliped-product-image"
            );
            flipedProductImage[i].src = result[i].image;
            const productCardShoeName =
              document.querySelectorAll(".shoe-name__text");
            productCardShoeName[i].innerHTML = result[i].name;
            const productCardShoePrice =
              document.querySelectorAll(".shoe-price__text");
            productCardShoePrice[i].innerHTML = "$" + result[i].price;
            const productCardShoeRate = document.querySelectorAll(
              ".product-rate__container__text"
            );
            productCardShoeRate[i].innerHTML = result[i].rate;
          }
          const productCard = document.querySelectorAll(".product-cards");
          productCard.forEach((product) => {
            product.style.scale = 1;
          });
        });
      for (let i = 0; i < result.length; i++) {
        const productCardButton = document.querySelectorAll(
          ".button-section__btn"
        );
        productCardButton[i].addEventListener("click", () => {
          showSelectorPage(result[i].id);
        });
      }
      rateHandler(result);
    });
  }, 200);
};
const showFilter = () => {
  const accordionFilterBox = document.querySelector(".accordionFilterBox");
  accordionFilterBox.classList.toggle("active");
};
//SEARCH PRODUCTS STORE PAGE

//ROUTER
const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  router();
  positionsOfMainCarouselContents = [0, -600, -1200, -1800, -2400];
  dotCountMainCarousel = 0;
  xPositionsOfNewArrivalCarouselContents = [0, -400, -800, -1200];
  yPositionsOfNewArrivalCarouselContents = [0, -400, -800, -1200];
  countNewArrival = 0;
  window.scroll(0, 0);
  navIconEvent();
};
const loadPages = async (page) => {
  await fetch(`./views/${page}`)
    .then((response) => response.text())
    .then((fetchedData) => {
      contentApp.innerHTML = fetchedData;
    });
};
const router = async () => {
  let path = window.location.search;
  path = path.replace("?", "");
  path = path.split("=");
  switch (path[1]) {
    case "store":
      loadPages("storePageView.html");
      setTimeout(() => {
        const lgMenuItems = document.querySelectorAll(".largeMenu-items__text");
        lgMenuItems.forEach((el) => {
          el.classList.remove("active");
        });
        lgMenuItems[1].classList.add("active");
        filterHandler();
        renderFilterBoxToStorePage();
        renderProductCardsToStorePage();
        searchProducts();
        productScaleHandler();
      }, 200);
      break;
    case undefined:
      loadPages("homePageView.html");
      setTimeout(() => {
        const lgMenuItems = document.querySelectorAll(".largeMenu-items__text");
        lgMenuItems.forEach((el) => {
          el.classList.remove("active");
        });
        lgMenuItems[0].classList.add("active");
        renderProductCards();
        introHomePage();
        DraggableCarousel();
      }, 200);
      break;
    case "contacts":
      loadPages("contactPageView.html");
      setTimeout(() => {
        const lgMenuItems = document.querySelectorAll(".largeMenu-items__text");
        lgMenuItems.forEach((el) => {
          el.classList.remove("active");
        });
        lgMenuItems[2].classList.add("active");
      }, 200);
      break;
    case "about":
      loadPages("aboutPageView.html");
      setTimeout(() => {
        const lgMenuItems = document.querySelectorAll(".largeMenu-items__text");
        lgMenuItems.forEach((el) => {
          el.classList.remove("active");
        });
        lgMenuItems[3].classList.add("active");
      }, 200);
      break;
    case "login":
      const lgMenuItems = document.querySelectorAll(".largeMenu-items__text");
      lgMenuItems.forEach((el) => {
        el.classList.remove("active");
      });
      loadPages("loginPageView.html");
      setTimeout(() => {
        repeatPassChecker();
      }, 200);
  }
  setTimeout(() => {
    rateHandler(backUpData);
  }, 300);
};
router();
//ROUTER

//SELECTING SIZE
const selectSize = (index) => {
  let obj = {
    id: null,
    name: null,
    image: null,
    description: null,
    price: null,
    rate: null,
    brand: null,
    date: null,
    color: null,
    sizes: [],
    userChanging: null,
    userSelectedSize: "",
  };
  const size = document.querySelectorAll(".size");
  size.forEach((el) => {
    el.classList.remove("active");
  });
  size[index].classList.add("active");
  selectedProduct[0].userSelectedSize = selectedProduct[0].sizes[index];
  obj.id = selectedProduct[0].id;
  obj.name = selectedProduct[0].name;
  obj.image = selectedProduct[0].image;
  obj.description = selectedProduct[0].description;
  obj.price = selectedProduct[0].price;
  obj.rate = selectedProduct[0].rate;
  obj.brand = selectedProduct[0].brand;
  obj.date = selectedProduct[0].date;
  obj.color = selectedProduct[0].color;
  obj.sizes = selectedProduct[0].sizes;
  obj.userChanging = selectedProduct[0].userChanging;
  obj.userSelectedSize = selectedProduct[0].userSelectedSize;
  willPushToCart = obj;
};
//SELECTING SIZE

//RATE HANDLER
const rateHandler = async (data) => {
  let num = 4;
  const productStart = document.querySelectorAll(`.product-stars__container`);
  if (data) {
    for (let i = 0; i < data.length; i++) {
      let starsContainer = productStart[i];
      if (starsContainer) {
        for (let j = 0; j < data[i].rate[0]; j++) {
          starsContainer.children[j + num - j].style.color = "gold";
          num--;
        }
      }
      num = 4;
    }
  } else {
    return;
  }
};
//RATE HANDLER

//ADD TO CART
const loadMyCartToNavBar = async () => {
  const myCartBox = document.querySelector(".myCartBox__container__items");
  myCartBox.innerHTML = "";
  for (let i = 0; i < myCart.length; i++) {
    let html = `
        <div class="myCartBox-item">
        <div class="myCartBox-item__firstPart">
            <div class="myCartBox-item__firstPart__imageSection">
                <img src="${myCart[i].image}" class="myCartBox-productImg">
            </div>
            <div class="myCartBox-item__firstPart__titleSection">
                <h2 class="myCartBox-productTitle">${myCart[i].name}</h2>
                <p class="myCartBox-productDescription">Size: ${myCart[i].userSelectedSize}</p>
            </div>
        </div>
        <div class="myCartBox-item__secondPart">
            <div class="myCartBox-item__secondPart__priceSection">
                <h4 class="myCartBox-productPrice">$${myCart[i].price}.00</h4>
            </div>
        </div>
    </div>
        `;
    myCartBox.innerHTML += html;
  }
};
const showSelectorPage = async (id) => {
  window.scroll(0, 0);
  await fetch("./views/productSelectorView.html")
    .then((res) => res.text())
    .then((fetchedData) => {
      contentApp.innerHTML = fetchedData;
    });
  selectedProduct = [];
  window.history.pushState({}, "", `?page=store&product=${id}`);
  let pathId = window.location.search.split("&");
  pathId = pathId[1];
  pathId = pathId.split("=");
  pathId = pathId[1];
  await fetch(`http://localhost:3000/sneakers/${pathId}`)
    .then((response) => response.json())
    .then((fetchedData) => {
      selectedProduct.push(fetchedData);
    });
  const brand = document.querySelector(".brandPart__text");
  brand.innerHTML = selectedProduct[0].brand;
  const name = document.querySelector(".namePart__text");
  name.innerHTML = selectedProduct[0].name;
  const price = document.querySelector(".pricePart__text");
  price.innerHTML = "$" + selectedProduct[0].price + ".00";
  const description = document.querySelector(".descriptionSection__text");
  description.innerHTML = selectedProduct[0].description;
  const productImg = document.querySelector(".pictureSection__img");
  productImg.src = selectedProduct[0].image;
  const productRate = document.querySelector(".rateStarsText__text");
  productRate.innerHTML = selectedProduct[0].rate;
  const stars = document.querySelectorAll(".stars");
  for (let i = 0; i < selectedProduct[0].rate[0]; i++) {
    stars[i].classList.add("active");
  }
  const addToCartBtn = document.querySelector(".btnSection__btn");
  addToCartBtn.addEventListener("click", () => {
    addToCart();
  });
  sizeHandler();
};
const sizeHandler = () => {
  const sizeBoxContainer = document.querySelector(".optionsSection__sizes");
  for (let i = 0; i < selectedProduct[0].sizes.length; i++) {
    sizeBoxContainer.innerHTML += `
        <span class="size" onclick="selectSize(${i})">${selectedProduct[0].sizes[i]}</span>
        `;
  }
};
const addToCart = async () => {
  const cartCount = document.querySelector(".cartCount");
  const size = document.querySelectorAll(".size");
  // if(myCart.length >= 1){
  //     console.log('myCart length > 1')
  //     myCart.push(willPushToCart);
  //     console.log(myCart);
  //     for(let i = 0; i<myCart.length; i++){
  //         // if(myCart[i].id === window.location.search.split('&')[1].split('=')[1]){
  //         //     console.log(myCart[i].userSelectedSize);
  //         //     console.log(selectedProduct.userSelectedSize);
  //         //     // if(myCart[i].userSelectedSize === selectedProduct.userSelectedSize){
  //         //     //     console.log('is equal');
  //         //     //     // you added this products after
  //         //     //     Toastify({
  //         //     //         text:'is exist',
  //         //     //         className:'info',
  //         //     //         style:{
  //         //     //             background:'red',
  //         //     //             color:'white',
  //         //     //             fontFamily:'trakya'
  //         //     //         }
  //         //     //     }).showToast()
  //         //     // }else{
  //         //     //     myCart.push(willPushToCart);
  //         //     //     console.log(myCart)
  //         //     //     Toastify({
  //         //     //         text:'Product successfully added to your cart',
  //         //     //         className:'info',
  //         //     //         style:{
  //         //     //             background:'green',
  //         //     //             color:'white',
  //         //     //             fontFamily:'trakya'
  //         //     //         }
  //         //     //     }).showToast()
  //         //     //     // myCart.push(selectedProduct);
  //         //     // }
  //         //     // for(let j = 0; j<myCart.length; j++){
  //         //     //     console.log(myCart[i].userSelectedSize);
  //         //     //     if(myCart[i].userSelectedSize === selectedProduct.userSelectedSize){
  //         //     //         Toastify({
  //         //     //             text:'This product is already exist in your cart!',
  //         //     //             style: {
  //         //     //                 background:'red',
  //         //     //                 color:'white',
  //         //     //                 fontFamily:'trakya'
  //         //     //             }
  //         //     //         }).showToast()
  //         //     //         return
  //         //     //     }
  //         //     // }
  //         // }
  //     }
  //     Toastify({
  //         text:'Product successfully added to your cart',
  //         className:'info',
  //         style:{
  //             background:'green',
  //             color:'white',
  //             fontFamily:'trakya'
  //         }
  //     }).showToast()
  // }
  // else{
  //     Toastify({
  //         text:'Product successfully added to your cart',
  //         className:'info',
  //         style:{
  //             background:'green',
  //             color:'white',
  //             fontFamily:'trakya'
  //         }
  //     }).showToast()
  //     myCart.push(willPushToCart);
  // // }
  // if(myCart.length >= 1){
  //     console.log(willPushToCart.userSelectedSize)
  //     let allItemWithSameId = [];
  //     for(let i = 0; i<myCart.length; i++){
  //         if(myCart[i].id === window.location.search.split('&')[1].split('=')[1]){
  //             if(myCart[i].userSelectedSize === willPushToCart.userSelectedSize){
  //             }
  //             else{
  //                 myCart.push(willPushToCart)
  //             }
  //             // allItemWithSameId.push(myCart[i])
  //             // allItemWithSameId.forEach((item) => {
  //             //       if(item.userSelectedSize === willPushToCart.userSelectedSize){
  //             //            console.log('is equal');
  //             //         //    myCart.forEach((list) =>{
  //             //         //     if(item.userSelectedSize === list.userSelectedSize){
  //             //         //         // console.log(list)
  //             //         //         // myCart.splice(list, 1)
  //             //         //     }
  //             //         //    })
  //             //         }else{
  //             //             // myCart.push(item)
  //             //             // console.log(myCart);
  //             //         }
  //             //     })
  //             //     console.log(sum)
  //             // if(myCart[i].userSelectedSize === willPushToCart.userSelectedSize){
  //             //     console.log('error');
  //             // }
  //             // else{
  //             //     myCart.push(willPushToCart)
  //             //     // myCart[i].id = myCart[i].id * myCart[i].userSelectedSize
  //             //     // console.log(myCart[i]);
  //             // }
  //         }
  //     }
  // }
  // else{
  //     myCart.push(willPushToCart)
  // }
  // if(myCart.length >= 1){
  // for(let i = 0; i<myCart.length; i++){
  //     dataF.push(myCart[i].userSelectedSize)
  //     if(myCart[i].id === window.location.search.split('&')[1].split('=')[1]){
  //         // if(dataF.includes(willPushToCart.userSelectedSize)){
  //         //     console.log('این کفش قبلا در سبد خرید بوده')
  //         //     myCart.pop()
  //         // }
  //         // else{
  //         //     myCart.push(willPushToCart)
  //         // }
  //     }
  // }
  if (myCart.some((index) => index.id === willPushToCart.id)) {
    if (
      myCart.some(
        (index) => index.userSelectedSize === willPushToCart.userSelectedSize
      )
    ) {
      Toastify({
        text: "This product is already exist in your cart!",
        style: {
          background: "red",
          color: "white",
          fontFamily: "trakya",
        },
      }).showToast();
    } else {
      Toastify({
        text: "Successfully added!",
        style: {
          background: "green",
          color: "white",
          fontFamily: "trakya",
        },
      }).showToast();
      myCart.push(willPushToCart);
    }
  } else {
    Toastify({
      text: "Successfully added!",
      style: {
        background: "green",
        color: "white",
        fontFamily: "trakya",
      },
    }).showToast();
    myCart.push(willPushToCart);
  }
  // }
  // else{
  //     myCart.push(willPushToCart)
  // }
  cartCountNum = myCart.length;
  cartCount.innerHTML = cartCountNum;
  loadMyCartToNavBar();

  // size.forEach((el)=>{
  //     if(el.classList.contains('active')){

  //     }
  //     else{
  //         return
  //     }
  // })
  // Toastify({
  //     text:'Please select size form sizes!',
  //     style: {
  //         background:'red',
  //         color:'white',
  //         fontFamily:'trakya'
  //     }
  // }).showToast()
};
//ADD TO CART

//LOAD MY CART PAGE
const loadCartPage = async (key) => {
  if (key === true) {
    navIconEvent();
  }
  window.history.pushState({}, "", "/app.html?page=myCart");
  await fetch("./views/myCartPageView.html")
    .then((response) => response.text())
    .then((fetchedData) => {
      contentApp.innerHTML = fetchedData;
    });
  const lsContainer = document.querySelector(".leftSide-body__container");
  lsContainer.innerHTML = "";
  const countItemValue = document.querySelector(".itemsLs__text");
  if (myCart.length === 0) {
    countItemValue.innerHTML = "0 Item";
  } else {
    countItemValue.innerHTML = myCart.length + " Items";
  }
  if (myCart.length === 0) {
    lsContainer.innerHTML =
      '<p class="emptyCartAlaram"><span class="emptyCartAlaram__icon"><i class="fa fa-circle-xmark"></i></span> Your cart is empty</p>';
  } else {
    for (let i = 0; i < myCart.length; i++) {
      let html = `
            <div class="cartItem">
            <div class="cartItem__container">
                <div class="cartItem-imageSection">
                    <img src="${myCart[i].image}" class="cartItemImg">
                </div>
                <div class="cartItem-headerSection">
                    <div class="cartItem-name">
                        <h1 class="cartItem-name__text">${myCart[i].name}</h1>
                    </div>
                    <div class="cartItem-description">
                        <div class="cartItem-description__text">Size: ${
                          myCart[i].userSelectedSize
                        }</div>
                    </div>
                </div>
                <div class="cartItem-countSection">
                    <span class="countSectionHeader">Quantity</span>
                    <div class="countSectionBox">
                        <div class="decreasingBtn" onclick="decreaseCount(${i})"><span class="decreasingBtn__icon"><i class="fa fa-minus"></i></span></div>
                        <span class="countValue">${
                          myCart[i].userChanging
                        }</span>
                        <div class="increasingBtn" onclick="increaseCount(${i})"><span class="increasingBtn__icon"><i class="fa fa-plus"></i></span></div>
                    </div>
                </div>
                <div class="cartItem-priceSection">
                    <span class="cartItemPriceHeader">Price</span>
                    <span class="cartItemPrice">$${myCart[i].price}.00</span>
                </div>
                <div class="cartItem-totalPriceSection">
                    <span class="cartItemTotalPriceHeader">Total</span>
                    <span class="cartItemTotalPrice">$${
                      myCart[i].price * myCart[i].userChanging
                    }.00</span>
                </div>
                <div class="cartItem-removeSection">
                    <span class="removeIcon" onclick="deleteSelectedItemsFromCart(${i})"><i class="fa fa-trash"></i></span>
                </div>
            </div>
        </div>
            `;
      lsContainer.innerHTML += html;
    }
  }
  totalPriceHandler();
};
//LOAD MY CART PAGE

const showDeliveryCombo = () => {
  const comboDelivery = document.querySelector(".comboBox-delivery");
  comboDelivery.classList.toggle("active");
};

const deleteProductFromCart = (index) => {
  const removeBtn = document.querySelectorAll(".btnRemover__btn");
  removeBtn[1].classList.add("active");
  const selectItem = document.querySelectorAll(".selectItem");
  if (selectItem[index].checked === true) {
    willDelete.push(myCart[index]);
  } else {
    willDelete = willDelete.filter((product) => product.id != myCart[index].id);
  }
};

const deleteSelectedItemsFromCart = (index) => {
  let willDelete = myCart[index];
  myCart = myCart.filter((index) => {
    const remove = index != willDelete;
    return remove;
  });
  loadCartPage();
  loadMyCartToNavBar();
  const cartCount = document.querySelector(".cartCount");
  cartCountNum = myCart.length;
  cartCount.innerHTML = cartCountNum;
};
const deleteAllFromCart = (e) => {
  myCart = [];
  loadCartPage();
  loadMyCartToNavBar();
  const cartCount = document.querySelector(".cartCount");
  cartCountNum = myCart.length;
  cartCount.innerHTML = cartCountNum;
};

const increaseCount = (index) => {
  const countValue = document.querySelectorAll(".countValue");
  const decreasingBtn = document.querySelectorAll(".decreasingBtn");
  decreasingBtn[index].classList.remove("active");
  let count = parseInt(countValue[index].innerHTML);
  count++;
  countValue[index].innerHTML = count;
  myCart[index].userChanging = count;
  loadCartPage();
};
const decreaseCount = (index) => {
  const countValue = document.querySelectorAll(".countValue");
  const decreasingBtn = document.querySelectorAll(".decreasingBtn");
  let count = parseInt(countValue[index].innerHTML);
  if (count > 1) {
    count--;
    countValue[index].innerHTML = count;
    myCart[index].userChanging = count;
    loadCartPage();
  } else {
    decreasingBtn[index].classList.add("active");
  }
};

const deliveryOptionHandler = (index) => {
  const comboOption = document.querySelectorAll(".comboOption");
  comboOption.forEach((el) => {
    el.classList.remove("active");
  });
  comboOption[index].classList.add("active");
  index === 0
    ? (deliveryPrice = 20)
    : index === 1
    ? (deliveryPrice = 12)
    : index === 2
    ? (deliveryPrice = 0)
    : "";
  totalPriceHandler();
};

const totalPriceHandler = () => {
  totalPrice = 0;
  const totalPriceText = document.querySelectorAll(".totalbf__text");
  const totalPriceCheckOut = document.querySelector(
    ".totalPriceCheckOut__text"
  );
  const deliveryPriceCheckOut = document.querySelector(
    ".deliveryPriceCheckOut__text"
  );
  const taxCheckOut = document.querySelector(".taxCheckOut__text");
  const subTotalText = document.querySelector(".subTotal__text");
  for (let i = 0; i < myCart.length; i++) {
    totalPrice += myCart[i].price * myCart[i].userChanging;
  }
  let subtotal = totalPrice;
  totalPriceText[1].innerHTML = "$" + totalPrice + ".00";
  totalPriceCheckOut.innerHTML = "$" + totalPrice + ".00";
  deliveryPriceCheckOut.innerHTML = "$" + deliveryPrice + ".00";
  let withoutTax = subtotal + deliveryPrice;
  let tax = (withoutTax / 100) * 5;
  tax = Math.round(tax);
  taxCheckOut.innerHTML = "$" + tax + ".00";
  subTotalText.innerHTML = "$" + (parseInt(withoutTax) + parseInt(tax)) + ".00";
};

//contact
const showTicketBox = () => {
  const rightSideContactUs = document.querySelector(".rightSide");
  const contactBox = document.querySelector(".contactBox");
  const leftSide = document.querySelector(".leftSide");
  rightSideContactUs.classList.add("active");
  contactBox.classList.add("active");
  leftSide.classList.add("active");
};
const hideTicketBox = () => {
  const rightSideContactUs = document.querySelector(".rightSide");
  const contactBox = document.querySelector(".contactBox");
  const leftSide = document.querySelector(".leftSide");
  rightSideContactUs.classList.remove("active");
  contactBox.classList.remove("active");
  leftSide.classList.remove("active");
};
//contact

const hideOrShowPass = (index) => {
  const passwordInput = document.getElementById("passwordLg");
  const hideOrShowPass = document.querySelectorAll(".hideOrShowPass i");
  const registerInputs = document.querySelectorAll(".registerInputs");
  if (passwordInput.type === "text") {
    hideOrShowPass[index].classList.add("fa-eye-slash");
    hideOrShowPass[index].classList.remove("fa-eye");
    passwordInput.type = "password";
    if (index === 1) {
      registerInputs[1].type = "password";
      registerInputs[2].type = "password";
    }
  } else {
    hideOrShowPass[index].classList.remove("fa-eye-slash");
    hideOrShowPass[index].classList.add("fa-eye");
    passwordInput.type = "text";
    if (index === 1) {
      registerInputs[1].type = "text";
      registerInputs[2].type = "text";
    }
  }
};

const rotateToRegisterPage = () => {
  const loginPageContainer = document.querySelector(".loginPage__container");
  const loginForm = document.querySelector(".loginForm");
  const registerForm = document.querySelector(".registerForm");
  registerForm.style.opacity = 1;
  loginForm.style.opacity = 0;
  loginForm.style.visibility = "hidden";
  loginPageContainer.classList.add("active");
};
const rotateToLoginPage = () => {
  const loginPageContainer = document.querySelector(".loginPage__container");
  const loginForm = document.querySelector(".loginForm");
  const registerForm = document.querySelector(".registerForm");
  loginPageContainer.classList.remove("active");
  registerForm.style.opacity = 0;
  loginForm.style.opacity = 1;
  loginForm.style.visibility = "visible";
};

const repeatPassChecker = () => {
  const firstPassChecker = document.getElementById("passChecker-1");
  const secondPassChecker = document.getElementById("passChecker-2");
  firstPassChecker.addEventListener("input", repeatPassCheckerHandler);
  secondPassChecker.addEventListener("input", repeatPassCheckerHandler);
};

const repeatPassCheckerHandler = () => {
  const firstPassChecker = document.getElementById("passChecker-1");
  const secondPassChecker = document.getElementById("passChecker-2");
  const dynamicBorder = document.querySelectorAll(".dynamicBorder");
  const registerBtn = document.querySelector(".registerBtn");
  if (
    firstPassChecker.value === secondPassChecker.value &&
    firstPassChecker.value != 0
  ) {
    dynamicBorder.forEach((el) => {
      el.style.borderColor = "green";
      registerBtn.classList.add("active");
    });
  } else {
    dynamicBorder.forEach((el) => {
      el.style.borderColor = "red";
      registerBtn.classList.remove("active");
    });
  }
};
let justForCheck = [];
let dataFound;
const postData = async () => {
  const inputValues = document.querySelectorAll(".registerInputs");
  const userRg = document.getElementById("userRg");
  await fetch("/usersData.json")
    .then((response) => response.json())
    .then((fetchedData) => {
      justForCheck = fetchedData.users;
    });
  let obj = {
    id: justForCheck.length + 1,
    username: `${inputValues[0].value}`,
    password: `${inputValues[2].value}`,
  };
  let usernameLength = inputValues[0].value.length;
  if (usernameLength <= 4) {
    Toastify({
      text: "You must fill all of the fields",
      style: {
        background: "red",
        color: "white",
        fontFamily: "trakya",
      },
    }).showToast();
  } else {
    if (justForCheck.some((index) => index.username === inputValues[0].value)) {
      userRg.style.borderColor = "red";
      Toastify({
        text: "This username already exist!",
        style: {
          background: "red",
          color: "white",
          fontFamily: "trakya",
        },
      }).showToast();
    } else {
      await fetch("./usersData.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
    }
  }
};
const getData = async () => {
  const loginInputs = document.querySelectorAll(".loginInputs");
  const loginMiniDashboard = document.querySelector(".loginMiniDashboard");
  await fetch("./usersData.json")
    .then((response) => response.json())
    .then((fetchedData) => {
      dataFound = fetchedData.find(
        (index) => index.username === loginInputs[0].value
      );
      if (loginInputs[1].value === dataFound.password) {
        Toastify({
          text: `welcome back ${loginInputs[0].value}`,
          style: {
            background: "green",
            color: "#fff",
            fontFamily: "trakya",
          },
        }).showToast();
        let html = `
            <img src="../images/homePage/user_318-159711.avif" class="userImg">
            <h5 class="accUser">account: ${dataFound.username}</h5>
            <p class="accId">id: ${dataFound.id}</p>
            `;
        loginMiniDashboard.innerHTML = html;
      } else {
        Toastify({
          text: `Your username or password is incorrect`,
          style: {
            background: "red",
            color: "#fff",
            fontFamily: "trakya",
          },
        }).showToast();
      }
    });
};
