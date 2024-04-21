import View from './View.js';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonAddRecipe = document.querySelector('.nav__btn--add-recipe');
  _buttonCloseModal = document.querySelector('.btn--close-modal');
  _message = "Recipe was successfully Uploaded ;)";

  constructor() {
    super();
    this.addHandlerShowAndHideForm();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  addHandlerShowAndHideForm() {
    [this._buttonAddRecipe, this._buttonCloseModal, this._overlay].forEach(
      element => element.addEventListener('click', this.toggleWindow.bind(this))
    );
    // this._buttonAddRecipe.addEventListener("click", this.toggleWindow.bind(this));
    // this._buttonCloseModal.addEventListener("click", this.toggleWindow.bind(this));
    // this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(callbackHandler) {
    // this._parentElement = Form
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataAsEntries = [...new FormData(this)]; // this === _parentElement ;
      const dataAsObject = Object.fromEntries(dataAsEntries);

      callbackHandler(dataAsObject);
    });
  }
}

export default new AddRecipeView();








