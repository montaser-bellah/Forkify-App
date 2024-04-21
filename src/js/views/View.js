import icons from '../../img/icons.svg';
export default class View {
  /**
   *
   * @param {Object | Object[] } data the data to be rendered (ex: recipe)
   * @param {boolean} [render= true] If false, create a markup strings instead of rendering to the DOM.
   * @returns {undefined | string} a markup string if render = false .
   * @this {Object} View instance .
   * @author Montaser Bellah Abutaha
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    newElements.forEach((newEl, index) => {
      const currentEl = currentElements[index];
      // Updates the changed TEXT :
      if (
        newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      // UPdates the changed Attributes :
      if (newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attribute =>
          currentEl.setAttribute(attribute.name, attribute.value)
        );

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', newMarkup);
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
    </div
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
  <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    console.log('you can override this method >');
  }
}
