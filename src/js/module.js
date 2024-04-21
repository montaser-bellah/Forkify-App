import * as config from './configuration.js';
import * as helpers from './helpers.js';
export const stat = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    numberOfResultsInPage: 10,
  },
  bookmarks: [],
};

/**
 * 
 * @param {Object} data the will be a recipe 
 * @returns {Object} the object is the recipe .
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
// getting the Recipe from API depending on the id :>
/**
 * 
 * @param {string} id an the attribute  of the recipe 
 * @return {Object} Object "data" == recipe will be rendered in the DOM
 */
export const loadRecipe = async function (id) {
  try {
    const data = await helpers.getJSON(
      `${config.API_URL}${id}?key= ${config.KEY}`
    );
    stat.recipe = createRecipeObject(data);

    stat.bookmarks.some(bookmark => bookmark.id === id)
      ? (stat.recipe.bookmarked = true)
      : (stat.recipe.bookmarked = false);
  } catch (error) {
    throw error;
  }
};

/**
 * 
 * @param {string} query query is the string to search for specific recipe .
 */
// getting data about the Search results :>
export const loadSearchResults = async function (query) {
  try {
    stat.search.query = query;
    const data = await helpers.getJSON(
      `${config.API_URL}?search=${query} &key= ${config.KEY}`
    );
    stat.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
    ...(recipe.key && {key : recipe.key}),
      };
    });
    stat.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultPage = function (page = stat.search.page) {
  stat.search.page = page;
  const start = (page - 1) * stat.search.numberOfResultsInPage;
  const end = page * stat.search.numberOfResultsInPage;
  console.log(start, end);
  return stat.search.results.slice(start, end);
};

export const updateServing = function (newServing) {
  stat.recipe.ingredients.forEach(ingredient => {
    //newQuantity = oldQuantity * newServing / oldServing .
    ingredient.quantity =
      (ingredient.quantity * newServing) / stat.recipe.servings;
  });
  stat.recipe.servings = newServing;
};

export const addBookmark = function (recipe) {
  if (recipe.id === stat.recipe.id) {
    //mark current recipe as  a bookmark :
    stat.recipe.bookmarked = true;

    // push the current recipe to the bookmarks list :
    stat.bookmarks.push(recipe);

    // store the current recipe into the localStorage :
    persistBookmark();
  }
};

export const deleteBookmark = function (id) {
  // delete the bookmark :
  const index = stat.bookmarks.findIndex(recipe => recipe.id === id);
  stat.bookmarks.splice(index, 1);

  // make the recipe as NOT a bookmark :
  if (id === stat.recipe.id) stat.recipe.bookmarked = false;

  // update the LocalStorage :
  persistBookmark();
};

// adding the bookmarks to the localStorage :
function persistBookmark() {
  localStorage.setItem('bookmarks', JSON.stringify(stat.bookmarks));
}

// getting the bookmarks from localStorage :
function getBookmarkFromLocalStorage() {
  const data = localStorage.getItem('bookmarks');
  if (data) stat.bookmarks = JSON.parse(data);
  console.log(stat.bookmarks);
}

getBookmarkFromLocalStorage();
// Clear All Bookmarks :
function clearLocalStorage() {
  localStorage.clear('bookmarks');
}
// clearLocalStorage();

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe).filter(
    element => element[0].startsWith('ingredient') && element[1] !== ''
  );
  const ingredientsMap = ingredients.map(ingredient => {
    const ingredientArray = ingredient[1]
      .split(',')
      .map(element => element.trim());
    if (ingredientArray.length !== 3)
      throw new Error(
        'wrong ingredient Format, please use the correct Format ;)'
      );
    const [quantity, unit, description] = ingredientArray;
    return {
      quantity: quantity ? +quantity : null,
      unit,
      description,
    };
  });
  const recipe = {
    title: newRecipe.title,
    publisher: newRecipe.publisher,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    servings: newRecipe.servings,
    cooking_time: newRecipe.cookingTime,
    ingredients: ingredientsMap,
  };
  const data = await helpers.sendJSON(
    `${config.API_URL}?key= ${config.KEY}`,
    recipe
  );
  stat.recipe = createRecipeObject(data);
  addBookmark(stat.recipe);

  console.log(data);
};
