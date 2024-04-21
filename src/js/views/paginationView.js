import View from '../views/View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkupButtons(currentPage, numberOfPages, buttonType) {
    const contentType = {
      pervious: `
      <button data-goto ="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `,
      next: ` 
        <button data-goto ="${
          currentPage + 1
        }"  class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
              </svg>
      </button>
        `,
      perviousNext: `
      <button data-goto ="${
        currentPage - 1
      }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
    </button>
          <button data-goto ="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
  </button>
      `,
    };
    return contentType[buttonType];
  }

  _generateMarkup2() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.numberOfResultsInPage
    );
    const currentPage = this._data.page;

    // 1st) page 1 & other pages :
    if (currentPage === 1 && numberOfPages > 1) {
      return this._generateMarkupButtons(currentPage, numberOfPages, 'next');
    }
    // 2nd  other pages :
    if (currentPage < numberOfPages) {
      return this._generateMarkupButtons(
        currentPage,
        numberOfPages,
        'previousNext'
      );
    }
    // 3rd Last page :
    if (currentPage === numberOfPages && numberOfPages > 1) {
      return this._generateMarkupButtons(
        currentPage,
        numberOfPages,
        'previous'
      );
    }
    // 4th  1 page & NO other pages :
    return '';
  }

  // publisher method for click events :
  addHandlerClick(callbackHandler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline'); // using event delegation
      if (!button) return;
      const goToPage = +button.dataset.goto; // getting data from DOM
      callbackHandler(goToPage);
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.numberOfResultsInPage
    );
    const currentPage = this._data.page;

    // 1st) page 1 & other pages :
    if (currentPage === 1 && numberOfPages > 1) {
      return ` 
      <button data-goto ="${
        currentPage + 1
      }"  class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
    </button>
      `;
    }
    // 2nd  other pages :
    if (currentPage < numberOfPages) {
      return ` 
      <button data-goto ="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      <button data-goto ="${
        currentPage + 1
      }"  class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
    </button>

    <span>${currentPage}</span>
      `;
    }
    // 3rd Last page :
    if (currentPage === numberOfPages && numberOfPages > 1) {
      return `
      <button data-goto ="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    }
    // 4th  1 page & NO other pages :
    return '';
  }
}

export default new PaginationView();

function swap(array) {
  let leftPointer = 0,
    rightPointer = array.length - 1;

  while (leftPointer < rightPointer) {
    if (array[leftPointer] % 2 !== 0 && array[rightPointer] % 2 === 0) {
      const temp = array[rightPointer];
      array[rightPointer] = array[leftPointer];
      array[leftPointer] = temp;
    }

    if (array[leftPointer] % 2 === 0) leftPointer++;
    if (array[rightPointer] % 2 !== 0) rightPointer--;
  }
  return array;
}
const array = swap([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(array);

const swap2 = function (array) {
  let rightPointer = array.length - 1,
    leftPointer = 0;
  while (leftPointer < rightPointer) {
    if (array[rightPointer] % 2 === 0 && array[leftPointer] % 2 !== 0) {
      const temp = array[rightPointer];
      const max = temp;
      array[rightPointer] = array[leftPointer];
      array[leftPointer] = temp;
    }

    if (array[leftPointer] % 2 === 0) leftPointer++;
    if (array[rightPointer] % 2 !== 0) rightPointer--;
  }
  return array;
};


const swap3 = function(array) {
  let rp = array.length -1 , lp = 0 ;
  while(lp < rp ) {
    if(array[rp] % 2 === 0 && array[lp] % 2 !== 0 ) {
      const temp = array[rp] ;
      array[rp] = array[lp] ;
      array[lp] = temp ;

    }

    if(array[rp] %2 !==0 ) rp -- ;
    if(array[lp] % 2 === 0 ) lp ++ ;
  }
  return array ;
}

const arr = swap3([1, 2, 3, 4, 5 ] );
let [max] = arr ;


console.log(arr);