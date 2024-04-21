import * as module from '../js/module.js';
import RecipeView from '../js/views/recipeView.js';
import SearchView from './views/searchResultsView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { async } from 'regenerator-runtime';

import icons from '../img/icons.svg';
import resultsView from './views/resultsView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

// if(module.hot)module.hot.accept();

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log('id of control Recipe ', id);
    if (!id) return;
    // Update the results view to mark selected Search Results :
    ResultsView.update(module.getSearchResultPage());

    // Update the bookmarks view to mark selected :
    bookmarksView.update(module.stat.bookmarks);

    // loading the spinner :
    RecipeView.renderSpinner();

    // loading the recipe :
    await module.loadRecipe(id);

    // rendering the recipe :
    RecipeView.render(module.stat.recipe); // Object الوصفة عبارة عن
  } catch (error) {
    RecipeView.renderErrorMessage();
    console.error('>>', error);
  }
};

// 2nd Subscriber :
const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // get Search Query :
    const query = SearchView.getQuery();
    if (!query) return;

    // Loading the Search Results :
    await module.loadSearchResults(query);

    // Rendering amount Search Results 👇👇( عرض عدد النتائج المرادة)
    ResultsView.render(module.getSearchResultPage());

    // 4) Rendering the initial Pagination : (عرض الأزرار ، والنتائج الأولية )
    paginationView.render(module.stat.search);
  } catch (error) {
    ResultsView.renderErrorMessage();
  }
};

const controlPagination = function (goToPage) {
  // Rendering the NEW Results ( page number of "goToPage" ) ;
  // DOM عرض النتائج على حسب المعلومات القادمة من
  ResultsView.render(module.getSearchResultPage(goToPage));

  // 4) Rendering NEW Pagination Buttons : (UI تحديث المعلومات على )
  paginationView.render(module.stat.search);
};

const controlUpdateServings = function (newServings) {
  //Update the recipe Servings in (stat) :
  module.updateServing(newServings);

  // render the NEW Servings into the recipe :
  RecipeView.update(module.stat.recipe); // "old ways "❌

  // update "ONLY" the NEW Serving into recipe :  "better ways ✅"
  // RecipeView.update(module.stat.recipe);
};

const controlBookmark = function () {
  // Add / Remove bookmarks :
  if (!module.stat.recipe.bookmarked) module.addBookmark(module.stat.recipe);
  else module.deleteBookmark(module.stat.recipe.id);

  // Update recipe view  :
  RecipeView.update(module.stat.recipe);

  // Render the bookmarks :
  bookmarksView.render(module.stat.bookmarks);
};


// In the Controller View :
const controlLoadBookmarks = function () {
  bookmarksView.render(module.stat.bookmarks);
};
const controlAddRecipeView = async function(newRecipe) {
  try {
    //show loading spinner :>
    addRecipeView.renderSpinner();

    // Upload the new recipe to the API server:>
    await module.uploadRecipe(newRecipe);
    // Render the Uploaded Recipe :>
    RecipeView.render(module.stat.recipe);

    // Render the success message :>
    addRecipeView.renderMessage();

    // Render the bookmarks :>
    bookmarksView.render(module.stat.bookmarks);
    
    // Change ID in URL :>
    window.history.pushState(null, "", module.stat.recipe.id);

    // Close the modal window :>
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, 2000 );

    console.log(module.stat.recipe);

  }catch(error) {
    console.log(error);
    addRecipeView.renderErrorMessage(error.message);
  }
}

const controlUploadRecipe = async function(newRecipe) {
}
const init = function () {
  // calling the function :>
  bookmarksView.addHandlerRender(controlLoadBookmarks);

  // calling the Subscriber function (controlRecipe) ;
  RecipeView.addHandlerRender(controlRecipe);

  // calling the 2nd Subscriber function (controlSearchResults) ;
  SearchView.addHandlerSearchResults(controlSearchResults);
  RecipeView.addHandlerBookmark(controlBookmark);

  // calling the 3rd Subscriber function (controlUpdateServing) ;
  RecipeView.addHandlerUpdateServings(controlUpdateServings);

  //calling the 4th subscriber function (controlPagination)  ;
  paginationView.addHandlerClick(controlPagination);

  // calling the 5th subscriber function (controlAddRecipeView) ;
  addRecipeView.addHandlerUpload(controlAddRecipeView);

};
init();

///////////////////////////////////////
/*
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    renderSpinner(recipeContainer);
    // 1: loading the recipe :
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    console.log('response', response);
    const data = await response.json();
    console.log(data);
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // ! 2: Rendering the recipe
    renderRecipe(recipe);
  } catch (error) {
    alert(error);
  }
};
// showRecipe();

function renderRecipe(recipe) {
  const markup = `
  
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
    recipe.title
  }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons} #icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(ingredient => {
              return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>
            `;
            })
            .join('')}

           
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        
  `;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', markup);
}

function renderSpinner(parentElement) {
  const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
  </div
  `;
  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
}

 ["hashchange", "load"].forEach(event => window.addEventListener(event, showRecipe));

*/
