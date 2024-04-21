import PreviewView from './PreviewView.js';
import View from './View';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = "No bookmark yet. Find a nice recipe & bookmark it ;)";

  _generateMarkup() {
    console.log("bookmarks ", this._data);
    return this._data.map(bookmark => PreviewView.render(bookmark, false));
  }

  // In Bookmark View :
  addHandlerRender(callbackHandler) {
    window.addEventListener("load", callbackHandler)
  }
}
export default new BookmarksView() ;